import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { FormNumber } from "./types";

export const DISPLAY_PRECISION = parseInt(process.env.NEXT_PUBLIC_DEPECT_TOKEN_DISPLAY_PRECISION || '2');
export const USD1_DECIMALS = parseInt(process.env.NEXT_PUBLIC_DEPEG_USD1_DECIMALS || '6');
export const USD2_DECIMALS = parseInt(process.env.NEXT_PUBLIC_DEPEG_USD1_DECIMALS || '6');

export function formatCurrency(value: FormNumber, decimals: number, displayPrecision?: number): string {
    if (value === undefined) {
        return "";
    }
    if (value instanceof BigNumber) {
        const ethers = formatUnits(value, decimals);
        // console.log("ethers", ethers);
        const ethersNum = parseFloat(ethers);
        return formatLocale(ethersNum, displayPrecision);
    }
    return formatLocale(value / Math.pow(10, decimals), displayPrecision);
}

function formatLocale(number: number, displayPrecision?: number): string {
    return number.toLocaleString("en", { useGrouping: true, 
        minimumFractionDigits: displayPrecision || DISPLAY_PRECISION,
        maximumFractionDigits: displayPrecision || DISPLAY_PRECISION });
}

export function toHexString(valStr: string): string {
    return '0x' + parseInt(valStr).toString(16);
}

export function toHex(number: number): string {
    return '0x' + number.toString(16);
}