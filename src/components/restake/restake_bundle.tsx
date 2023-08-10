import { Grid } from "@mui/material";
import { BigNumber } from "ethers";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleDetails from "../show_bundle/bundle_details";
import RestakeBundleForm from "./restake_bundle_form";

interface RestakeBundleProps {
    stakingApi: StakingApi;
    currentBundle: BundleInfo;
    restakeBundle: BundleInfo;
    formDisabled: boolean;
    restake: (stakeNftId: BigNumber, newBundleNftId: BigNumber) => void;
}

export default function RestakeBundle(props: RestakeBundleProps) {
    return (<>
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
                <BundleDetails bundle={props.restakeBundle}  currency={props.stakingApi.currency()} decimals={props.stakingApi.currencyDecimals()} />
            </Grid>
            <Grid item xs={12} md={6}>
                <RestakeBundleForm stakingApi={props.stakingApi} bundle={props.currentBundle} restakeBundle={props.restakeBundle} restake={props.restake} formDisabled={props.formDisabled} />
            </Grid>
        </Grid>
    </>);
}