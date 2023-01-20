import { Stepper, Step, StepLabel, Button } from "@mui/material";
import confetti from "canvas-confetti";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { resetForm, setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { updateAccountBalance } from "../../utils/chain";
import { TransactionFailedError } from "../../utils/error";
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
    const router = useRouter();
    const dispatch = useDispatch();
    
    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const activeStep = useSelector((state: RootState) => state.staking.step);
    const stakeingBundle = useSelector((state: RootState) => state.staking.stakeingBundle);
    
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

    useEffect

    async function unstake(amount: BigNumber, max: boolean, bundle: BundleInfo) {
        try {
            enableUnloadWarning(true);
            const walletAddress = await signer!.getAddress();

            dispatch(setStep(4));
            const applicationSuccess = await doUnstake(stakeingBundle!, max, amount);
            if ( ! applicationSuccess) {
                dispatch(setStep(3));
                return;
            }
            dispatch(setStep(5));
            unstakingSuccessful();
        } finally {
            enableUnloadWarning(false);
        }
    }

    async function doUnstake(bundle: BundleInfo, max: boolean, unstakeAmount: BigNumber): Promise<boolean> {
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            return await props.stakingApi.unstake(
                bundle,
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

                enqueueSnackbar(
                    t('error.transaction_failed', { ns: 'common', error: e.code }),
                    { 
                        variant: "error", 
                        persist: true,
                        action: (key) => {
                            return (
                                <Button onClick={() => {closeSnackbar(key)}}>{t('action.close', { ns: 'common' })}</Button>
                            );
                        }
                    }
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

    function unstakingSuccessful() {
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
        router.push("/stakes");
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
            return <SelectBundle 
                stakingApi={props.stakingApi}
                displayBundle={(bundle: BundleInfo) => bundle.unstakingSupported}
                />;
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

