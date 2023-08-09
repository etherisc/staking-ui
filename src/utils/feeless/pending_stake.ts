import { Schema, Repository } from "redis-om";
import { redisClient } from "../redis";

export interface PendingStake {
    // TODO: add other fields
    // policyHolder: string;
    // protectedWallet: string;
    // protectedBalance: string;
    // duration: number;
    // bundleId: number;
    signatureId: string;
    signature: string;
    transactionHash: string;
    timestamp: Date;
}

export const PENDING_STAKE_SCHEMA = new Schema('PendingStake', {
    // TODO: add other fields
    // policyHolder: { type: 'string', sortable: true },
    // protectedWallet: { type: 'string', sortable: true  },
    // protectedBalance: { type: 'string', sortable: true  },
    // duration: { type: 'number' },
    // bundleId: { type: 'number' },
    signatureId: { type: 'string', sortable: true },
    signature: { type: 'string' },
    transactionHash: { type: 'string', sortable: true },
    timestamp: { type: 'date', sortable: true },
}, {
    dataStructure: 'HASH'
});

export async function getPendingStakeRepository(): Promise<Repository> {
    const repository = new Repository(PENDING_STAKE_SCHEMA, redisClient);
    await repository.createIndex();
    return repository;
}
