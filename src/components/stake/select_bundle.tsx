import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import useNotifications from "../../hooks/notifications";
import { finishLoading, reset, startLoading } from "../../redux/slices/stakes";
import { RootState } from "../../redux/store";
import BundleStakes from "../bundle_stakes/bundle_stakes";

interface SelectBundleProps {
    stakingApi: StakingApi;
    displayBundle?: (bundle: BundleInfo) => boolean;
    bundleSelected: (bundle: BundleInfo) => void;
    suppressFetching?: boolean;
    hideShowMyStakes?: boolean;
    additionalComponents?: JSX.Element;
}

export default function SelectBundle(props: SelectBundleProps) {
    const { t } = useTranslation(['common']);

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const bundles = useSelector((state: RootState) => state.stakes.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.stakes.isLoadingBundles);
    const dispatch = useDispatch();
    const { showPersistentErrorSnackbarWithCopyDetails } = useNotifications();

    useEffect(() => {
        async function getBundles() {
            await props.stakingApi.retrieveBundles();
            dispatch(finishLoading());
        }

        if (props.suppressFetching) {
            return;
        }

        try {
            if (isConnected) {
                dispatch(reset());
                dispatch(startLoading());
                getBundles();
            } else {
                dispatch(reset());
            }
        } catch (e) {
            if (e instanceof Error) {
                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.blockchain_fetch_failed', { ns: 'common', error: e.message }),
                    e.message,
                    "stake_approval",
                );
            }
        }
    }, [signer, isConnected, props.stakingApi, dispatch]);

    return (
        <>
            <BundleStakes 
                stakingApi={props.stakingApi}
                bundles={bundles.filter(bundle => props.displayBundle === undefined || props.displayBundle(bundle))} 
                isBundlesLoading={isLoadingBundles}
                hideShowMyStakes={props.hideShowMyStakes}
                buildActions={(bundle: BundleInfo) => 
                    <Button 
                        variant="text"
                        onClick={() => props.bundleSelected(bundle)}
                        >
                        {t('action.select', { ns: "common" })}
                    </Button>
                }
                />
            { props.additionalComponents }
        </>
    );
}