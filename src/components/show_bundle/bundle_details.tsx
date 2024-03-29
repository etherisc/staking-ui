import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { BundleInfo, BundleState } from "../../backend/bundle_info";
import { formatCurrency } from "../../utils/numbers";
import Address from "../address";
import Timestamp from "../timestamp";
import WithTooltip from "../with_tooltip";
import dayjs from "dayjs";

interface BundleDetailsProps {
    bundle: BundleInfo;
    currency: string;
    decimals: number;
}

export default function BundleDetails(props: BundleDetailsProps) {
    const { t } = useTranslation('common');

    const symbol = props.currency;
    const decimals = props.decimals;
    const id = props.bundle.bundleId;
    const nftId = props.bundle.nftId;
    const name = props.bundle.bundleName;
    const state = props.bundle.state;
    const instanceId = props.bundle.instanceId;
    const instanceName = props.bundle.instanceName;
    const stakedAmount = BigNumber.from(props.bundle.stakedAmount);
    const myStakedAmount = BigNumber.from(props.bundle.myStakedAmount);
    const unclaimedReward = BigNumber.from(props.bundle.unclaimedReward);
    const lockedAmount = BigNumber.from(props.bundle.lockedAmount || 0);
    const supportingToken = props.bundle.supportingToken;
    const supportingTokenDecimals = props.bundle.supportingTokenDecimals;
    const supportedCapital = BigNumber.from(props.bundle.supportingAmount);
    const mySupportedCapital = BigNumber.from(props.bundle.mySupportingAmount);
    const expiryAt = props.bundle.expiryAt;
    const rewardRate = props.bundle.rewardRate;
    const lockedUntil = props.bundle.lockedUntil > 1 ? <Timestamp at={props.bundle.lockedUntil}/> : <>-</>;

    let unclaimedRewardStr = formatCurrency(unclaimedReward, decimals);
    if (unclaimedReward.gt(0) && unclaimedReward.lt(parseUnits("0.01", decimals))) {
        unclaimedRewardStr = "< 0.01";
    }

    function getBundleState(bundle: BundleInfo) {
        if ((bundle.state === 0 || bundle.state === 1)&& dayjs.unix(bundle.expiryAt).isBefore(dayjs())) {
            return t(`bundle_state_expired`, { ns: 'common'});
        }
        return t('bundle_state_' + state, { ns: 'common'})
    }

    return (
        <Grid container spacing={1} data-testid="bundle-details">
            <NameValue name={t('instance_id')} value={<Address address={instanceId} iconColor="secondary.main" />}/>
            <NameValue name={t('instance_name')} value={<>{instanceName}</>}/>
            <NameValue name={t('bundle_id')} value={<>{id} ({nftId})</>}/>
            <NameValue name={t('bundle_name')} value={<>{name}</>}/>
            <NameValue name={t('bundle_state')} value={<>{getBundleState(props.bundle)}</>}/>
            <NameValue name={t('staked_amount')} value={<>{symbol} {formatCurrency(stakedAmount, decimals)}</>}/>
            <NameValue name={t('unclaimed_reward')} value={<>{symbol} {unclaimedRewardStr}
                <WithTooltip tooltipText={t('unclaimed_reward_tooltip')}><Typography color={grey[500]} component="span"><FontAwesomeIcon icon={faCircleInfo} className="fa" /></Typography></WithTooltip></>}/>
            <NameValue name={t('reward_rate')} value={<>{(rewardRate * 100).toFixed(2)} %</>}/>
            <NameValue name={t('my_staked_amount')} value={<>{symbol} {formatCurrency(myStakedAmount, decimals)}</>}/>
            <NameValue name={t('locked_until')} value={lockedUntil}/>
            <NameValue name={t('locked_amount')} value={<>{supportingToken} {formatCurrency(lockedAmount, supportingTokenDecimals)}</>}/>
            <NameValue name={t('supported_capital')} value={<>{supportingToken} {formatCurrency(supportedCapital, supportingTokenDecimals)}</>}/>
            <NameValue name={t('my_supported_capital')} value={<>{supportingToken} {formatCurrency(mySupportedCapital, supportingTokenDecimals)}</>}/>
            <NameValue name={t('active_until')} value={<Timestamp at={expiryAt}/>}/>
        </Grid>
    );
}

function NameValue(props: { name: string, value: JSX.Element }) {
    const value = (<>{props.value}</>);

    return (<>
        <Grid item xs={5}>
            {props.name}: 
        </Grid>
        <Grid item xs={7}>
            {value}
        </Grid>
    </>);
}


