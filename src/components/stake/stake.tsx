import { Stepper, Step, StepLabel } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useContext, useState, useEffect } from "react";
import { StakingApi } from "../../backend/staking_api";
import { AppContext } from "../../context/app_context";
import { Heading1 } from "../heading";
import Bundles from "./bundles";

interface StakeProps {
    stakingApi: StakingApi;
}

export default function Stake(props: StakeProps) {
    const appContext = useContext(AppContext);
    const { t } = useTranslation(['stake', 'common']);

    const currency = process.env.NEXT_PUBLIC_DIP_SYMBOL;

    const steps = ['step0', 'step1', 'step2', 'step3', 'step4', 'step5'];
    const [ activeStep, setActiveStep ] = useState(appContext.data.signer === undefined ? 0 : 1);
    
    // change steps according to application state
    useEffect(() => {
        if (appContext?.data.signer === undefined) {
            setActiveStep(0);
        } else if (activeStep < 1 && appContext.data.signer !== undefined) {
            setActiveStep(1);
        // } else if (activeStep == 1 && readyToStake) {
        //     setActiveStep(2);
        // } else if (activeStep == 2 && !readyToBuy) { 
        //     setActiveStep(1);
        // } else if (activeStep > 4) { // application completed
        //     setFormDisabled(true);
        }
    }, [appContext?.data.signer, activeStep]);


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

        <Bundles 
            stakingApi={props.stakingApi}
            />
    </>)
}

