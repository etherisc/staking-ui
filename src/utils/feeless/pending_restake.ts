import { Repository, Schema } from "redis-om";
import { redisClient } from "../redis";

export interface PendingRestake {
    owner: string;
    stakeNftId: string;
    targetNftId: string;
    signatureId: string;
    signature: string;
    transactionHash: string;
    timestamp: Date;
}

export const PENDING_RESTAKE_SCHEMA = new Schema('PendingRestake', {
    owner: { type: 'string' },
    stakeNftId: { type: 'string' },
    targetNftId: { type: 'string' },
    signatureId: { type: 'string' },
    signature: { type: 'string' },
    transactionHash: { type: 'string' },
    timestamp: { type: 'date' },
}, {
    dataStructure: 'HASH'
});

export async function getPendingRestakeRepository(): Promise<Repository> {
    const repository = new Repository(PENDING_RESTAKE_SCHEMA, redisClient);
    await repository.createIndex();
    return repository;
}
