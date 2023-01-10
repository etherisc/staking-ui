import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { add, bundleSelected, finishLoading, reset, startLoading } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import BundleStakes from "../bundle_stakes/bundle_stakes";

interface SelectBundleProps {
    stakingType: StakingType;
    stakingApi: StakingApi;
    onlyStakesFromWallet?: boolean;
}

export enum StakingType { STAKE, UNSTAKE }

export default function SelectBundle(props: SelectBundleProps) {
    const { t } = useTranslation(['stake', 'common']);

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const bundles = useSelector((state: RootState) => state.staking.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.staking.isLoadingBundles);
    const dispatch = useDispatch();

    const [ selectedBundle, setSelectedBundle ] = useState<BundleInfo | undefined>(undefined);

    function canUseBundle(bundle: BundleInfo) {
        if (props.stakingType === StakingType.STAKE) {
            return bundle.stakingSupported;
        } else if (props.stakingType === StakingType.UNSTAKE) {
            return bundle.unstakingSupported;
        } else {
            return bundle.stakingSupported;
        }
    }

    useEffect(() => {
        async function getBundles() {
            if (props.onlyStakesFromWallet !== undefined && props.onlyStakesFromWallet === true) {
                props.stakingApi.retrieveStakesForWallet(
                    await signer!.getAddress(),
                    (bundle: BundleInfo) => {
                        if (bundle.myStakedAmount != "0" && canUseBundle(bundle)) {
                            dispatch(add(bundle));
                        }
                        return Promise.resolve();
                    },
                    () => {
                        dispatch(finishLoading());
                    }
                );
            } else {
                props.stakingApi.retrieveBundles(
                    (bundle: BundleInfo) => {
                        dispatch(add(bundle));
                        return Promise.resolve();
                    },
                    () => {
                        dispatch(finishLoading());
                    }
                );    
            }
        }

        if (isConnected) {
            dispatch(startLoading());
            dispatch(reset());
            getBundles();
        } else {
            dispatch(reset());
        }
    }, [signer, isConnected, props.stakingApi, dispatch]);

    return (
        <>
            <Typography variant="body1" sx={{ my: 2 }}>{t('choose_bundle')}</Typography>

            <BundleStakes 
                stakingApi={props.stakingApi}
                bundles={bundles}
                isBundlesLoading={isLoadingBundles}
                onBundleSelected={setSelectedBundle}
                showMyAmounts={props.onlyStakesFromWallet}
                />

            <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
                <Button 
                    variant="contained"
                    disabled={selectedBundle === undefined}
                    onClick={() => dispatch(bundleSelected(selectedBundle!))}
                    >{t('action.continue', { ns: "common" })}</Button>
            </Grid>
        </>
    );
}