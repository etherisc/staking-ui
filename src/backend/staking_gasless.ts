import { BigNumber, Signer } from "ethers";
import { formatBytes32String, formatUnits } from "ethers/lib/utils";
import { nanoid } from "nanoid";
import { IStaking__factory } from "../contracts/registry-contracts";
import { TransactionFailedError } from "../utils/error";
import { toHex } from "../utils/numbers";
import { BundleInfo } from "./bundle_info";

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

        const messageHelperAddress = await IStaking__factory.connect(this.stakingProductAddress!, this.signer).getMessageHelperAddress();
        
        const domain = {
            chainId: this.chainId, 
            name: 'EtheriscStaking', 
            verifyingContract: messageHelperAddress, 
            version: '1', 
        };

        const types = {
            Stake: [
                { name: 'target', type: 'uint96' },
                { name: 'dipAmount', type: 'uint256' },
                { name: 'signatureId', type: 'bytes32' },
            ],
        }

        const signatureId = nanoid();
        const message = {
            target: bundle.nftId,
            dipAmount: formatUnits(stakedAmount, 0),
            signatureId: formatBytes32String(signatureId), 
        };

        const ownerAddress = await this.signer.getAddress();
        console.log("sending sign request", ownerAddress, domain, types, message);
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
            owner: ownerAddress,
            targetNftId: bundle.nftId,
            dipAmount: stakedAmount.toString(),
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

    async restakeGasless(
        stakeNftId: BigNumber,
        newTargetNftId: BigNumber,
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        if (process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION !== 'true') {
            throw new Error("Gasless transactions are not enabled");
        }
        
        console.log("restakeGasless", stakeNftId, newTargetNftId);


        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback("");
        }

        const messageHelperAddress = await IStaking__factory.connect(this.stakingProductAddress!, this.signer).getMessageHelperAddress();
        
        const domain = {
            chainId: this.chainId, 
            name: 'EtheriscStaking', 
            verifyingContract: messageHelperAddress, 
            version: '1', 
        };

        const types = {
            Restake: [
                { name: 'stakeId', type: 'uint96' },
                { name: 'newTarget', type: 'uint96' },
                { name: 'signatureId', type: 'bytes32' },
            ],
        }

        const signatureId = nanoid();
        const message = {
            stakeId: stakeNftId.toString(),
            newTarget: newTargetNftId.toString(),
            signatureId: formatBytes32String(signatureId),
        };

        const ownerAddress = await this.signer.getAddress();
        console.log("sending sign request", ownerAddress, domain, types, message);
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
            owner: ownerAddress,
            stakeNftId: stakeNftId.toString(),
            targetNftId: newTargetNftId.toString(),
            signatureId,
            signature,
        };

        const res = await fetch("/api/feeless/restake", {
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