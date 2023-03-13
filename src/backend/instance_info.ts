import { BigNumber } from "ethers";

export interface InstanceInfo {
    instanceId: string;
    displayName: string;
    chainId: number;
    registry: string;
    nftId: BigNumber;
}