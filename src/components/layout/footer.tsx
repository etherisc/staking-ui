import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';
import { DOT } from '../../utils/chars';
import ChainData from './chain_data';
import Faucet from './faucet';
import buildInfo from "../../version.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { addTokenToWallet } from '../../utils/wallet';

export default function Footer() {
    const theme = useTheme();

    function addDipToWallet() {
        const symbol = process.env.NEXT_PUBLIC_FAUCET_SYMBOL ?? 'DIP';
        const tokenAddress = process.env.NEXT_PUBLIC_DIP_ADDRESS ?? '0xc719d010b63e5bbf2c0551872cd5316ed26acd83';
        addTokenToWallet(symbol, tokenAddress);
    }

    return (
        <footer style={{ marginTop: 'auto', marginBottom: 0 }}>
            <Container maxWidth={false} sx={{
                marginTop: '32px', 
                paddingTop: 0.6,
                paddingBottom: 0.6,
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: theme.palette.grey[200],
            }}>
                <Container 
                    maxWidth={false}
                    sx={{ mr: 'auto', ml: 'auto', py: 1, display: { 'xs': 'none', 'md': 'flex' } }} 
                    color="palette.secondary.dark"
                    >
                    <Box 
                        sx={{ 
                            display: { 'xs': 'none', 'md': 'flex' }, 
                            ml: '0', 
                            mr: 'auto', 
                            verticalAlign: 'middle', 
                        }} 
                        justifySelf="left"
                        >
                        <Typography variant="body2" sx={{ fontSize: '10px', ml: 1 }}  color="palette.priary.dark">
                            {buildInfo.name} v{buildInfo.version} ({buildInfo.date})
                        </Typography>
                    </Box>
                    <Box 
                        sx={{ display: { 'xs': 'none', 'md': 'flex' }, ml: 'auto', mr: 0 }} 
                        justifySelf="right"
                        >
                        <Faucet />
                        <Typography variant="body2" sx={{ fontSize: '10px' }} >
                            {DOT}
                        </Typography>
                        <Button variant="text" sx={{ p: 0, ml: 1 }} onClick={addDipToWallet}>
                            <Typography variant="body2" sx={{ fontSize: '10px' }} >
                                Add DIP token to
                                <FontAwesomeIcon icon={faWallet} className="fa cursor-pointer" />
                            </Typography>
                        </Button>
                        <Typography variant="body2" sx={{ fontSize: '10px' }}  color="palette.priary.dark">
                            {DOT}
                        </Typography>
                        <ChainData />
                    </Box>
                </Container>
            </Container>
        </footer>
    );
}
