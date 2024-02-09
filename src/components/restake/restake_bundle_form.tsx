import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { INPUT_VARIANT } from "../../config/theme";
import { BundleAction, clearSelectedBundle, setBundleAction } from "../../redux/slices/stakes";
import { setStep } from "../../redux/slices/staking";
import TermsOfService from "../terms_of_service";
import { BigNumber } from "ethers";
import WithTooltip from "../with_tooltip";
import { grey } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface RestakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    restakeBundle: BundleInfo;
    formDisabled: boolean;
    restake: (stakeNftId: BigNumber, oldBundleNftId: BigNumber, newBundleNftId: BigNumber, gasless: boolean) => void;
}

type IRestakeFormValues = {
    stakedAmount: string;
    rewardRate: string;
    termsAndConditions: boolean;
    gasless: boolean;
};

export default function RestakeBundleForm(props: RestakeBundleFormProps) {
    const { t } = useTranslation(['restake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const router = useRouter();

    const [ stakedAmountMin ] = useState(parseInt(formatEther(props.stakingApi.minStakedAmount())));
    const [ stakedAmountMax ] = useState(parseInt(formatEther(props.stakingApi.maxStakedAmount())));

    const maxGasPrice = process.env.NEXT_PUBLIC_MAX_GAS_PRICE_LIMIT ? parseInt(process.env.NEXT_PUBLIC_MAX_GAS_PRICE_LIMIT) : 30;

    const { handleSubmit, control, formState, getValues, watch } = useForm<IRestakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            stakedAmount: parseFloat(formatEther(props.bundle.myStakedAmount)).toFixed(0),
            rewardRate: (props.bundle.rewardRate * 100).toFixed(2),
            termsAndConditions: false,
            gasless: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);
    const isGasless = watch('gasless');

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(4));
        } else {
            dispatch(setStep(3));
        }
    }, [formState.isValid, dispatch]);

    function back() {
        dispatch(setBundleAction(BundleAction.ShowDetails));
    }

    const onSubmit: SubmitHandler<IRestakeFormValues> = async data => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakeNftId = props.bundle.myStakedNfsIds[0];
            const newBundleNftId = props.restakeBundle.nftId;
            const gasless = values.gasless;
            props.restake( BigNumber.from(stakeNftId), BigNumber.from(props.bundle.nftId), BigNumber.from(newBundleNftId), gasless);
        }
    }

    let gaslessHelperText = <>{t('gasless_checkbox_label')}</>;

    if (isGasless) { 
        gaslessHelperText = <>
            {t('gasless_checkbox_label')}
            <br/>
            <Typography variant="body2" component="span">
                <b>{t('gasless_checkbox_important')}:</b>&nbsp;
                {t('gasless_checkbox_label_gasless_conditions', {maxGasPrice: maxGasPrice })}
            </Typography>
        </>
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                <Grid item xs={12}>
                    <Controller
                        name="stakedAmount"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('restakedAmount')}
                                fullWidth
                                variant="outlined"
                                {...field} 
                                disabled={true}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                                    readOnly: true
                                }}
                                error={errors.stakedAmount !== undefined}
                                helperText={errors.stakedAmount !== undefined 
                                    ? ( errors.stakedAmount.type == 'pattern' 
                                            ? t(`error.field.amountType`, { "ns": "common"}) 
                                            : t(`error.field.${errors.stakedAmount.type}`, { "ns": "common", "minValue": `${currency} ${stakedAmountMin}`, "maxValue": `${currency} ${stakedAmountMax}` })
                                    ) : ""}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="rewardRate"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('reward_rate')}
                                fullWidth
                                variant="outlined"
                                disabled={true}
                                {...field} 
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    readOnly: true,
                                }}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
                { process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION === 'true' &&
                        <Controller
                            name="gasless"
                            control={control}
                            render={({ field }) => 
                                <FormControlLabel 
                                    sx={{ 
                                        mb: 0.5,
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                    }}
                                    control={
                                        <Checkbox 
                                            defaultChecked={false}
                                            {...field}
                                            />
                                    } 
                                    disabled={props.formDisabled}
                                    label={gaslessHelperText}
                                    />} 
                            />
                    }
                    <Controller
                        name="termsAndConditions"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => 
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        defaultChecked={false}
                                        {...field}
                                        />
                                } 
                                disabled={props.formDisabled}
                                label={<TermsOfService />}
                                />
                        } />
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        fullWidth
                        variant="outlined" 
                        color="primary"
                        onClick={back}
                        >
                        {t('action.back', { ns: "common" })}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        fullWidth
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={!formState.isValid || props.formDisabled }
                        >
                        {t('action.restake')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>);
}