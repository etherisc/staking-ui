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
import { ApprovalFailedError, TransactionFailedError } from "../../utils/error";
import { formatCurrency } from "../../utils/numbers";
import { Heading1 } from "../heading";
import SelectBundle from "./select_bundle";
import StakeBundle from "./stake_bundle";

interface StakeProps {
    stakingApi: StakingApi;
}

export const REVOKE_INFO_URL = "https://metamask.zendesk.com/hc/en-us/articles/4446106184731-How-to-revoke-smart-contract-allowances-token-approvals";

export default function Stake(props: StakeProps) {
    const { t } = useTranslation(['stake', 'common']);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const dispatch = useDispatch();

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const activeStep = useSelector((state: RootState) => state.staking.step);
    const stakeingBundle = useSelector((state: RootState) => state.staking.stakeingBundle);

    const currencyDecimals = parseInt(process.env.NEXT_PUBLIC_DIP_DECIMALS ?? '18');

    const steps = ['step0', 'step1', 'step2', 'step3', 'step4', 'step5'];
    
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

    async function stake(amount: BigNumber, bundle: BundleInfo) {
        try {
            enableUnloadWarning(true);
            const walletAddress = await signer!.getAddress() ?? '';

            dispatch(setStep(4));
            const approvalSuccess = await doApproval(walletAddress, amount);
            if ( ! approvalSuccess) {
                dispatch(setStep(3));
                showAllowanceNotice();
                return;
            }
            dispatch(setStep(5));
            const applicationSuccess = await doStake(stakeingBundle!, amount);
            if ( ! applicationSuccess) {
                dispatch(setStep(3));
                showAllowanceNotice();
                return;
            }
            dispatch(setStep(6));
            stakingSuccessful();
        } finally {
            enableUnloadWarning(false);
        }
    }

    async function doApproval(walletAddress: string, amount: BigNumber): Promise<Boolean> {
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            return await props.stakingApi.createApproval(
                walletAddress, 
                amount, 
                (address, currency, amount) => {
                    snackbar = enqueueSnackbar(
                        t('approval_info', { address, currency, amount: formatCurrency(amount, currencyDecimals) }),
                        { variant: "warning", persist: true }
                    );
                },
                (address, currency, amount) => {
                    if (snackbar !== undefined) {
                        closeSnackbar(snackbar);
                    }
                    snackbar = enqueueSnackbar(
                        t('approval_wait'),
                        { variant: "info", persist: true }
                    );
                }
            );
        } catch(e) { 
            if ( e instanceof ApprovalFailedError) {
                console.log("approval failed", e);
                if (snackbar !== undefined) {
                    closeSnackbar(snackbar);
                }

                enqueueSnackbar(
                    t('error.approval_failed', { ns: 'common', error: e.code }),
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

    async function doStake(bundle: BundleInfo, stakedAmount: BigNumber): Promise<boolean> {
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            return await props.stakingApi.stake(
                bundle,
                stakedAmount,
                (address: string) => {
                    snackbar = enqueueSnackbar(
                        t('stake_info', { address }),
                        { variant: "warning", persist: true }
                    );
                },
                () => {
                    if (snackbar !== undefined) {
                        closeSnackbar(snackbar);
                    }
                    snackbar = enqueueSnackbar(
                        t('stake_wait'),
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

    function showAllowanceNotice() {
        enqueueSnackbar(
            (<>
                {t('error.allowance_revoke_notice', { ns: 'common' })}&nbsp;
                <a href={REVOKE_INFO_URL} target="_blank" rel="noreferrer">here</a>
            </>),
            { 
                variant: "info", 
                persist: true,
                action: (key) => {
                    return (
                        <Button onClick={() => {closeSnackbar(key)}}>{t('action.close', { ns: 'common' })}</Button>
                    );
                }
            }
        );
    }

    function stakingSuccessful() {
        enqueueSnackbar(
            t('staking_success'),
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
                displayBundle={(bundle: BundleInfo) => bundle.stakingSupported}
                />;
        } else {
            return <StakeBundle 
                formDisabled={activeStep < 2 || activeStep > 3}
                stakingApi={props.stakingApi}
                bundle={stakeingBundle!}
                stake={stake}
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

