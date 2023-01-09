import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { palette } from '@mui/system';
import React from 'react';
import { DOT } from '../../utils/chars';
import ChainData from './chain_data';
import Faucet from './faucet';

export default function Footer() {

    return (
        <footer>
            <Container maxWidth={false} sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "HSL(214, 27%, 92%)",
            }}>
                <Box maxWidth="lg" sx={{ mr: 'auto', ml: 'auto', py: 1, display: { 'xs': 'none', 'md': 'flex' } }} flexWrap="wrap" justifyContent="right" color="palette.secondary.dark">
                    <Faucet />
                    <Typography variant="body2" sx={{ fontSize: '10px', ml: 1 }}  color="palette.priary.dark">
                        {DOT}
                    </Typography>
                    <ChainData />
                </Box>
            </Container>
        </footer>
    );
}
