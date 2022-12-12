import { Stepper, Step, StepLabel } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StakingApi } from "../../backend/staking_api";
import { AppContext } from "../../context/app_context";
import { setStep } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { Heading1 } from "../heading";
import SelectBundle from "./select_bundle";
import StakeBundle from "./stake_bundle";

interface StakeProps {
    stakingApi: StakingApi;
}

export default function Stake(props: StakeProps) {
    const appContext = useContext(AppContext);
    const { t } = useTranslation(['stake', 'common']);

    const activeStep = useSelector((state: RootState) => state.staking.step);
    const stakeingBundle = useSelector((state: RootState) => state.staking.stakeingBundle);
    const dispatch = useDispatch();

    const currency = process.env.NEXT_PUBLIC_DIP_SYMBOL;

    const steps = ['step0', 'step1', 'step2', 'step3', 'step4', 'step5'];
    

    // change steps according to application state
    useEffect(() => {
        if (appContext?.data.signer === undefined) {
            dispatch(setStep(0));
        } else if (activeStep < 1 && appContext.data.signer !== undefined) {
            dispatch(setStep(1));
        // } else if (activeStep == 1 && readyToStake) {
        //     setActiveStep(2);
        // } else if (activeStep == 2 && !readyToBuy) { 
        //     setActiveStep(1);
        // } else if (activeStep > 4) { // application completed
        //     setFormDisabled(true);
        }
    }, [appContext?.data.signer, activeStep, dispatch]);

    const wizardElement = (() => {
        if (activeStep < 2) {
            return <SelectBundle 
                stakingApi={props.stakingApi}
                />;
        } else {
            return <StakeBundle 
                stakingApi={props.stakingApi}
                bundle={stakeingBundle!}
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

