import { BigNumber } from "ethers";
import { formatCurrency } from "./numbers";

export function formatInstanceId(instanceId: string) {
    return instanceId.substring(0, 6) + "…" + instanceId.substring(instanceId.length - 4);
}

export function formatAmount(amount: BigNumber, tokenSymbol: string, tokenDecimals: number): string {
    return `${tokenSymbol} ${formatCurrency(amount, tokenDecimals)}`;
}
