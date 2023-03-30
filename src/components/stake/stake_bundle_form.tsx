import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { INPUT_VARIANT } from "../../config/theme";
import { clearSelectedBundle, selectBundle } from "../../redux/slices/stakes";
import { setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import TermsOfService from "../terms_of_service";

interface StakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    stake: (amount: BigNumber, bundle: BundleInfo) => void;
}

type IStakeFormValues = {
    stakedAmount: string;
    supportedAmount: number;
    rewardRate: string;
    expectedReward: string;
    termsAndConditions: boolean;
};

export default function StakeBundleForm(props: StakeBundleFormProps) {
    const { t } = useTranslation(['stake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const router = useRouter();

    const [ stakedAmountMin ] = useState(parseInt(formatEther(props.stakingApi.minStakedAmount())));
    const [ stakedAmountMax ] = useState(parseInt(formatEther(props.stakingApi.maxStakedAmount())));

    const { handleSubmit, control, formState, getValues, setValue } = useForm<IStakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            stakedAmount: undefined,
            supportedAmount: undefined,
            rewardRate: "",
            expectedReward: "",
            termsAndConditions: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);

    const [ calculationInProgress, setCalculationInProgress ] = useState(false);

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [formState.isValid, dispatch]);

    const calculateSupportedAmount = useCallback( async () => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakedAmount = parseEther(values.stakedAmount);
            setCalculationInProgress(true);
            try {
                console.log("Calculating supported amount for", stakedAmount);
                const supportedAmount = await props.stakingApi.calculateSupportedAmount(stakedAmount, props.bundle);
                setValue("supportedAmount", parseFloat(formatUnits(supportedAmount, props.bundle.supportingTokenDecimals)));
                const expectedReward = await props.stakingApi.calculateReward(stakedAmount, props.bundle);
                setValue("expectedReward", parseFloat(formatEther(expectedReward)).toFixed(0));
                setCalculationInProgress(false);
            } finally {
            }
        } else {
            setValue("supportedAmount", 0);
            setValue("expectedReward", "");
        }
    }, [errors, setValue, getValues, props.bundle, props.stakingApi]);

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

    const onSubmit: SubmitHandler<IStakeFormValues> = async data => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakedAmount = parseEther(values.stakedAmount);
            props.stake(stakedAmount, props.bundle)
        }
    }

    const loadingBar = calculationInProgress ? <LinearProgress /> : null;

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                <Grid item xs={12}>
                    <Controller
                        name="stakedAmount"
                        control={control}
                        rules={{ 
                            required: true, 
                            min: stakedAmountMin, 
                            max: stakedAmountMax, 
                            pattern: /^[0-9.]+$/,
                            validate: {
                                balance: async (value: string) => props.stakingApi.hasDipBalance(parseEther(value))
                            }
                        }}
                        render={({ field }) => 
                            <TextField 
                                label={t('stakedAmount')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                onBlur={e => { field.onBlur(); calculateSupportedAmount(); }}
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
                    <Controller
                        name="supportedAmount"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('supportedAmount')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant="outlined"
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
                    <Controller
                        name="rewardRate"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('reward_rate')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant="outlined"
                                {...field} 
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    readOnly: true,
                                }}
                                />}
                        />
                    {loadingBar}
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="expectedReward"
                        control={control}
                        render={({ field }) => 
                            <TextField 
                                label={t('expected_reward')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant="outlined"
                                {...field} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{props.stakingApi.currency()}</InputAdornment>,
                                    readOnly: true,
                                }}
                                helperText={t('expected_reward_notice')}
                                />}
                        />
                    {loadingBar}
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
                        disabled={!formState.isValid || calculationInProgress || props.formDisabled }
                        >
                        {t('action.stake')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>);
}