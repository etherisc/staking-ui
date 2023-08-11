import { NextApiRequest, NextApiResponse } from "next";
import { getPendingRestakeRepository } from "../../../utils/feeless/pending_restake";
import { redisClient } from "../../../utils/redis";

export const STREAM_KEY = process.env.REDIS_QUEUE_STREAM_KEY ?? "feeless:signatures";

/**
 * GET request will return all pending application transactions. 
 * POST request will add a new application to the queue.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (process.env.NEXT_PUBLIC_FEATURE_GASLESS_TRANSACTION !== 'true') {
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
    await repo.save({
        owner: owner,
        stakeNftId: stakeNftId,
        targetNftId: targetNftId,
        signatureId: signatureId,
        signature: signature,
        transactionHash: null,
        timestamp: new Date(),
    });
    console.log("created pending restake", signatureId);

    // push message to stream (queue)
    const redisId = await redisClient.xAdd(STREAM_KEY, "*", 
    { 
        "signatureId": signatureId,
        "type": "restake",
    });
    console.log("added signatureId of restake to queue", redisId, signatureId);
    
    res.status(200).send(redisId);
}
