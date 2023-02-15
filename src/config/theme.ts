import { createTheme } from '@mui/material/styles';

// etherisc main colors
// red: EE4620
// blue: 5081F4
// green: 41D895
// yellow: F8B83A
// dark gray: 333F52
// light gray: C5D0DE

export const etheriscTheme = createTheme({
    palette: {
        background: {
            // default: 'hsl(153,66%,98%)',
            // paper: 'hsl(222,74%,96%)'
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            // main: "hsl(153, 66%, 50%)", // green
            main: "#2B66EE", // green
            // dark: will be calculated from palette.primary.main,
            // contrastText: "#fff"
        },
        secondary: {
            // light: will be calculated from palette.secondary.main,
            // main: "#F8B83A", // yellow
            main: "#41D895",
            // dark: will be calculated from palette.secondary.main,
            // contrastText: will be calculated to contrast with palette.secondary.main
            contrastText: "#fff"
        },
    },
});

export const INPUT_VARIANT = 'filled';
