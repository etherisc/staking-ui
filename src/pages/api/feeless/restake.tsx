import { NextApiRequest, NextApiResponse } from "next";
import { getPendingRestakeRepository } from "../../../utils/feeless/pending_restake";
import { redisClient } from "../../../utils/redis";
import { EntityId } from "redis-om";

export const STREAM_KEY = process.env.REDIS_QUEUE_STREAM_KEY ?? "feeless:signatures";

/**
 * GET request will return all pending application transactions. 
 * POST request will add a new application to the queue.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION !== 'true' || process.env.NEXT_PUBLIC_FEATURE_RESTAKING !== 'true') {
        res.status(404).send('Unsupported feature');
    } else if (req.method === 'POST') {
        await handlePost(req, res);
    } else {
        res.status(405).send('Only POST requests allowed');
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    console.log("POST request to /api/restake");
    const bodyData = req.body;

    const owner = bodyData.owner as string;
    const stakeNftId = bodyData.stakeNftId as string;
    const targetNftId = bodyData.targetNftId as string;
    const signatureId = bodyData.signatureId as string;
    const signature = bodyData.signature as string;

    if (! owner || !stakeNftId || !targetNftId || !signatureId || !signature) {
        res.status(400).send("Missing required fields");
        return;
    }

    // store pending application in redis
    const repo = await getPendingRestakeRepository();
    const savedRestake = await repo.save({
        owner: owner,
        stakeNftId: stakeNftId,
        targetNftId: targetNftId,
        signatureId: signatureId,
        signature: signature,
        transactionHash: null,
        timestamp: new Date(),
    });
    const entityId = savedRestake[EntityId];
    if (! entityId) {
        res.status(500).send("Failed to save pending restake");
        return;
    }
    console.log("created pending restake", signatureId, entityId);

    // push message to stream (queue)
    const redisId = await redisClient.xAdd(STREAM_KEY, "*", 
    { 
        "entityId": entityId,
        "type": "restake",
    });
    console.log("added restake to queue", redisId, entityId, signatureId);
    
    res.status(200).send(redisId);
}
