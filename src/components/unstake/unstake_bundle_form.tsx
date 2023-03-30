import { Alert, Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { NftInfo } from "../../backend/nft_info";
import { StakingApi } from "../../backend/staking_api";
import { INPUT_VARIANT } from "../../config/theme";
import { bundleSelected, setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { bigNumberToAmountStringWithDecimals } from "../../utils/bignumber";
import { REGEX_PATTERN_NUMBER_WITH_TWO_DECIMALS } from "../../utils/const";
// import { DevTool } from "@hookform/devtools";

interface UnstakeBundleFormProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    unstake: (amount: BigNumber, nftId: string, max: boolean, bundle: BundleInfo) => void;
}

type IUnstakeFormValues = {
    unstakedAmount: string;
    unstakeMaxAmount: boolean;
};

export default function UnstakeBundleForm(props: UnstakeBundleFormProps) {
    const { t } = useTranslation(['unstake', 'common']);
    const currency = props.stakingApi.currency();
    const dispatch = useDispatch();
    const ownedNfts = useSelector((state: RootState) => state.stakes.ownedNfts);
    console.log("UnstakeBundleForm", ownedNfts, props.bundle);

    let selectedNft: NftInfo | undefined = {} as NftInfo;
    const unstakedAmountMin = 1;
    let unstakedAmountMax = "";

    // if more than one nft and selected is empty, use next - until a match is found
    const bundleStakeNfts = props.bundle.myStakedNfsIds;
    let i = 0;
    let stakedAmount;
    do {
        selectedNft = ownedNfts.find((nft) => nft.nftId === props.bundle.myStakedNfsIds[i]);
        console.log("selectedNft", selectedNft);
        stakedAmount = BigNumber.from(selectedNft?.stakedAmount ?? 0);
        unstakedAmountMax = bigNumberToAmountStringWithDecimals(stakedAmount, 2);
    } while(stakedAmount.eq(0) && ++i < bundleStakeNfts.length)

    // has more than one nft staked on this bundle with staked amount > 0
    const multipleBundleStakeNfts = ownedNfts.filter((nft) => bundleStakeNfts.includes(nft.nftId) && BigNumber.from(nft.stakedAmount).gt(0)).length > 1;
    
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
            setValue("unstakedAmount", unstakedAmountMax);
        }
    }, [watchUnstakeMaxAmount, unstakedAmountMax, setValue]);

    useEffect(() => {
        if (formState.isValid) {
            dispatch(setStep(3));
        } else {
            dispatch(setStep(2));
        }
    }, [formState.isValid, dispatch]);

    const canSubmit = useMemo(() => {
        if (props.formDisabled) {
            return false;
        }
        if (! formState.isValid) {
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
    }, [errors, getValues, props.formDisabled, formState.isValid]);

    function back() {
        dispatch(bundleSelected(null));
        dispatch(setStep(1));
    }

    const onSubmit: SubmitHandler<IUnstakeFormValues> = async data => {
        const values = getValues();

        if ((values.unstakedAmount && errors.unstakedAmount === undefined) || values.unstakeMaxAmount) {
            const unstakedAmount = parseEther(values.unstakedAmount);
            const unstakeMaxAmount = values.unstakeMaxAmount;
            props.unstake(unstakedAmount, selectedNft!.nftId, unstakeMaxAmount, props.bundle)
        }
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                { multipleBundleStakeNfts && 
                    <Grid item xs={12}>
                        <Alert severity="info">{t('common:alert.unstaking_multiple_nfts')}</Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Controller
                        name="unstakedAmount"
                        control={control}
                        rules={{ required: true, min: unstakedAmountMin, max: unstakedAmountMax, pattern: REGEX_PATTERN_NUMBER_WITH_TWO_DECIMALS }}
                        render={({ field }) => 
                            <TextField 
                                label={t('stakedAmount')}
                                fullWidth
                                disabled={props.formDisabled || watchUnstakeMaxAmount }
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
