import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { finishLoading, reset, startLoading } from "../../redux/slices/stakes";
import { bundleSelected } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import BundleStakes from "../bundle_stakes/bundle_stakes";

interface SelectBundleProps {
    stakingApi: StakingApi;
    displayBundle?: (bundle: BundleInfo) => boolean;
}

export default function SelectBundle(props: SelectBundleProps) {
    const { t } = useTranslation(['common']);

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const bundles = useSelector((state: RootState) => state.stakes.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.stakes.isLoadingBundles);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getBundles() {
            await props.stakingApi.retrieveBundles();
            dispatch(finishLoading());
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
            <BundleStakes 
                stakingApi={props.stakingApi}
                bundles={bundles.filter(bundle => props.displayBundle === undefined || props.displayBundle(bundle))} 
                isBundlesLoading={isLoadingBundles}
                buildActions={(bundle: BundleInfo) => 
                    <Button 
                        variant="text"
                        onClick={() => dispatch(bundleSelected(bundle))}
                        >
                        {t('action.select', { ns: "common" })}
                    </Button>
                }
                />
        </>
    );
}