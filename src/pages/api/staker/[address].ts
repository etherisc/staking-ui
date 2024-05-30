import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { formatUnits } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { IChainRegistry__factory, IERC721Enumerable__factory, IStaking__factory } from '../../../contracts/registry-contracts';
import { getBackendVoidSigner } from '../../../utils/chain';
import { cp } from 'fs';
import { OBJECT_TYPE_STAKE } from '../../../backend/staking_contract';
import { logger } from 'ethers';

/**
 * GET request will return true if the given wallet has stakes with a balance > 0
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // TODO 404 when not GET
    if (req.method !== "GET") {
        res.status(404).end();
        return;
    }

    const { address } = req.query;
    // validate address to be wallet address
    if (typeof address !== "string" || !address.match(/^0x[0-9a-fA-F]{40}$/)) {
        res.status(400).end();
        return;
    }

    const signer = await getBackendVoidSigner();

    const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "";
    const staking = IStaking__factory.connect(stakingContractAddress, signer);
    
    const registryAddress = await staking.getRegistry();
    const chainRegistry = IChainRegistry__factory.connect(registryAddress, signer);

    const nftAddress = await chainRegistry.getNft();
    const chainNft = IERC721Enumerable__factory.connect(nftAddress, signer);

    const nftBalance = await chainNft.balanceOf(address);
    for (let idx = 0; idx < nftBalance.toNumber(); idx++) {
        const nftId = await chainNft.tokenOfOwnerByIndex(address, idx);
        const { objectType } = await chainRegistry.getNftInfo(nftId!);
        if (objectType !== OBJECT_TYPE_STAKE) {
            continue;
        }

        const { stakeBalance } = await staking.getInfo(nftId);
        if (stakeBalance.gt(0)) {
            res.status(200).json({});
            return;
        }
    }

    res.status(404).json({});
}