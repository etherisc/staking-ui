import { useMediaQuery, useTheme } from "@mui/material";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import BundleStakesDesktop from "./bundle_stakes_desktop";
import BundleStakesMobile from "./bundle_stakes_mobile";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    hideShowMyStakes?: boolean;
    showStakeUsage?: boolean;
    /**
     * Build the actions to be displayed for each bundle.
     */
    buildActions?: (bundle: BundleInfo) => JSX.Element;
}

export default function BundleStakes(props: BundleStakesProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (isMobile) {
        return <BundleStakesMobile 
                    stakingApi={props.stakingApi} 
                    bundles={props.bundles} 
                    isBundlesLoading={props.isBundlesLoading}
                    buildActions={props.buildActions}
                    />;
    } else {
        return <BundleStakesDesktop
                    stakingApi={props.stakingApi} 
                    bundles={props.bundles} 
                    isBundlesLoading={props.isBundlesLoading}
                    onBundleSelected={props.onBundleSelected}
                    hideShowMyStakes={props.hideShowMyStakes}
                    showStakeUsage={props.showStakeUsage}
                    buildActions={props.buildActions}
                    />;
    }
}

