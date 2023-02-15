import { BigNumber, ContractReceipt, ContractTransaction, Signer } from "ethers";
import { ERC20, ERC20__factory } from "../contracts/depeg-contracts";
import { ApprovalFailedError } from "../utils/error";

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
): Promise<[ContractTransaction, ContractReceipt]> {
    const dipAddress = process.env.NEXT_PUBLIC_DIP_ADDRESS!;
    console.log(`creating treasury approval for ${amount} on token ${dipAddress}`);
    const dip = getErc20Token(dipAddress, signer);
    const symbol = await dip.symbol();
    if (beforeApprovalCallback !== undefined) {
        beforeApprovalCallback(recipient, symbol, amount);
    }
    try {
        const tx = await dip.approve(recipient, amount, { gasLimit: 200000 });
        console.log("tx done", tx)
        if (beforeWaitCallback !== undefined) {
            beforeWaitCallback(recipient, symbol, amount); 
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
