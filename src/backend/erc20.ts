import { BigNumber, ContractReceipt, ContractTransaction, Signer } from "ethers";
import { ApprovalFailedError } from "../utils/error";
import { formatUnits } from "ethers/lib/utils";
import { ERC20, ERC20__factory } from "../contracts/registry-contracts";

export function getErc20Token(address: string, signer: Signer): ERC20 {
    return ERC20__factory.connect(address, signer);
}

/** Checks weather the given wallet has the expected balance */
export async function hasBalance(walletAddress: string, expectedBalance: number, tokenAddress: string, signer: Signer): Promise<boolean> {
    const token = getErc20Token(tokenAddress, signer);
    const balance = await token.balanceOf(walletAddress);
    return balance.gte(expectedBalance);
}

export async function transferAmount(walletAddress: string, amountToTransfer: BigNumber, tokenAddress: string, signer: Signer): Promise<boolean> {
    console.log(`Transferring ${amountToTransfer} from ${walletAddress} to ${tokenAddress}`);
    const token = getErc20Token(tokenAddress, signer);
    const tx = await token.transfer(walletAddress, amountToTransfer);
    const rcpt = await tx.wait();
    return rcpt.status === 1;
}


export async function createDipApproval(
    recipient: string,
    amount: BigNumber, 
    signer: Signer, 
    beforeApprovalCallback?: (address: string, currency: string, amount: BigNumber) => void,
    beforeWaitCallback?: (address: string, currency: string, amount: BigNumber) => void
): Promise<{ tx: ContractTransaction|undefined, receipt: ContractReceipt|undefined, exists: Boolean }> {
    const dipAddress = process.env.NEXT_PUBLIC_DIP_ADDRESS!;
    console.log(`creating treasury approval for ${amount} on token ${dipAddress}`);
    const dip = getErc20Token(dipAddress, signer);
    const symbol = await dip.symbol();
    if (beforeApprovalCallback !== undefined) {
        beforeApprovalCallback(recipient, symbol, amount);
    }
    try {
        const allowanceExists = await dip.allowance(await signer.getAddress(), recipient);
        if (allowanceExists.gte(amount)) {
            return { exists: true, tx: undefined, receipt: undefined };
        }
        
        const tx = await dip.approve(recipient, amount, { gasLimit: 200000 });
        console.log("tx done", tx)
        if (beforeWaitCallback !== undefined) {
            beforeWaitCallback(recipient, symbol, amount); 
        }
        const receipt = await tx.wait();
        console.log("wait done", receipt, tx);

        // now check if allowance is set and large enough
        const allowanceAfterApproval = await dip.allowance(await signer.getAddress(), recipient);
        if (allowanceAfterApproval.lt(amount)) {
            throw new ApprovalFailedError("ERROR:STT-001:ALLOWANCE_TOO_SMALL", `user created allowance too small: ${formatUnits(allowanceAfterApproval, 18)}`);
        }

        return { tx, receipt, exists: false };
    } catch (e) {
        console.log("caught error during approval: ", e);
        // @ts-ignore e.code
        throw new ApprovalFailedError(e.code, e);
    }
}

/**
 * Checks weather the given address pair has the expected allowance.
 */
export async function hasAllowance(sourceAddress: string, targetAddress: string, amount: BigNumber, tokenAddress: string, signer: Signer): Promise<Boolean> {
    const token = getErc20Token(tokenAddress, signer);
    const allowance = await token.allowance(sourceAddress, targetAddress);
    return allowance.gte(amount);
}
