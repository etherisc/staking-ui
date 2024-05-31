import { LinearProgress, List, ListItem, ListItemText } from "@mui/material";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo, BundleState } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { updateStakeUsage } from "../../redux/slices/stakes";
import { formatDateUtc } from "../../utils/date";
import { formatAmount } from "../../utils/format";

interface BundleStakesMobileProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    /**
     * Build the actions to be displayed for each bundle.
     */
    buildActions?: (bundle: BundleInfo) => JSX.Element;
}

export default function BundleStakesMobile(props: BundleStakesMobileProps) {
    const { t } = useTranslation(['common']);
    
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();

    // retrieve the stake usage data for each bundle (when the props define that stake usage should be displayed)
    useEffect(() => {
        async function updateStakeUsageData() {
            if (props.bundles.length == 0) {
                return;
            }

            for (const bundle of props.bundles) {
                if (bundle.chainId !== await props.stakingApi.getChainId()) {
                    continue;
                }
                if (bundle.stakeUsage !== undefined) {
                    continue;
                }
                const stakeUsage = await props.stakingApi.getStakeUsage(bundle);
                dispatch(updateStakeUsage({ bundleId: bundle.bundleId, usage: stakeUsage.usage, lockedCapital: stakeUsage.lockedCapital.toString()}));
            }
        }
        updateStakeUsageData();
    }, [props.bundles, props.stakingApi, dispatch]);

    function renderListItemTitle(bundle: BundleInfo) {
        // const lifetime = dayjs.unix(bundle.expiryAt).add(parseInt(bundle.lifetime), 'seconds').unix();
        let expiration = <></>;
        if (bundle.expiryAt < dayjs().unix() && (bundle.state === BundleState.ACTIVE || bundle.state === BundleState.LOCKED)) {
            expiration = <>Expired on {formatDateUtc(bundle.expiryAt)}</>;
        } else if (bundle.state === BundleState.ACTIVE || bundle.state === BundleState.LOCKED) {
            expiration = <>{t('table.header.expiryAt')}: {formatDateUtc(bundle.expiryAt)}</>;
        } 

        const myStakedAmount = formatAmount(BigNumber.from(bundle.myStakedAmount), currency, currencyDecimals);
        const totalAmount = formatAmount(
            BigNumber.from(bundle.stakedAmount), 
            currency, 
            currencyDecimals);
        let actions = <></>;
        if (props.buildActions) {
            actions = props.buildActions(bundle);
        }

        return (
            <>
                {bundle.bundleId} | {bundle.instanceName} | <b>{bundle.bundleName}</b>
                <br/> 
                {t('table.header.myStakedAmount')}: {myStakedAmount } | Total: {totalAmount} 
                <br/>
                {expiration}
                <br/>
                {actions}
            </>
        );
    }

    const loadingBar = props.isBundlesLoading ? <LinearProgress /> : null;

    return (
        <>
            {loadingBar}

            <List>
                {props.bundles.map((bundle: BundleInfo) => (
                    <ListItem key={bundle.id}>
                        <ListItemText primary={renderListItemTitle(bundle)} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

