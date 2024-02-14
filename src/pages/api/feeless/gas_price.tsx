import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { formatUnits } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

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
    } else {
        const provider = new StaticJsonRpcProvider(process.env.BACKEND_CHAIN_RPC_URL);
        res.status(200).send({ "gasPrice": formatUnits((await provider.getFeeData()).gasPrice!, 'gwei') });
    }
}