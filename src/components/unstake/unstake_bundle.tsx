import { Grid } from "@mui/material";
import { BigNumber } from "ethers";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleDetails from "../show_bundle/bundle_details";
import StakeBundleForm from "./unstake_bundle_form";

interface UnstakeBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    unstake: (amount: BigNumber, nftId: string, max:boolean, bundle: BundleInfo) => void;
}

export default function UnstakeBundle(props: UnstakeBundleProps) {
    return (<>
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
                <BundleDetails bundle={props.bundle} currency={props.stakingApi.currency()} decimals={props.stakingApi.currencyDecimals()} />
            </Grid>
            <Grid item xs={12} md={6}>
                <StakeBundleForm stakingApi={props.stakingApi} bundle={props.bundle} unstake={props.unstake} formDisabled={props.formDisabled} />
            </Grid>
        </Grid>
    </>);
}