import { BigNumber } from "ethers";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleDetails from "./bundle_details";
import StakeBundleForm from "./stake_bundle_form";

interface StakeBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    stake: (amount: BigNumber, bundle: BundleInfo) => void;
}

export default function StakeBundle(props: StakeBundleProps) {
    return (<>
        <BundleDetails bundle={props.bundle} />
        <StakeBundleForm stakingApi={props.stakingApi} bundle={props.bundle} stake={props.stake} />
    </>);
}