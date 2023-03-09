import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { BigNumber, Signer } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { finishLoading, reset, startLoading } from "../../redux/slices/stakes";
import { bundleSelected } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import BundleStakes from "../bundle_stakes/bundle_stakes";
import { Heading1 } from "../heading";

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
    const router = useRouter();

    const retrieveStakes = useCallback(async (signer: Signer) => {
        const address = await signer.getAddress();
        dispatch(startLoading());
        dispatch(reset());
        await props.stakingApi.retrieveBundles(
            // TODO: remove
            // address,
            // (bundle: BundleInfo) => {
            //     dispatch(add(bundle));
            //     return Promise.resolve();
            // },
            // () => {
            //     dispatch(finishLoading());
            // }
        );
        dispatch(finishLoading());
    }, [dispatch, props.stakingApi]);

    useEffect(() => {
        if (isConnected) {
            retrieveStakes(signer!);
        } else {
            dispatch(reset());
        }
    }, [signer, isConnected, props.stakingApi, dispatch, retrieveStakes]);

    function stakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/stake?noreset=true", undefined, { shallow: true });
    }

    function unstakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/unstake?noreset=true", undefined, { shallow: true });
    }


    function buildActions(bundle: BundleInfo): JSX.Element {
        const stakeAction = bundle.stakingSupported ? <Button onClick={() => stakeBundle(bundle)}>{t('action.stake')}</Button> : undefined;
        const isAllowedToUnstake = bundle.unstakingSupported && BigNumber.from(bundle.myStakedAmount).gt(0);
        const unstakeAction = isAllowedToUnstake ? <Button onClick={() => unstakeBundle(bundle)}>{t('action.unstake')}</Button> : undefined;
        return (<>
            {stakeAction}
            {unstakeAction}
        </>);
    }

    return (<>
        <Box sx={{ display: 'flex'}}>
            <Heading1>{t('stakes')}</Heading1>
            <Button variant="text" color="secondary" onClick={() => retrieveStakes(signer!) } sx={{ mb: 2, ml: 2 }}>
                <FontAwesomeIcon icon={faRefresh} className="fa cursor-pointer" />
                {t('action.refresh')}
            </Button>
        </Box>

        <BundleStakes 
            stakingApi={props.stakingApi}
            bundles={bundles}
            isBundlesLoading={isLoadingBundles}
            disableSelection={true}
            showStakeUsage={true}
            buildActions={buildActions}
            />
    </>);
}