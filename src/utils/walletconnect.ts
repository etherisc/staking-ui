import { ethers } from 'ethers';
import { connectChain } from '../redux/slices/chain';
import { getChainState, setAccountRedux } from './chain';

export async function setWalletConnectAccount(walletProvider: any, dispatch: any) {
    console.log("set provider/signer via walletconnect")
    const provider = new ethers.providers.Web3Provider(walletProvider); 
    console.log("provider", provider);
    dispatch(connectChain(await getChainState(provider, true)));
    setAccountRedux(provider.getSigner(), dispatch);
}
