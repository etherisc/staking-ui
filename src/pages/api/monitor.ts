// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { ethers, logger, Signer } from 'ethers';
import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IChainRegistry__factory, IERC20__factory, IStaking__factory } from '../../contracts/registry-contracts';
import { getBackendVoidSigner } from '../../utils/chain';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    logger.debug("/api/balance_monitor request received");

    const signer = await getBackendVoidSigner();
    const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "";
    const staking = IStaking__factory.connect(stakingContractAddress, signer);
    
    const rewardReserves = await staking.rewardReserves();
    
    const rewardReservesAlertBalanceStr = process.env.NEXT_PUBLIC_REWARD_RESERVES_ALERT_BALANCE || "100000";
    const rewardReservesAlertBalance = parseEther(rewardReservesAlertBalanceStr);
    const isRewardReservesBelowThreshold = rewardReserves.lt(rewardReservesAlertBalance);
    
    const stakingWallet = await staking.getStakingWallet();
    const dipAddress = process.env.NEXT_PUBLIC_DIP_ADDRESS || "";
    const dip = IERC20__factory.connect(dipAddress, signer);
    const stakingAllowance = await dip.allowance(stakingWallet, stakingContractAddress);

    const stakingAllowanceAlertBalanceStr = process.env.NEXT_PUBLIC_STAKING_ALLOWANCE_ALERT_BALANCE || "100000";
    const stakingAllowanceAlertBalance = parseEther(stakingAllowanceAlertBalanceStr);
    const isStakingAllowanceBelowThreshold = stakingAllowance.lt(stakingAllowanceAlertBalance);

    const status = isRewardReservesBelowThreshold || isStakingAllowanceBelowThreshold ? 500 : 200;

    const data = {
        'rewardReserves': formatEther(rewardReserves),
        'rewardReservesThreshold': formatEther(rewardReservesAlertBalance),
        'rewardReservesBelowThreshold': isRewardReservesBelowThreshold,
        'stakingAllowance': formatEther(stakingAllowance),
        'stakingAllowanceThreshold': formatEther(stakingAllowanceAlertBalance),
        'stakingAllowanceBelowThreshold': isStakingAllowanceBelowThreshold,
    };

    res.status(status).json(data);
}
