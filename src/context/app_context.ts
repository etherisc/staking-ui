import { ethers, providers, Signer } from "ethers";
import React, { Dispatch } from "react";
import { expectedChain } from "../utils/const";
import { toHex } from "../utils/numbers";

export interface AppContext {
    data: AppData;
    dispatch: React.Dispatch<AppAction>;
}

export interface AppData {
    chainId: string;
    isExpectedChain: boolean;
    provider: providers.Web3Provider | undefined;
    signer: Signer | undefined;
}

export const AppContext = React.createContext<AppContext>({ data: initialAppData(), dispatch: () => {} });
AppContext.displayName = "AppContext";

export function initialAppData(): AppData {
    return {
        chainId: "0x0",
        isExpectedChain: true,
        provider: undefined,
        signer: undefined,
    };
}

export enum AppActionType {
    SET,
    UNSET,
    UPDATE_SIGNER,
}

export interface AppAction {
    type: AppActionType;
    signer?: Signer;
    provider?: providers.Web3Provider;
    chainId?: string;
}

export function signerReducer(state: AppData, action: AppAction): AppData {
    switch (action.type) {
        case AppActionType.SET:
            return { 
                ...state,
                chainId: action.chainId ?? "0x0",
                isExpectedChain: action.chainId === expectedChain,
                provider: action?.provider,
                signer: action?.signer,
            };
        case AppActionType.UNSET:
            return { 
                ...state,
                chainId: "0x0",
                isExpectedChain: true,
                provider: undefined,
                signer: undefined,
            };
        case AppActionType.UPDATE_SIGNER:
            return {
                ...state,
                signer: action?.signer,
            };
        default:
            throw Error("unxpected action type " + action.type);
    }
}

export async function setSigner(dispatch: Dispatch<AppAction>, provider: ethers.providers.Web3Provider) {
    const signer = provider.getSigner(); 
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    console.log("set signer", signer, chainId);
    dispatch({ type: AppActionType.SET, signer: signer, provider: provider, chainId: toHex(chainId) });
}

export function updateSigner(dispatch: Dispatch<AppAction>, provider: ethers.providers.Web3Provider) {
    const signer = provider.getSigner();  
    console.log("update signer", signer);
    dispatch({ type: AppActionType.UPDATE_SIGNER, signer: signer });
}

export function removeSigner(dispatch: Dispatch<AppAction>) {
    dispatch({ type: AppActionType.UNSET });
    console.log("unset signer");
    window.localStorage.clear();
}
