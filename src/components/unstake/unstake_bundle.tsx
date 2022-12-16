import { BigNumber } from "ethers";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleDetails from "../stake/bundle_details";
import StakeBundleForm from "./unstake_bundle_form";

interface UnstakeBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    unstake: (amount: BigNumber, max:boolean, bundle: BundleInfo) => void;
}

export default function UnstakeBundle(props: UnstakeBundleProps) {
    return (<>
        <BundleDetails bundle={props.bundle} />
        <StakeBundleForm stakingApi={props.stakingApi} bundle={props.bundle} unstake={props.unstake} />
    </>);
}