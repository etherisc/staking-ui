import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

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
            default: 'hsl(222,74%,96%)',
            paper: 'hsl(222,74%,96%)'
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#41D895',
            // main: 'hsl(153, 40%, 50%)',
            // dark: will be calculated from palette.primary.main,
            contrastText: "#fff"
        },
        secondary: {
            // light: will be calculated from palette.secondary.main,
            main: "#F8B83A",
            // dark: will be calculated from palette.secondary.main,
            // contrastText: will be calculated to contrast with palette.secondary.main
            // contrastText: "#fff"
        },
    },
});
