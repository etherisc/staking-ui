import { Box, Icon, SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from '@mui/material';
import { LinkBehaviour } from "../link_behaviour";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
import { useRouter } from "next/router";


export function HeaderLink(props: any) {
    const { text, href, variant, icon, selfAction } = props;

    const theme = useTheme();
    const showIcons = useMediaQuery(theme.breakpoints.up('lg'));
    const { asPath } = useRouter();

    let iconElement = (<></>);
    if (icon && showIcons) {
        iconElement = <FontAwesomeIcon icon={icon} className="fa" />;
    }

    const linkContent = (<Typography
            variant={variant ?? "subtitle1"}
            noWrap
            sx={{
                ml: 2,
                mr: 2,
                display: { xs: 'none', md: 'inline-flex' },
                color: '#eee',
                textDecoration: 'none',
            }}
        >
            <Box>
                {iconElement}
                {text}
            </Box>
        </Typography>);

    if (asPath === href) {
        return (<Link onClick={selfAction} sx={{ cursor: 'pointer' }}>
                    {linkContent}
                </Link>);
    } else {
        return (<Link href={href} component={LinkBehaviour} >
                    {linkContent}
                </Link>);
    }
}