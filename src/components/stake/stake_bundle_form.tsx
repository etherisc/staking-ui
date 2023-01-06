import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { bundleSelected, setStep } from "../../redux/slices/staking";
import { formatCurrency } from "../../utils/numbers";
import { FormNumber } from "../../utils/types";
import CurrencyTextField from "../form/currency_text_field";
import { INPUT_VARIANT } from "../form/numeric_text_field";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";

interface StakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    stake: (amount: BigNumber, bundle: BundleInfo) => void;
}

type IStakeFormValues = {
    stakedAmount: string;
    supportedAmount: number;
    termsAndConditions: boolean;
};

export default function StakeBundleForm(props: StakeBundleFormProps) {
    const { t } = useTranslation(['stake', 'common']);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();

    const [ stakedAmountMin ] = useState(parseInt(formatEther(props.stakingApi.minStakedAmount())));
    const [ stakedAmountMax ] = useState(parseInt(formatEther(props.stakingApi.maxStakedAmount())));

    const { handleSubmit, control, formState, getValues, setValue, watch } = useForm<IStakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            stakedAmount: undefined,
            supportedAmount: undefined,
            termsAndConditions: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);


    // const [ stakedAmount, setStakedAmount ] = useState(undefined as FormNumber);
    // const [ stakedAmountValid, setStakedAmountValid ] = useState(false);

    // const [ supportedAmount, setSupportedAmount ] = useState("");
    const [ calculationInProgress, setCalculationInProgress ] = useState(false);

    // terms accepted and validation
    const [ termsAccepted, setTermsAccepted ] = useState(false);
    function handleTermsAcceptedChange(x: ChangeEvent<any>) {
        setTermsAccepted((x.target as HTMLInputElement).checked);
    }

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [formState.isValid, dispatch]);

    // FIXME: trigger this
    const calculateSupportedAmount = useCallback( async () => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakedAmount = parseEther(values.stakedAmount);
            setCalculationInProgress(true);
            try {
                console.log("Calculating supported amount for", stakedAmount);
                const supportedAmount = await props.stakingApi.calculateSupportedAmount(stakedAmount, props.bundle);
                setCalculationInProgress(false);
                // setSupportedAmount(formatCurrency(supportedAmount, props.bundle.supportingTokenDecimals));
                setValue("supportedAmount", parseFloat(formatUnits(supportedAmount, props.bundle.supportingTokenDecimals)));
            } finally {
            }
        } else {
            setValue("supportedAmount", -1);
        }
    }, [formState, errors, setValue, getValues]);

    function back() {
        dispatch(bundleSelected(null));
        dispatch(setStep(1));
    }

    const onSubmit: SubmitHandler<IStakeFormValues> = async data => {
        console.log("submit clicked", data);
        // FIXME: call stake
        // setApplicationInProgress(true);

        // try {
        //     const values = getValues();
        //     const walletAddress = values.insuredWallet;
        //     const insuredAmountWei = parseFloat(values.insuredAmount) * Math.pow(10, props.usd1Decimals);
        //     const coverageDays = parseInt(values.coverageDuration);
        //     const premiumWei = values.premiumAmount * Math.pow(10, props.usd2Decimals);
        //     await props.applyForPolicy(walletAddress, insuredAmountWei, coverageDays, premiumWei);
        // } finally {
        //     setApplicationInProgress(false);
        // }
    }

    const loadingBar = calculationInProgress ? <LinearProgress /> : null;

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                <Grid item xs={12}>
                    {/* TODO: <CurrencyTextField
                        required={true}
                        fullWidth={true}
                        id="stakedAmount"
                        label={t('stakedAmount')}
                        inputProps={{
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }}
                        value={stakedAmount}
                        currency={currency}
                        currencyDecimals={currencyDecimals}
                        onChange={setStakedAmount}
                        onBlur={calculateSupportedAmount}
                        minValue={stakedAmountMin}
                        maxValue={stakedAmountMax}
                        onError={(errMsg) => setStakedAmountValid(errMsg === "")}
                        /> */}
                    <Controller
                        name="stakedAmount"
                        control={control}
                        rules={{ required: true, min: stakedAmountMin, max: stakedAmountMax, pattern: /^[0-9.]+$/ }}
                        render={({ field }) => 
                            <TextField 
                                label={t('stakedAmount')}
                                fullWidth
                                // FIXME: disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                // TODO: onBlur={e => { field.onBlur(); setPremiumCalculationRequired(true); }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
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
                    {/* TODO: <TextField
                        fullWidth={true}
                        id="supportedAmount"
                        variant={INPUT_VARIANT}
                        label={t('supportedAmount')}
                        InputProps={{
                            readOnly: true,
                            startAdornment: <InputAdornment position="start">{props.bundle.supportingToken}</InputAdornment>,
                        }}
                        value={supportedAmount}
                        /> */}
                    <Controller
                        name="supportedAmount"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('supportedAmount')}
                                fullWidth
                                // FIXME: disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{props.bundle.supportingToken}</InputAdornment>,
                                    readOnly: true,
                                }}
                                />}
                        />
                    {loadingBar}
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                defaultChecked={false}
                                value={termsAccepted}
                                onChange={handleTermsAcceptedChange}
                                />
                        } 
                        label={t('checkbox_t_and_c_label')} />
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
                        disabled={!formState.isValid } // FIXMEL || premiumCalculationInProgress || props.formDisabled || matchedBundle == null}
                        // TODO onClick={() => props.stake(stakedAmount!, props.bundle)}
                        >
                        {t('action.stake')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>);
}