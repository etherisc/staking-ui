import { Signer } from "ethers";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { add, finishLoading, reset, startLoading } from "../../redux/slices/stakes";
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

    useEffect(() => {
        const retrieveStakes = async (signer: Signer) => {
            const address = await signer.getAddress();
            dispatch(startLoading());
            dispatch(reset());
            props.stakingApi.retrieveStakesForWallet(
                address,
                (bundle: BundleInfo) => {
                    dispatch(add(bundle));
                    return Promise.resolve();
                },
                () => {
                    dispatch(finishLoading());
                }
            );
        }

        if (isConnected) {
            retrieveStakes(signer!);
        } else {
            dispatch(reset());
        }
    }, [signer, isConnected, props.stakingApi, dispatch]);



    return (<>
        <Heading1>{t('stakes')}</Heading1>

        <BundleStakes 
            stakingApi={props.stakingApi}
            bundles={bundles}
            isBundlesLoading={isLoadingBundles}
            disableSelection={true}
            showMyAmounts={true}
            showTotalAmounts={true}
            showActions={true}
            />
    </>);
}