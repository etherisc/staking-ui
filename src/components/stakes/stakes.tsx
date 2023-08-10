import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { Signer } from "ethers";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { BundleAction, finishLoading, reset, selectBundle, setBundleAction, startLoading } from "../../redux/slices/stakes";
import { RootState } from "../../redux/store";
import { ga_event } from "../../utils/google_analytics";
import BundleStakes from "../bundle_stakes/bundle_stakes";
import { Heading1 } from "../heading";
import ShowBundle from "../show_bundle/show_bundle";
import Restake from "../restake/restake";
import { set } from "react-hook-form";

export interface StakingProps {
    stakingApi: StakingApi;
}

export default function Stakes(props: StakingProps) {
    const { t } = useTranslation(['stakes', 'common']);
    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const bundles = useSelector((state: RootState) => state.stakes.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.stakes.isLoadingBundles);
    const dispatch = useDispatch();
    const selectedBundleIdx = useSelector((state: RootState) => state.stakes.selectedBundleIdx);
    const showBundleAction = useSelector((state: RootState) => state.stakes.showBundleAction);

    const retrieveStakes = useCallback(async (signer: Signer) => {
        const address = await signer.getAddress();
        dispatch(startLoading());
        dispatch(reset());
        await props.stakingApi.retrieveBundles();
        dispatch(finishLoading());
    }, [dispatch, props.stakingApi]);

    useEffect(() => {
        if (isConnected) {
            retrieveStakes(signer!);
        } else {
            dispatch(reset());
        }
    }, [signer, isConnected, props.stakingApi, dispatch, retrieveStakes]);

    function buildActions(bundle: BundleInfo): JSX.Element {
        return (<><Button onClick={() => {
            ga_event("bundle_details", { category: 'navigation' });
            dispatch(selectBundle(bundles.findIndex((b) => b.id === bundle.id)))
            dispatch(setBundleAction(BundleAction.ShowDetails));
        }}>{t('action.details')}</Button></>);
    }

    if (showBundleAction === BundleAction.Restake) {
        return <Restake stakingApi={props.stakingApi}/>;
    } else if (showBundleAction === BundleAction.ShowDetails) {
        return <ShowBundle 
            stakingApi={props.stakingApi}
            bundle={bundles[selectedBundleIdx!]}
            />;
    }

    return (<>
        <Box sx={{ display: 'flex'}}>
            <Heading1>{t('stakes')}</Heading1>
            <Button variant="text" color="secondary" onClick={() => retrieveStakes(signer!) } sx={{ mb: 2, ml: 2 }}>
                <FontAwesomeIcon icon={faRefresh} className="fa cursor-pointer" />
                {t('action.refresh')}
            </Button>
        </Box>

        { selectedBundleIdx === null && <BundleStakes 
            stakingApi={props.stakingApi}
            bundles={bundles}
            isBundlesLoading={isLoadingBundles}
            showStakeUsage={true}
            buildActions={buildActions}
            />}
    </>);
}