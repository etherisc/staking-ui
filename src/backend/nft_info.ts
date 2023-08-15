export interface NftInfo {
    nftId: string;
    stakedAmount: string;
    targetNftId: string;
    type: NftType;
    unstakingAvailable: boolean;
}

export enum NftType {
    OBJECT_TYPE_UNDEFINED,
    OBJECT_TYPE_PROTOCOL,
    OBJECT_TYPE_CHAIN,
    OBJECT_TYPE_REGISTRY,
    OBJECT_TYPE_TOKEN,
    OBJECT_TYPE_STAKE,
    OBJECT_TYPE_INSTANCE,
    OBJECT_TYPE_PRODUCT,
    OBJECT_TYPE_ORACLE,
    OBJECT_TYPE_RISKPOOL,
    OBJECT_TYPE_POLICY,
    OBJECT_TYPE_BUNDLE,
}
