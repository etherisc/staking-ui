import { Tooltip, Typography } from "@mui/material";

export default function WithTooltip(props: any) {
    const { text, tooltipText } = props;
    return (<>
        <Tooltip title={tooltipText} enterDelay={700} leaveDelay={200}>
            <Typography>
                {text}
            </Typography>
        </Tooltip>
    </>);
}