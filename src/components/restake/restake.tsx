import { Step, StepLabel, Stepper } from "@mui/material";
import confetti from "canvas-confetti";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo, BundleState } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import useNotifications from "../../hooks/notifications";
import { selectBundle } from "../../redux/slices/stakes";
import { bundleSelected, resetForm, restakingBundleSelected, setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { updateAccountBalance } from "../../utils/chain";
import { TransactionFailedError } from "../../utils/error";
import { ga_event } from "../../utils/google_analytics";
import { Heading1 } from "../heading";
import SelectBundle from "../stake/select_bundle";
import RestakeBundle from "./restake_bundle";

interface RestakeProps {
    stakingApi: StakingApi;
}

export default function Restake(props: RestakeProps) {
    const { t } = useTranslation(['restake', 'common']);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showPersistentErrorSnackbarWithCopyDetails } = useNotifications();
    const router = useRouter();
    const dispatch = useDispatch();

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const activeStep = useSelector((state: RootState) => state.staking.step);
    const stakeingBundle = useSelector((state: RootState) => state.staking.stakeingBundle);
    const restakingBundle = useSelector((state: RootState) => state.staking.restakingBundle);
    const bundles = useSelector((state: RootState) => state.stakes.bundles);
    const ownedNfts = useSelector((state: RootState) => state.stakes.ownedNfts);

    const steps = ['step0', 'step1', 'step2', 'step3', 'step4'];
    
    useEffect(() => {
        if (! router.isReady ) {
            return;
        }
        if ( router.query.noreset !== 'true') {
            dispatch(resetForm());
        }
    }, []);

    // change steps according to application state
    useEffect(() => {
        if (! isConnected) {
            dispatch(setStep(0));
        } else if (activeStep < 1 && isConnected) {
            dispatch(setStep(1));
        }
    }, [isConnected, activeStep, dispatch]);

    async function restake(amount: BigNumber, bundle: BundleInfo) {
        ga_event("trx_start_restake", { category: 'chain_trx' });
        try {
            enableUnloadWarning(true);
            const walletAddress = await signer!.getAddress() ?? '';

            dispatch(setStep(4));
            const newBundleId = "3"; // TODO: get real value
            const applicationSuccess = await doRestake(stakeingBundle!, newBundleId);
            if ( ! applicationSuccess) {
                ga_event("trx_fail_restake", { category: 'chain_trx' });
                dispatch(setStep(3));
                return;
            }
            ga_event("trx_success_restake", { category: 'chain_trx' });
            dispatch(setStep(5));
            await restakingSuccessful(stakeingBundle!);
        } finally {
            enableUnloadWarning(false);
        }
    }

    async function doRestake(bundle: BundleInfo, newBundeId: string): Promise<boolean> {
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            // TODO: implement restake
            // const res = await props.stakingApi.restake(
            //     bundle,
            //     newBundleId,
            //     (address: string) => {
            //         snackbar = enqueueSnackbar(
            //             t('restake_info', { address }),
            //             { variant: "warning", persist: true }
            //         );
            //     },
            //     () => {
            //         if (snackbar !== undefined) {
            //             closeSnackbar(snackbar);
            //         }
            //         snackbar = enqueueSnackbar(
            //             t('restake_wait'),
            //             { variant: "info", persist: true }
            //         );
            //     });
            // return res;
            return true;
        } catch(e) { 
            if ( e instanceof TransactionFailedError) {
                console.log("transaction failed", e);
                if (snackbar !== undefined) {
                    closeSnackbar(snackbar);
                }

                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.transaction_failed', { ns: 'common', error: e.code }),
                    e.reason,
                    "restake",
                );
                return Promise.resolve(false);
            } else {
                throw e;
            }
        } finally {
            if (snackbar !== undefined) {
                closeSnackbar(snackbar);
            }
        }
    }

    async function restakingSuccessful(stakingBundle: BundleInfo) {
        enqueueSnackbar(
            t('restaking_success'),
            { 
                variant: 'success', 
                autoHideDuration: 5000, 
                preventDuplicate: true,
            }
        );
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        await props.stakingApi.updateBundle(stakingBundle);
        updateAccountBalance(signer!, dispatch);
        dispatch(selectBundle(bundles.findIndex(b => b.id === stakingBundle.id)));
        router.push("/");
    }

    function enableUnloadWarning(enable: boolean) {
        if (enable) {
            window.onbeforeunload = function() {
                return t('warning.unload_page', { ns: 'common' });
            }
        } else {
            window.onbeforeunload = null;
        }
    }

    const wizardElement = useMemo(() => {
        if (activeStep < 2) {
            return <SelectBundle 
                stakingApi={props.stakingApi}
                displayBundle={(bundle: BundleInfo) => {
                    const hasStakeInBundle = ownedNfts.filter(nft => bundle.myStakedNfsIds.includes(nft.nftId) && BigNumber.from(nft.stakedAmount).gt(0)).length > 0;
                    return (bundle.state === BundleState.CLOSED || bundle.state ===  BundleState.BURNED) && hasStakeInBundle;
                }}
                bundleSelected={(bundle: BundleInfo) => dispatch(bundleSelected(bundle))}
                />;
        } else if (activeStep == 2) {
            return <SelectBundle 
                stakingApi={props.stakingApi}
                displayBundle={(bundle: BundleInfo) => {
                    return (bundle.state === BundleState.ACTIVE || bundle.state === BundleState.LOCKED);
                }}
                bundleSelected={(bundle: BundleInfo) => dispatch(restakingBundleSelected(bundle))}
                />;
        } else {
            return <RestakeBundle 
                formDisabled={activeStep < 2 || activeStep > 4}
                stakingApi={props.stakingApi}
                currentBundle={stakeingBundle!}
                restakeBundle={restakingBundle!}
                stake={restake}
                />;
        }
    }, [activeStep]);

    return (<>
        <Heading1>{t('page_title', { currency: 'DIP'})}</Heading1>
        
        <Stepper activeStep={activeStep} sx={{ display: { 'xs': 'none', 'md': 'flex' }}}>
            {steps.map((label) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{t(label)}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>

        <br />

        {wizardElement}
    </>)
}

