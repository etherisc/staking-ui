import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { INPUT_VARIANT } from "../../config/theme";
import { clearSelectedBundle } from "../../redux/slices/stakes";
import { setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import TermsOfService from "../terms_of_service";

interface RestakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    restake: () => void;
}

type IRestakeFormValues = {
    stakedAmount: string;
    rewardRate: string;
    termsAndConditions: boolean;
};

export default function RestakeBundleForm(props: RestakeBundleFormProps) {
    const { t } = useTranslation(['restake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const router = useRouter();

    const [ stakedAmountMin ] = useState(parseInt(formatEther(props.stakingApi.minStakedAmount())));
    const [ stakedAmountMax ] = useState(parseInt(formatEther(props.stakingApi.maxStakedAmount())));

    const { handleSubmit, control, formState, getValues, setValue } = useForm<IRestakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            stakedAmount: parseFloat(formatEther(props.bundle.myStakedAmount)).toFixed(0),
            rewardRate: "",
            termsAndConditions: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(4));
        } else {
            dispatch(setStep(3));
        }
    }, [formState.isValid, dispatch]);


    useEffect(() => {
        async function getRewardRate() {
            if (isConnected) {
                const rewardRate = await props.stakingApi.getRewardRate();
                console.log("Reward rate", rewardRate);
                setValue("rewardRate", (rewardRate * 100).toFixed(2));
            } else {
                console.log("clearing reward rate");
                setValue("rewardRate", "");
            }
        } 
        getRewardRate();
    }, [isConnected, props.stakingApi, setValue]);


    function back() {
        dispatch(clearSelectedBundle());
        router.push("/", undefined, { shallow: true });
    }

    const onSubmit: SubmitHandler<IRestakeFormValues> = async data => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakedAmount = parseEther(values.stakedAmount);
            props.restake();
        }
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
                                label={t('stakedAmount')}
                                fullWidth
                                variant={INPUT_VARIANT}
                                {...field} 
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
                                {...field} 
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    readOnly: true,
                                }}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
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