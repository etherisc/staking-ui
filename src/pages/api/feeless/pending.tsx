import { logger } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { getPendingRestakeRepository } from "../../../utils/feeless/pending_restake";
import { getPendingStakeRepository } from "../../../utils/feeless/pending_stake";

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
        res.status(200).send({
            pendingRestake: false,
            pendingStake: false,
        });
    } else if (req.method === 'GET') {
        await handleGet(req, res);
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const address = req.query.address as string;

    if (!address) {
        res.status(400).send([]);
        return;
    }

    logger.info(address);

    const pendingRestakeRepo = await getPendingRestakeRepository();
    const pendingRestakesCount = await pendingRestakeRepo.search().where("owner").equals(address).count();
    logger.info("pendingRestakesCount", pendingRestakesCount);

    const pendingStakeRepo = await getPendingStakeRepository();
    const pendingStakeCount = await pendingStakeRepo.search().where("owner").equals(address).count();
    logger.info("pendingStakeCount", pendingStakeCount);

    res.status(200).json({
        pendingRestake: pendingRestakesCount > 0,
        pendingStake: pendingStakeCount > 0
    });
}

