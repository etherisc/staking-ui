import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { INPUT_VARIANT } from "../../config/theme";
import { bundleSelected, setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
// import { DevTool } from "@hookform/devtools";

interface UnstakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    unstake: (amount: BigNumber, max: boolean, bundle: BundleInfo) => void;
}

type IUnstakeFormValues = {
    unstakedAmount: string;
    unstakeMaxAmount: boolean;
};

export default function UnstakeBundleForm(props: UnstakeBundleFormProps) {
    const { t } = useTranslation(['unstake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const signer = useSelector((state: RootState) => state.chain.signer);

    const unstakedAmountMin = 1;
    // TODO: fix this value
    const [ unstakedAmountMax, setUnstakedAmountMax ] = useState(100000);

    const { handleSubmit, control, formState, getValues, setValue, watch } = useForm<IUnstakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            unstakedAmount: "0",
            unstakeMaxAmount: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);

    const watchUnstakeMaxAmount = watch("unstakeMaxAmount");
    useEffect(() => {
        if (watchUnstakeMaxAmount) {
            setValue("unstakedAmount", unstakedAmountMax.toString());
        }
    }, [watchUnstakeMaxAmount, unstakedAmountMax, setValue]);

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [formState.isValid, dispatch]);

    // get max unstakeable amount
    useEffect(() => {
        async function getMaxUnstakeAmount() {
            // FIXME: get max unstakeable amount per nft
            // const address = await signer!.getAddress();
            // const maxAmount = await props.stakingApi.stakedAmount(props.bundle, address);
            // setUnstakedAmountMax(parseInt(formatEther(maxAmount)));
        }
        getMaxUnstakeAmount();
    }, []);

    const canSubmit = useMemo(() => {
        if (props.formDisabled) {
            return false;
        }
        const values = getValues();
        if (values.unstakeMaxAmount === true) {
            return true;
        }
        if (errors.unstakedAmount === undefined) {
            return true;
        }
        return false;
    }, [errors, getValues, props.formDisabled]);

    function back() {
        dispatch(bundleSelected(null));
        dispatch(setStep(1));
    }

    const onSubmit: SubmitHandler<IUnstakeFormValues> = async data => {
        const values = getValues();

        if ((values.unstakedAmount && errors.unstakedAmount === undefined) || values.unstakeMaxAmount) {
            const unstakedAmount = parseEther(values.unstakedAmount);
            const unstakeMaxAmount = values.unstakeMaxAmount;
            props.unstake(unstakedAmount, unstakeMaxAmount, props.bundle)
        }
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                <Grid item xs={12}>
                    <Controller
                        name="unstakedAmount"
                        control={control}
                        rules={{ required: true, min: unstakedAmountMin, max: unstakedAmountMax, pattern: /^[0-9.]+$/ }}
                        render={({ field }) => 
                            <TextField 
                                label={t('stakedAmount')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                                    readOnly: watchUnstakeMaxAmount,
                                }}
                                error={errors.unstakedAmount !== undefined}
                                helperText={errors.unstakedAmount !== undefined 
                                    ? ( errors.unstakedAmount.type == 'pattern' 
                                            ? t(`error.field.amountType`, { "ns": "common"}) 
                                            : t(`error.field.${errors.unstakedAmount.type}`, { "ns": "common", "minValue": `${currency} ${unstakedAmountMin}`, "maxValue": `${currency} ${unstakedAmountMax}` })
                                    ) : ""}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="unstakeMaxAmount"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => 
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        defaultChecked={false}
                                        {...field}
                                        />
                                } 
                                disabled={props.formDisabled}
                                label={t('checkbox_unstake_max_amount_label')} />}
                            />
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        fullWidth
                        type="submit" 
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
                        disabled={! canSubmit}
                        >
                        {t('action.unstake')}
                    </Button>
                </Grid>
            </Grid>
        </form>
        {/* <DevTool control={control} /> */}
    </>);
}