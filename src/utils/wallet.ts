import { ethers } from "ethers";
import { connectChain } from "../redux/slices/chain";
import { getAndUpdateBlock, getChainState, setAccountRedux, updateSigner } from "./chain";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { getEthersSigner } from "./walletconnect";
import { CHAIN_ID } from "../config/walletconnect";
import { store } from "../redux/store";


export async function reconnectWallets(dispatch: Dispatch<AnyAction>) {
    // try to reconnect walletconnect connection first
    const wcSigner = await getEthersSigner({ chainId: parseInt(CHAIN_ID || "1") });
    if (wcSigner !== undefined) {
        console.log("reconnect walletconnect");
        const provider = wcSigner.provider;
        dispatch(connectChain(await getChainState(provider, true)));
        setAccountRedux(wcSigner, dispatch);

        provider.on("block", (blockNumber: number) => {
            getAndUpdateBlock(dispatch, provider, blockNumber);
        });

        return;
    }

    // @ts-ignore
    if (window.ethereum !== undefined) {
        // try browser wallet reconnection first (metamask, ...)
        // @ts-ignore: window.ethereum is injected by metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        console.log("check if browser wallet reconnection is possible");
        const hasAccounts = (await provider.send("eth_accounts", [])).length > 0;
        console.log("hasAccounts", hasAccounts);
        if (hasAccounts) {
            console.log("reconnect browser wallet");
            getAndSetWalletAccount(dispatch);
            return;
        }
    }

}

export async function getAndSetWalletAccount(dispatch: Dispatch<AnyAction>) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    await provider.send("eth_requestAccounts", []);
    
    console.log("getting signer");
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    dispatch(connectChain(await getChainState(provider)));
    setAccountRedux(provider.getSigner(), dispatch);

    provider.on("block", (blockNumber: number) => {
        getAndUpdateBlock(dispatch, provider, blockNumber);
    });
}

export async function getAndUpdateWalletAccount(dispatch: any) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    await provider.send("eth_requestAccounts", []);
    
    console.log("getting signer");
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    updateSigner(dispatch, provider);

    provider.on("block", (blockNumber: number) => {
        getAndUpdateBlock(dispatch, provider, blockNumber);
    });
}

export async function addTokenToWallet(symbol: string, tokenAddress: string) {
    // @ts-ignore
    if (window.ethereum !== undefined) {
        // @ts-ignore
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: symbol,
                    decimals: 18,
                },
            },
        })
    }
}