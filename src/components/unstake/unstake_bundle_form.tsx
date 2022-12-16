import { Button, Checkbox, FormControlLabel, Grid, InputAdornment } from "@mui/material";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { AppContext } from "../../context/app_context";
import { bundleSelected, setStep } from "../../redux/slices/staking";
import { FormNumber } from "../../utils/types";
import CurrencyTextField from "../form/currency_text_field";

interface UnstakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    unstake: (amount: BigNumber, max: boolean, bundle: BundleInfo) => void;
}

export default function UnstakeBundleForm(props: UnstakeBundleFormProps) {
    const appContext = useContext(AppContext);
    const { t } = useTranslation(['unstake', 'common']);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();

    const [ unstakedAmount, setUnstakedAmount ] = useState(undefined as FormNumber);
    const [ unstakedAmountValid, setUnstakedAmountValid ] = useState(false);
    const [ unstakedAmountMin ] = useState(props.stakingApi.minStakedAmount());
    const [ unstakedAmountMax, setUnstakedAmountMax ] = useState(props.stakingApi.minStakedAmount());

    // full amount including rewards
    const [ unstakeMaxAmount, setUnstakeMaxAmount ] = useState(false);
    function handleUnstakeMaxAmountChange(x: ChangeEvent<any>) {
        setUnstakeMaxAmount((x.target as HTMLInputElement).checked);
    }

    useEffect(() => {
        if (unstakedAmountValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [unstakedAmountValid, dispatch]);

    // get max unstakeable amount
    useEffect(() => {
        async function getMaxUnstakeAmount() {
            const address = await appContext.data.signer!.getAddress();
            const maxAmount = await props.stakingApi.stakedAmount(props.bundle, address);
            setUnstakedAmountMax(maxAmount);
        }
        getMaxUnstakeAmount();
    }, []);

    function back() {
        dispatch(bundleSelected(null));
        dispatch(setStep(1));
    }

    return (<>
        <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
            sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
            <Grid item xs={12}>
                <CurrencyTextField
                    required={true}
                    disabled={unstakeMaxAmount}
                    fullWidth={true}
                    id="stakedAmount"
                    label={t('stakedAmount')}
                    inputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                    }}
                    value={unstakedAmount}
                    currency={currency}
                    currencyDecimals={currencyDecimals}
                    onChange={setUnstakedAmount}
                    minValue={unstakedAmountMin}
                    maxValue={unstakedAmountMax}
                    onError={(errMsg) => setUnstakedAmountValid(errMsg === "")}
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            defaultChecked={false}
                            value={unstakeMaxAmount}
                            onChange={handleUnstakeMaxAmountChange}
                            />
                    } 
                    label={t('checkbox_unstake_max_amount_label')} />
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
                    disabled={ ! unstakedAmountValid && ! unstakeMaxAmount }
                    onClick={() => props.unstake(unstakedAmount!, unstakeMaxAmount, props.bundle)}
                    >
                    {t('action.unstake')}
                </Button>
            </Grid>
        </Grid>
    </>);
}