import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { bundleSelected, setStep } from "../../redux/slices/staking";
import { formatCurrency } from "../../utils/numbers";
import { FormNumber } from "../../utils/types";
import CurrencyTextField from "../form/currency_text_field";
import { INPUT_VARIANT } from "../form/numeric_text_field";

interface StakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    stake: (amount: BigNumber, bundle: BundleInfo) => void;
}

export default function StakeBundleForm(props: StakeBundleFormProps) {
    const { t } = useTranslation(['stake', 'common']);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();

    const [ stakedAmount, setStakedAmount ] = useState(undefined as FormNumber);
    const [ stakedAmountValid, setStakedAmountValid ] = useState(false);
    const [ stakedAmountMin ] = useState(props.stakingApi.minStakedAmount());
    const [ stakedAmountMax ] = useState(props.stakingApi.maxStakedAmount());

    const [ supportedAmount, setSupportedAmount ] = useState("");
    const [ calculationInProgress, setCalculationInProgress ] = useState(false);

    // terms accepted and validation
    const [ termsAccepted, setTermsAccepted ] = useState(false);
    function handleTermsAcceptedChange(x: ChangeEvent<any>) {
        setTermsAccepted((x.target as HTMLInputElement).checked);
    }

    useEffect(() => {
        if (stakedAmountValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [stakedAmountValid, dispatch]);

    async function calculateSupportedAmount() {
        if (stakedAmountValid && stakedAmount !== undefined) {
            setCalculationInProgress(true);
            try {
                console.log("Calculating supported amount for", stakedAmount);
                const supportedAmount = await props.stakingApi.calculateSupportedAmount(stakedAmount, props.bundle);
                setCalculationInProgress(false);
                // FIXME: setSupportedAmount(formatCurrency(supportedAmount, props.bundle.supportingTokenDecimals));
                setSupportedAmount(formatCurrency(supportedAmount.toNumber(), props.bundle.supportingTokenDecimals));
            } finally {
            }
        } else {
            setSupportedAmount('');
        }
    }

    function back() {
        dispatch(bundleSelected(null));
        dispatch(setStep(1));
    }

    const loadingBar = calculationInProgress ? <LinearProgress /> : null;

    return (<>
        <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
            sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
            <Grid item xs={12}>
                <CurrencyTextField
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
                    />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth={true}
                    id="supportedAmount"
                    variant={INPUT_VARIANT}
                    label={t('supportedAmount')}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <InputAdornment position="start">{props.bundle.supportingToken}</InputAdornment>,
                    }}
                    value={supportedAmount}
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
                    disabled={!stakedAmountValid || !termsAccepted}
                    onClick={() => props.stake(stakedAmount!, props.bundle)}
                    >
                    {t('action.stake')}
                </Button>
            </Grid>
        </Grid>
    </>);
}