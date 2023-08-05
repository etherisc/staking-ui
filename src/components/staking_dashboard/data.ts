import { BigNumber, Signer } from "ethers";
import { IChainRegistry__factory, IStaking__factory } from "../../contracts/registry-contracts";
import { store } from "../../redux/store";
import { addStakeData, finishLoading, setNumber, startLoading } from "../../redux/slices/dashboard";
import { StakeData } from "../../backend/stake_data";

const OBJECT_STAKE = 10


export async function fetchStakeInfo(signer: Signer) {
    store.dispatch(startLoading());
    const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "";
    const staking = IStaking__factory.connect(stakingContractAddress, signer);
    const registryContract = IChainRegistry__factory.connect(await staking.getRegistry(), signer);
    
    const chainId = await signer.getChainId();
    const chainIdB32 = await registryContract.toChain(chainId);
    console.log("chainId", chainId, chainIdB32);

    const numStakes = await registryContract.objects(chainIdB32, OBJECT_STAKE);
    console.log("numStakes", numStakes);
    store.dispatch(setNumber(numStakes.toNumber()));

    const bundles: Map<number, any> = new Map<number, any>();
    const promises = [];

    for (let idx = 0; idx < numStakes.toNumber(); idx++) {
        promises.push(fetchStakeInfoForIndex(idx, bundles, registryContract, staking, chainIdB32));
    }

    await Promise.all(promises);

    store.dispatch(finishLoading());
}

async function fetchStakeInfoForIndex(idx: number, bundles: Map<number, any>, registryContract: any, staking: any, chainIdB32: string) {
    const stakeId = await registryContract.getNftId(chainIdB32, OBJECT_STAKE, idx);
    const infoRaw = await staking.getInfo(stakeId);
    const rewardsIncrement = await staking.calculateRewardsIncrement(infoRaw);

    const bundle_nft = infoRaw.target;
    let bundleId, displayName, expiryAt;

    if (bundle_nft.toNumber() in bundles) {
        bundleId = bundles.get(bundle_nft.toNumber())?.bundleId;
        displayName = bundles.get(bundle_nft.toNumber())?.displayName;
        expiryAt = bundles.get(bundle_nft.toNumber())?.expiryAt;
    } else {
        const bundleInfo = await registryContract.decodeBundleData(bundle_nft);
        bundleId = bundleInfo.bundleId;
        displayName = bundleInfo.displayName;
        expiryAt = bundleInfo.expiryAt;
        bundles.set(bundle_nft.toNumber(), bundleInfo);
    }

    const stakeData = {
        id: infoRaw.id.toString(),
        target: infoRaw.target.toString(),
        stakeBalance: infoRaw.stakeBalance.toString(),
        rewardBalance: infoRaw.rewardBalance.toString(),
        createdAt: infoRaw.createdAt,
        updatedAt: infoRaw.updatedAt,
        version: infoRaw.version,
        rewardTotalNow: infoRaw.rewardBalance.add(rewardsIncrement).toString(),
        bundleId: bundleId.toString(),
        bundleName: displayName,
        bundleExpiryAt: expiryAt.toString(),
        stakeOwner: await registryContract.ownerOf(stakeId),
        stakingStarted: infoRaw.createdAt,
        unstakingAfter: expiryAt.toString(),
    } as StakeData;
    store.dispatch(addStakeData(stakeData));
}
