import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { FormNumber } from "../../utils/types";
import CurrencyTextField from "../form/currency_text_field";
import { INPUT_VARIANT } from "../form/numeric_text_field";

interface StakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
}

export default function StakeBundleForm(props: StakeBundleFormProps) {
    const { t } = useTranslation(['stake', 'common']);
    const onSubmit = (data: any) => console.log(data);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    
    const [ stakedAmount, setStakedAmount ] = useState(undefined as FormNumber);
    const [ stakedAmountValid, setStakedAmountValid ] = useState(false);
    const [ stakedAmountMin ] = useState(props.stakingApi.minStakedAmount());
    const [ stakedAmountMax ] = useState(props.stakingApi.maxStakedAmount());

    const [ supportedAmount, setSupportedAmount ] = useState("");

    return (<>
        <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4} mt={{ 'xs': 0, 'md': 2 }} 
            sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
            <Grid item xs={12}>
                <CurrencyTextField
                    required={true}
                    fullWidth={true}
                    // TODO: readOnly={premiumCalculationInProgress}
                    id="stakedAmount"
                    label={t('stakedAmount')}
                    inputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                    }}
                    value={stakedAmount}
                    currency={currency}
                    currencyDecimals={currencyDecimals}
                    onChange={setStakedAmount}
                    // TODO: onBlur={calculatePremium}
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
                        // TODO: use supported amount currency
                        // startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                    }}
                    value={supportedAmount}
                    />
            </Grid>
            <Grid item xs={12}>
                <Button 
                    fullWidth
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={!stakedAmountValid}
                    >
                    {t('action.stake')}
                </Button>
            </Grid>
        </Grid>
    </>);
}