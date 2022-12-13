import { Step, StepLabel, Stepper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/app_context";

interface HeadingProps {
    children: React.ReactNode;
}

export function Heading1(props: HeadingProps) {    
    return (
        <Typography variant="h5" mb={2}>{props.children}</Typography>
    );
}

export function Heading2(props: HeadingProps) {    
    return (
        <Typography variant="h6">{props.children}</Typography>
    );
}