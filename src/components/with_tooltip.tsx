import { Box, Tooltip, Typography } from "@mui/material";
import { width } from "@mui/system";

export default function WithTooltip(props: any) {
    const { tooltipText, children, typographyVariant, withEllipsis } = props;

    let content = (<>{children}</>);
    if (withEllipsis === true) {
        content = (<Box component="span" sx={{ overflow: "hidden", textOverflow: 'ellipsis', width: 1, display: 'block' }}>
                    {children}
                </Box>);
    }

    return (<>
        <Tooltip title={tooltipText} enterDelay={700} leaveDelay={200} sx={{ display: 'block'}}>
            <Typography variant={ typographyVariant || 'body2' } component="span">
                {content}
            </Typography>
        </Tooltip>
    </>);
}