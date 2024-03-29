import { Alert, Step, StepLabel, Stepper } from "@mui/material";
import confetti from "canvas-confetti";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import useNotifications from "../../hooks/notifications";
import { selectBundle } from "../../redux/slices/stakes";
import { bundleSelected, resetForm, setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { updateAccountBalance } from "../../utils/chain";
import { TransactionFailedError } from "../../utils/error";
import { ga_event } from "../../utils/google_analytics";
import { Heading1 } from "../heading";
import SelectBundle from "../stake/select_bundle";
import UnstakeBundle from "./unstake_bundle";


interface UnstakeProps {
    stakingApi: StakingApi;
}

export const REVOKE_INFO_URL = "https://metamask.zendesk.com/hc/en-us/articles/4446106184731-How-to-revoke-smart-contract-allowances-token-approvals";

export default function Unstake(props: UnstakeProps) {
    const { t } = useTranslation(['unstake', 'common']);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showPersistentErrorSnackbarWithCopyDetails } = useNotifications();
    const router = useRouter();
    const dispatch = useDispatch();
    
    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const activeStep = useSelector((state: RootState) => state.staking.step);
    const stakeingBundle = useSelector((state: RootState) => state.staking.stakeingBundle);
    const bundles = useSelector((state: RootState) => state.stakes.bundles);
    const ownedNfts = useSelector((state: RootState) => state.stakes.ownedNfts);
    
    const currency = props.stakingApi.currency();

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

    async function unstake(amount: BigNumber, nftId: string, max: boolean, bundle: BundleInfo) {
        ga_event("trx_start_unstake", { category: 'chain_trx' });
        try {
            enableUnloadWarning(true);
            const walletAddress = await signer!.getAddress();

            dispatch(setStep(4));
            const applicationSuccess = await doUnstake(stakeingBundle!, nftId, max, amount);
            if ( ! applicationSuccess) {
                ga_event("trx_fail_unstake", { category: 'chain_trx' });
                dispatch(setStep(3));
                return;
            }
            ga_event("trx_success_unstake", { category: 'chain_trx' });
            dispatch(setStep(5));
            await unstakingSuccessful(stakeingBundle!);
        } finally {
            enableUnloadWarning(false);
        }
    }

    async function doUnstake(bundle: BundleInfo, nftId: string, max: boolean, unstakeAmount: BigNumber): Promise<boolean> {
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            return await props.stakingApi.unstake(
                bundle,
                nftId,
                max,
                unstakeAmount,
                (address: string) => {
                    snackbar = enqueueSnackbar(
                        t('unstake_info', { address }),
                        { variant: "warning", persist: true }
                    );
                },
                () => {
                    if (snackbar !== undefined) {
                        closeSnackbar(snackbar);
                    }
                    snackbar = enqueueSnackbar(
                        t('unstake_wait'),
                        { variant: "info", persist: true }
                    );
                });
        } catch(e) { 
            if ( e instanceof TransactionFailedError) {
                console.log("transaction failed", e);
                if (snackbar !== undefined) {
                    closeSnackbar(snackbar);
                }

                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.transaction_failed', { ns: 'common', error: e.code }),
                    e.reason,
                    "unstake",
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

    async function unstakingSuccessful(bundle: BundleInfo) {
        enqueueSnackbar(
            t('unstaking_success'),
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
        await props.stakingApi.updateBundle(bundle);
        dispatch(selectBundle(bundles.findIndex(b => b.id === bundle.id)));
        router.push("/");
        updateAccountBalance(signer!, dispatch);
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

    const wizardElement = (() => {
        if (activeStep < 2) {
            return <>
                <Alert severity="info">{t('unstaking_info')}</Alert>
                <SelectBundle 
                    stakingApi={props.stakingApi}
                    displayBundle={(bundle: BundleInfo) => ownedNfts.filter(nft => nft.targetNftId === bundle.nftId && nft.unstakingAvailable === true).length > 0 }
                    bundleSelected={(bundle: BundleInfo) => dispatch(bundleSelected(bundle))}
                    />
                </>;
        } else {
            return <UnstakeBundle 
                stakingApi={props.stakingApi}
                bundle={stakeingBundle!}
                formDisabled={activeStep < 1 || activeStep > 3}
                unstake={unstake}
                />;
        }
    });

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

        {wizardElement()}
    </>)
}

