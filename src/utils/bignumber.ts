import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function formatEthersNumber(num: BigNumber, decimals: number): string {
    const t = ethers.utils.formatEther(num);
    return (+t).toFixed(decimals);
}

export function bigNumberComparator(v1: BigNumber, v2: BigNumber): number {
    if (v1.gt(v2)) {
        return 1;
    }

    if (v1.lt(v2)) {
        return -1;
    }

    return 0;
}

export function bigNumberToAmountStringWithDecimals(amount: BigNumber, decimals: number): string {
    return parseFloat(formatEther(amount)).toFixed(decimals);
}

