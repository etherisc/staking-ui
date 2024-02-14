import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
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
import { clearSelectedBundle } from "../../redux/slices/stakes";
import { setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import TermsOfService from "../terms_of_service";
import WithTooltip from "../with_tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { grey } from "@mui/material/colors";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { setGasPrice } from "../../redux/slices/chain";

interface StakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    stake: (amount: BigNumber, bundle: BundleInfo, gasless: boolean) => void;
}

type IStakeFormValues = {
    stakedAmount: string;
    supportedAmount: number;
    rewardRate: string;
    expectedReward: string;
    gasless: boolean;
    gaslessAck: boolean;
    termsAndConditions: boolean;
};

export default function StakeBundleForm(props: StakeBundleFormProps) {
    const { t } = useTranslation(['stake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const router = useRouter();

    const maxGasPrice = process.env.NEXT_PUBLIC_MAX_GAS_PRICE_LIMIT ? parseInt(process.env.NEXT_PUBLIC_MAX_GAS_PRICE_LIMIT) : 30;
    // only allow gasless option if user is creating a new stake on the bundle not when adding to an existing stake
    const disableGaslessOption = props.bundle.myStakedNfsIds.length > 0;

    const [ stakedAmountMin ] = useState(parseInt(formatEther(props.stakingApi.minStakedAmount())));
    const [ stakedAmountMax ] = useState(parseInt(formatEther(props.stakingApi.maxStakedAmount())));
    const currentGasPrice = useSelector((state: RootState) => state.chain.gasPrice);

    const { handleSubmit, control, formState, getValues, setValue, watch } = useForm<IStakeFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            stakedAmount: undefined,
            supportedAmount: undefined,
            rewardRate: (props.bundle.rewardRate * 100).toFixed(2),
            expectedReward: "",
            gasless: false,
            gaslessAck: false,
            termsAndConditions: false,
        }
    });
    const errors = useMemo(() => formState.errors, [formState]);

    const isGasless = watch('gasless');

    const [ calculationInProgress, setCalculationInProgress ] = useState(false);

    useEffect(() => {
        async function fetchGasPrice() {
            if (process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION === 'true') {
                const response = await fetch("/api/feeless/gas_price");
                const gasPrice = (await response.json()).gasPrice;
                dispatch(setGasPrice(gasPrice));
                console.log("currentGasPrice", gasPrice);
            }
        }
        fetchGasPrice();
    }, []);

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

    function back() {
        dispatch(clearSelectedBundle());
        router.push("/", undefined, { shallow: true });
    }

    const onSubmit: SubmitHandler<IStakeFormValues> = async data => {
        const values = getValues();

        if (values.stakedAmount && errors.stakedAmount === undefined) {
            const stakedAmount = parseEther(values.stakedAmount);
            const gasless = values.gasless;
            props.stake(stakedAmount, props.bundle, gasless);
        }
    }

    const loadingBar = calculationInProgress ? <LinearProgress /> : null;
    let gaslessHelperText = <>{t('gasless_checkbox_label')}</>;

    if (isGasless) { 
        let gasPriceIndication = <></>;
        if (currentGasPrice > 0) {
            const isTxLikelyToBeImmediate = currentGasPrice <= maxGasPrice;
            gasPriceIndication = <><br/>
                {isTxLikelyToBeImmediate ? t('gasless_tx_immediate_likely') : t('gasless_tx_immediate_unlikely')}
            </>;
        }

        gaslessHelperText = <>
        {t('gasless_checkbox_label')}
        <br/>
        <Typography variant="body2" component="span">
            <b>{t('gasless_checkbox_important')}:</b>&nbsp;
            {t('gasless_checkbox_label_gasless_conditions', {maxGasPrice: maxGasPrice })}
            {gasPriceIndication}
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
                                onBlur={() => { field.onBlur(); calculateSupportedAmount(); }}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                    disabled={props.formDisabled || disableGaslessOption}
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
                        disabled={!formState.isValid || calculationInProgress || props.formDisabled }
                        >
                        {t('action.stake')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>);
}