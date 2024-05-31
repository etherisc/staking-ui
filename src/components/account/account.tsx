import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Blockies from 'react-blockies';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DOT, NBSP } from "../../utils/chars";
import { reconnectWallets } from "../../utils/wallet";
import Address from "../address";
import Balance from "../balance";
import Login from "./login";
import Logout from "./logout";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers, providers } from "ethers";
import { connectChain } from "../../redux/slices/chain";
import { getChainState, setAccountRedux } from "../../utils/chain";
import { setWalletConnectAccount } from "../../utils/walletconnect";

export default function Account() {
    const dispatch = useDispatch();
    const signer = useSelector((state: RootState) => state.chain.signer);
    const { isConnected } = useSelector((state: RootState) => state.chain);
    const address = useSelector((state: RootState) => state.account.address);

    const { address: wcAddress, isConnected: wcIsConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();  

    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        console.log("signer changed");
        if (isConnected) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [signer, isConnected]);

    useEffect(() => {
        reconnectWallets(dispatch, walletProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // wallet connect login
    useEffect(() => {
        console.log("wallet connect v2 button: address: ", wcAddress, " isConnected: ", wcIsConnected);
        if (!wcIsConnected) return;
        setWalletConnectAccount(walletProvider, dispatch);
    }, [wcAddress, wcIsConnected, isConnected, walletProvider, dispatch]);

    if (! loggedIn) {
        return (
            <>
                <Login />
            </>
        );
    }

    let account = (<></>);

    if (isConnected && address !== undefined && address !== "") {
        account = (
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 1, display: { 'xs': 'none', 'md': 'inline-flex'} }} >
                    <Blockies seed={address} size={10} scale={4} />
                </Avatar>
                <Box sx={{ mr: 1, alignItems: 'center', verticalAlign: 'middle' }}>
                    <Address address={address}/>
                    <Box component="span" sx={{ display: { 'xs': 'none', 'md': 'inline-flex'}}}>
                        {NBSP} {DOT} {NBSP}
                        <Balance />
                    </Box>
                </Box>
                <Logout />
            </Box>
        );
    }

    return (<>{account}</>);
}

