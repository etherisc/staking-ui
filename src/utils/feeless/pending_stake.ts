import { Schema, Repository } from "redis-om";
import { redisClient } from "../redis";

export interface PendingStake {
    owner: string;
    targetNftId: string;
    dipAmount: string;
    signatureId: string;
    signature: string;
    transactionHash: string;
    timestamp: Date;
}

export const PENDING_STAKE_SCHEMA = new Schema('PendingStake', {
    owner: { type: 'string', sortable: true },
    targetNftId: { type: 'string', sortable: true  },
    dipAmount: { type: 'string', sortable: true  },
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
