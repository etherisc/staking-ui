import { useEffect, useState } from "react";
import Blockies from 'react-blockies';
import { DOT, NBSP } from "../../utils/chars";
import { Box, Avatar } from "@mui/material";
import Balance from "../balance";
import Address from "../address";
import Logout from "./logout";
import { reconnectWallets } from "../../utils/wallet";
import Login from "./login";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { useWalletClient } from "wagmi";
import { getEthersSigner } from "../../utils/walletconnect";
import { CHAIN_ID } from "../../config/walletconnect";
import { getAndUpdateBlock, getChainState, setAccountRedux } from "../../utils/chain";
import { connectChain, disconnectChain } from "../../redux/slices/chain";
import { JsonRpcSigner } from "@ethersproject/providers";

export default function Account() {
    const dispatch = useDispatch();
    const signer = useSelector((state: RootState) => state.chain.signer);
    const { isConnected, isWalletConnect } = useSelector((state: RootState) => state.chain);
    const address = useSelector((state: RootState) => state.account.address);
    // const { data: walletClient } = useWalletClient();

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
        reconnectWallets(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // handle wallet connect connection state (login/logout)
    // useEffect(() => {
    //     console.log("walletClient changed", walletClient);
    //     async function login() {
    //         console.log("wallet connect login");
    //         // const signer = await getEthersSigner({ chainId: parseInt(CHAIN_ID || "1") });
    //         // if (signer === undefined) {
    //         //     return;
    //         // }
    //         // const provider = signer.provider;
    //         // dispatch(connectChain(await getChainState(provider, true)));
    //         // setAccountRedux(signer, dispatch);

    //         // provider.on("block", (blockNumber: number) => {
    //         //     getAndUpdateBlock(dispatch, provider, blockNumber);
    //         // });
    //     }

    //     if (walletClient !== undefined && ! loggedIn) {
    //         login();
    //     } else if (walletClient === undefined && loggedIn && isWalletConnect) {
    //         console.log("wallet connect logout")
    //         dispatch(disconnectChain());
    //     }
    // }, [walletClient, loggedIn, dispatch, isWalletConnect]);
    

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

