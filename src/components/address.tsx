import { ContentCopy } from "@mui/icons-material";
import { Signer } from "ethers";
import { useState, useEffect } from "react";
import { NBSP } from "../utils/chars";
import { useSnackbar } from 'notistack';
import { useTranslation } from "next-i18next";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import WithTooltip from "./with_tooltip";

export interface AddressProps {
    address: string;
    iconColor?: string;
}

export default function Address(props: AddressProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation('common');

    const iconColor = props.iconColor ?? "";

    
    async function copyAddressToClipboard() {
        await navigator.clipboard.writeText(props.address);
        enqueueSnackbar(t('action.address_copied'),  { autoHideDuration: 2000, variant: 'info' });
    }

    const abrAdr = `${props.address.substring(0, 6)}…${props.address.substring(props.address.length - 4)}`;
    const abrAdrMobile = `0x…${props.address.substring(props.address.length - 4)}`;

    return (
        <>
            <Box component="span" sx={{ display: { 'xs': 'none', 'md': 'inline'}}}>
                <WithTooltip tooltipText={props.address} typographyVariant="body">
                    {abrAdr}
                </WithTooltip>
                {NBSP}
                <WithTooltip tooltipText={t('action.copy_value')}>
                    <Typography color={iconColor} component="span">
                        <FontAwesomeIcon icon={faCopy} className="fa cursor-pointer" onClick={copyAddressToClipboard} data-testid="copy-button" />
                    </Typography>
                </WithTooltip>
            </Box>
            <Box component="span" sx={{ display: { 'xs': 'inline', 'md': 'none'}}}>
                {abrAdrMobile}
            </Box>
        </>
    );
}
