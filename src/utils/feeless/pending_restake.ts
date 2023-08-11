import { Schema, Repository } from "redis-om";
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
    owner: { type: 'string', sortable: true },
    stakeNftId: { type: 'string', sortable: true },
    targetNftId: { type: 'string', sortable: true },
    signatureId: { type: 'string', sortable: true },
    signature: { type: 'string' },
    transactionHash: { type: 'string', sortable: true },
    timestamp: { type: 'date', sortable: true },
}, {
    dataStructure: 'HASH'
});

export async function getPendingRestakeRepository(): Promise<Repository> {
    const repository = new Repository(PENDING_RESTAKE_SCHEMA, redisClient);
    await repository.createIndex();
    return repository;
}
