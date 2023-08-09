import { BigNumber, Signer } from "ethers";
import { toHex } from "../utils/numbers";
import { BundleInfo } from "./bundle_info";
import { CoPresentSharp } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { formatBytes32String } from "ethers/lib/utils";
import { TransactionFailedError } from "../utils/error";

export default class StakingGasless {
    private stakingProductAddress: string | undefined;
    private chainId: string;
    private signer: Signer;

    constructor(signer: Signer) {
        this.signer = signer;
        this.stakingProductAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
        this.chainId = toHex(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "1"));
    }

    async stakeGasless(
        bundle: BundleInfo,
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        if (process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION !== 'true') {
            throw new Error("Gasless transactions are not enabled");
        }
        
        console.log("stakeGasless", bundle, stakedAmount.toString());


        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback("");
        }
        
        const domain = {
            chainId: this.chainId, // TODO: verify
            name: 'EtheriscStaking', // TODO: verify
            verifyingContract: this.stakingProductAddress, // TODO: verify
            version: '1', // TODO: verify
        };

        const types = {
            // TODO: implement 
            Stake: [
            //     { name: 'wallet', type: 'address' },
            //     { name: 'protectedBalance', type: 'uint256' },   
            //     { name: 'duration', type: 'uint256' },
            //     { name: 'bundleId', type: 'uint256' },
                { name: 'signatureId', type: 'bytes32' },
            ],
        }

        const signatureId = nanoid();
        const message = {
            // TODO: implement 
            // wallet: walletAddress,
            // protectedBalance: formatUnits(protectedAmount, 0),
            // duration: coverageDurationSeconds,
            // bundleId: bundleId,
            signatureId: formatBytes32String(signatureId), 
        };

        const policyHolderAddress = await this.signer.getAddress();
        console.log("sending sign request", policyHolderAddress, domain, types, message);
        let signature;

        try {
            // @ts-ignore - _signTypedData is not part of the public API, but it's a generic way to sign EIP712 messages
            signature = await this.signer._signTypedData(domain, types, message);
            console.log("signature", signature);        
        } catch (e) {
            console.log("signing failed", e);
            throw new TransactionFailedError("Transaction signing failed", e);
        }

        const data = {
            // TODO: implement
            // policyHolder: policyHolderAddress,
            // protectedWallet: walletAddress,
            // protectedBalance: protectedAmount.toString(),
            // duration: coverageDurationSeconds,
            // bundleId,
            signatureId,
            signature,
        };

        const res = await fetch("/api/feeless/stake", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (res.status !== 200) {
            throw new TransactionFailedError(`invalid response from backend. statuscode ${res.status}. test: ${res.text}`, res.statusText);
        }

        return true;    
    }

}