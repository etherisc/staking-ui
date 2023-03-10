import { Grid } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { BundleInfo } from "../../backend/bundle_info";
import { bundleSelected } from "../../redux/slices/staking";
import { formatCurrency } from "../../utils/numbers";
import Address from "../address";
import Timestamp from "../timestamp";

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

    return (<>
        <Grid container spacing={1} data-testid="bundle-details">
            <NameValue name={t('instance_id')} value={<Address address={instanceId} iconColor="secondary.main" />}/>
            <NameValue name={t('instance_name')} value={<>{instanceName}</>}/>
            <NameValue name={t('bundle_id')} value={<>{id}</>}/>
            <NameValue name={t('bundle_name')} value={<>{name}</>}/>
            <NameValue name={t('bundle_state')} value={<>{t('bundle_state_' + state, { ns: 'common'})}</>}/>
            <NameValue name={t('staked_amount')} value={<>{symbol} {formatCurrency(stakedAmount, decimals)}</>}/>
            <NameValue name={t('unclaimed_reward')} value={<>{symbol} {formatCurrency(unclaimedReward, decimals)}</>}/>
            <NameValue name={t('my_staked_amount')} value={<>{symbol} {formatCurrency(myStakedAmount, decimals)}</>}/>
            <NameValue name={t('locked_amount')} value={<>{symbol} {formatCurrency(lockedAmount, decimals)}</>}/>
            <NameValue name={t('supported_capital')} value={<>{supportingToken} {formatCurrency(supportedCapital, supportingTokenDecimals)}</>}/>
            <NameValue name={t('my_supported_capital')} value={<>{supportingToken} {formatCurrency(mySupportedCapital, supportingTokenDecimals)}</>}/>
            <NameValue name={t('active_until')} value={<Timestamp at={expiryAt}/>}/>
        </Grid>
    </>);
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


