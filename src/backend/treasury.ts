import { ContractReceipt, ContractTransaction, ethers, Signer } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";
import { IInstanceService, IInstanceService__factory, IRegistry__factory } from "../contracts/gif-interface";
import { ApprovalFailedError } from "../utils/error";
import { getErc20Token } from "./erc20";

export class Treasury {

    private signer: Signer;
    private registryAddress: string;
    private treasuryAddress?: string;

    constructor(signer: Signer, registryAddress: string) {
        this.signer = signer;
        this.registryAddress = registryAddress;
    }

    async initialize() {
        const registry = this.getInstanceService(this.registryAddress, this.signer);
        this.treasuryAddress = await (await registry).getTreasuryAddress();
    }

    async createApprovalForTreasury(
        tokenAddress: string, 
        signer: Signer, 
        amount: number, 
        beforeApprovalCallback?: (address: string, currency: string, amount: number) => void,
        beforeWaitCallback?: (address: string, currency: string, amount: number) => void
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log(`creating treasury approval for ${amount} on token ${tokenAddress}`);
        const usd1 = getErc20Token(tokenAddress, signer);
        if (beforeApprovalCallback !== undefined) {
            beforeApprovalCallback(this.treasuryAddress!, "", amount); // TODO: currency symbol
        }
        try {
            const tx = await usd1.approve(this.treasuryAddress!, amount);
            console.log("tx done", tx)
            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(this.treasuryAddress!, "", amount); // TODO: currency symbol
            }
            const receipt = await tx.wait();
            console.log("wait done", receipt, tx)
            return [tx, receipt];
        } catch (e) {
            console.log("caught error during approval: ", e);
            // @ts-ignore e.code
            throw new ApprovalFailedError(e.code, e);
        }
    }

    async getInstanceService(registryAddress: string, signer: Signer): Promise<IInstanceService> {
        console.log("getInstanceService", registryAddress);
        const registry = IRegistry__factory.connect(registryAddress, signer);
        const instanceServiceAddress = await registry.getContract(formatBytes32String("InstanceService"));
        console.log("instanceServiceAddress", instanceServiceAddress);
        return IInstanceService__factory.connect(instanceServiceAddress, signer);
    }

}

