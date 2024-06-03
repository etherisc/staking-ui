import { NextApiRequest, NextApiResponse } from "next";
import { OBJECT_TYPE_STAKE } from '../../../backend/staking_contract';
import { IChainRegistry__factory, IERC721Enumerable__factory, IStaking__factory } from '../../../contracts/registry-contracts';
import { getBackendVoidSigner } from '../../../utils/chain';

/**
 * GET request will return true if the given wallet has stakes with a balance > 0
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(404).end();
        return;
    }

    const { accounts } = req.body;

    if (! accounts || !accounts.wallet || typeof accounts.wallet !== "string" || !accounts.wallet.match(/^0x[0-9a-fA-F]{40}$/)) {
        res.status(400).json({ "message": "Unknown wallet" });
        return;
    }

    const wallet = accounts.wallet as string;

    const signer = await getBackendVoidSigner();

    const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "";
    const staking = IStaking__factory.connect(stakingContractAddress, signer);
    
    const registryAddress = await staking.getRegistry();
    const chainRegistry = IChainRegistry__factory.connect(registryAddress, signer);

    const nftAddress = await chainRegistry.getNft();
    const chainNft = IERC721Enumerable__factory.connect(nftAddress, signer);

    const nftBalance = await chainNft.balanceOf(wallet);
    for (let idx = 0; idx < nftBalance.toNumber(); idx++) {
        const nftId = await chainNft.tokenOfOwnerByIndex(wallet, idx);
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

    res.status(400).json({ "message": `No stakes found for ${wallet}`});
}