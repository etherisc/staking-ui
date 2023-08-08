import { Grid } from "@mui/material";
import { BigNumber } from "ethers";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleDetails from "../show_bundle/bundle_details";
import StakeBundleForm from "./stake_bundle_form";

interface StakeBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
    formDisabled: boolean;
    stake: (amount: BigNumber, bundle: BundleInfo, gasless: boolean) => void;
}

export default function StakeBundle(props: StakeBundleProps) {
    return (<>
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
                <BundleDetails bundle={props.bundle}  currency={props.stakingApi.currency()} decimals={props.stakingApi.currencyDecimals()} />
            </Grid>
            <Grid item xs={12} md={6}>
                <StakeBundleForm stakingApi={props.stakingApi} bundle={props.bundle} stake={props.stake} formDisabled={props.formDisabled} />
            </Grid>
        </Grid>
    </>);
}