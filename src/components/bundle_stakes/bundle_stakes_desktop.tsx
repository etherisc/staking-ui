import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, Container, FormControlLabel, LinearProgress, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridSortCellParams, GridToolbarContainer, gridNumberComparator } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { Trans, useTranslation } from "next-i18next";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo, BundleState } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { updateStakeUsage } from "../../redux/slices/stakes";
import { bigNumberComparator } from "../../utils/bignumber";
import { formatAmount } from "../../utils/format";
import { formatCurrency } from "../../utils/numbers";
import { StakeUsage } from "../../utils/types";
import Address from "../address";
import Timestamp from "../timestamp";
import WithTooltip from "../with_tooltip";
import StakeUsageIndicator from "./stake_usage_indicator";
import { RootState } from "../../redux/store";

interface BundleStakesDesktopProps {
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

export default function BundleStakesDesktop(props: BundleStakesDesktopProps) {
    const { t } = useTranslation(['common']);
    const { enqueueSnackbar } = useSnackbar();
    
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);

    const [ showMyStakes, setShowMyStakes ] = useState(false);


    function handleShowMyStakesChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setShowMyStakes(!showMyStakes);
    }

    // retrieve the stake usage data for each bundle (when the props define that stake usage should be displayed)
    useEffect(() => {
        async function updateStakeUsageData() {
            if (!props.showStakeUsage || props.bundles.length == 0) {
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
    }, [props.bundles, props.showStakeUsage, props.stakingApi, dispatch]);

    function formatAmountMineTotal(myValue: BigNumber, totalValue: BigNumber, tokenSymbol: string, tokenDecimals: number): string {
        // console.log('formatAmountMineTotal', myValue, totalValue, tokenSymbol, tokenDecimals);
        return `${tokenSymbol} ${formatCurrency(myValue, tokenDecimals)} / ${tokenSymbol} ${formatCurrency(totalValue, tokenDecimals)}`;    
    }

    function copyToClipboard(value: string) {
        navigator.clipboard.writeText(value);
        enqueueSnackbar(t('action.address_copied'),  { autoHideDuration: 2000, variant: 'info' });
    }

    const columns: Array<GridColDef> = [
        { 
            field: 'instanceId', 
            headerName: t('table.header.instanceId'), 
            flex: 0.55, 
            display: 'flex',
            valueGetter: (_value, row) => [ row.instanceId, row.instanceName ],
            renderCell: (params: GridRenderCellParams<[string, string]>) => {
                if (params.value![1] !== undefined && params.value![1] !== null && params.value![1] !== '') {
                    const tooltip = (<>{params.value![0]} &nbsp;
                        <Typography color="secondary.main" component="span" sx={{ flexShrink: 0}}>
                            <FontAwesomeIcon icon={faCopy} className="fa cursor-pointer" onClick={() => copyToClipboard(params.value![0])} data-testid="copy-button" />
                        </Typography>
                    </>);
                    return (<Box sx={{ overflow: 'hidden' }}>
                        <WithTooltip tooltipText={tooltip} withEllipsis={true}>
                            {params.value![1]}
                        </WithTooltip>
                    </Box>);
                }
                return (<>
                    <Address address={params.value![0]} iconColor="secondary.main" />
                </>);
            },
            sortComparator: (v1: [string, string], v2: [string, string]) => v1[0].localeCompare(v2[0]),
        },
        { 
            field: 'bundleId', 
            headerName: t('table.header.bundleId'), 
            flex: 0.5,
            display: 'flex',
            valueGetter: (_value, row) => [ row.bundleId, row.bundleName ],
            renderCell: (params: GridRenderCellParams<[number, string]>) => {
                if (params.value![1] === undefined || params.value![1] === null || params.value![1] === '') {
                    return (<>{params.value![0]}</>);
                }
                const tooltipText = (<>{t('bundle_id_num', { id: params.value![0]})} | {params.value![1]}</>);
                return (<Box sx={{ overflow: 'hidden' }}>
                    <WithTooltip tooltipText={tooltipText} withEllipsis={true} >
                        {params.value![1]}
                    </WithTooltip>
                </Box>);
            },
            sortComparator: (v1: [number, string], v2: [number, string]) => {
                if (v1[1] !== '' && v2[1] !== '') {
                    return v1[1].localeCompare(v2[1]);
                } else if (v1[1] !== '') {
                    return v1[1].localeCompare(v2[0].toString());
                } else if (v2[1] !== '') {
                    return v1[0].toString().localeCompare(v2[1]);
                } else {
                    return v1[0] - v2[0];
                }
            }
        },
        { 
            field: 'myStakedAmount', headerName: t('table.header.myStakedAmount'), flex: 0.6,
            valueGetter: (_value, row) => [ BigNumber.from(row.myStakedAmount), BigNumber.from(row.stakedAmount) ],
            renderCell: (params: GridRenderCellParams<[BigNumber, BigNumber]>) => (<>
                    <WithTooltip tooltipText={`${t('staked_amount_total')} ${formatAmount(params.value![1], currency, currencyDecimals)}`}>
                        {formatAmount(params.value![0], currency, currencyDecimals)}
                    </WithTooltip>
                </>),
            sortComparator: (v1: [BigNumber], v2: [BigNumber]) => bigNumberComparator(v1[0], v2[0])
        },
        { 
            field: 'supportingAmount', headerName: t('table.header.myAllSupportingAmount'), flex: 1,
            valueGetter: (_value, row) => 
                [ BigNumber.from(row.mySupportingAmount), BigNumber.from(row.supportingAmount), row.supportingToken, row.supportingTokenDecimals ],
            valueFormatter: (value: [BigNumber, BigNumber, string, number]) => {
                return formatAmountMineTotal(value[0], value[1], value[2], value[3]);
            },
            sortComparator: (v1: [BigNumber], v2: [BigNumber]) => bigNumberComparator(v1[0], v2[0])
        },
        { 
            field: 'state', headerName: t('table.header.state'), flex: 0.35,
            valueGetter: (_value, row) => row,
            valueFormatter: (bundle: BundleInfo) => {
                // active and locked bundles with expiration date in the past are considered expired
                if ((bundle.state === 0 || bundle.state === 1)&& dayjs.unix(bundle.expiryAt).isBefore(dayjs())) {
                    return t(`bundle_state_expired`, { ns: 'common'});
                }
                return t(`bundle_state_${bundle.state}`, { ns: 'common'});
            },
            sortComparator: (v1: BundleInfo, v2: BundleInfo) => v1.state - v2.state,
        },
        { 
            field: 'expiryAt', headerName: t('table.header.expiryAt'), flex: 0.7,
            valueGetter: (_value, row) => row,
            renderCell: (params: GridRenderCellParams<BundleInfo>) => {
                if (params.value!.state !== BundleState.ACTIVE && params.value!.state !== BundleState.LOCKED) {
                    return (<></>);
                }
                return (<Timestamp at={params.value!.expiryAt} />);
            },
            sortComparator: (v1: BundleInfo, v2: BundleInfo) => {
                return v2?.expiryAt - v1?.expiryAt;
            }
        },
        { 
            field: 'actions', 
            headerName: t('table.header.actions'), 
            flex: 0.45,
            sortable: false,
            valueGetter: (_value, row) => row,
            renderCell: (params: GridRenderCellParams<BundleInfo>) => {
                if (props.buildActions) {
                    return props.buildActions(params.value!);
                }
                return (<></>);
            }
        }
    ];

    if (props.showStakeUsage !== undefined && props.showStakeUsage) {
        columns.splice(6, 0, { 
            field: 'stakeUsage', 
            headerName: t('table.header.stake_usage'), 
            flex: 0.3,
            valueGetter: (_value, row) => 
                [ row.stakeUsage, row.supportingAmount, row.lockedAmount, row.supportingToken, row.supportingTokenDecimals, row ],
            renderCell: (params: GridRenderCellParams<[StakeUsage, string, string|undefined, string, number]>) => {
                const stakeUsage = params.value![0];
                const supportingAmount = BigNumber.from(params.value![1]);
                const lockedAmount = params.value![2] !== undefined ? BigNumber.from(params.value![2]) : BigNumber.from(0);
                return (<StakeUsageIndicator
                            stakeUsage={stakeUsage}
                            lockedCapital={lockedAmount}
                            supportedCapital={supportingAmount}
                            supportedToken={params.value![3]}
                            supportedTokenDecimals={params.value![4]}
                            />);
            },
            sortComparator: (v1: [StakeUsage], v2: [StakeUsage], p1: GridSortCellParams, p2: GridSortCellParams) => gridNumberComparator(v1[0], v2[0], p1, p2)
        });
    }

    function GridToolbar() {
        return (
            <GridToolbarContainer >
                <Box sx={{ flexGrow: 1 }}>
                    <FormControlLabel 
                        control={
                            <Switch
                                defaultChecked={showMyStakes}
                                value={showMyStakes} 
                                onChange={handleShowMyStakesChanged}
                                sx={{ ml: 1 }}
                                data-testid="show-my-stakes-switch"
                                />} 
                        label={t('action.show_my_staked_bundles')} />
                </Box>
                {/* aligned right beyond here */}
            </GridToolbarContainer>
        );
    }

    function NoRowsOverlay() {
        if (! isConnected) {
            return (<Container maxWidth={false} sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <Alert variant="standard" severity="info">
                    <Trans i18nKey="alert.no_wallet_connected" t={t} />
                </Alert>
            </Container>);
        }
        
        return (<Container maxWidth={false} sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <Trans i18nKey="alert.no_bundles_to_stake" t={t} />
            </Container>);
    }

    const loadingBar = props.isBundlesLoading ? <LinearProgress /> : null;

    return (
        <>
            {loadingBar}

            <DataGrid 
                autoHeight
                rows={props.bundles.filter((bundle) => ! showMyStakes || bundle.myStakedNfsIds.length > 0)} 
                columns={columns} 
                getRowId={(row) => row.id}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'expiryAt', sort: 'asc' }],
                    },
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                sortingOrder={['desc', 'asc']}
                disableRowSelectionOnClick={true}
                disableColumnMenu={true}
                slots={{
                    noRowsOverlay: NoRowsOverlay,
                    toolbar: !props.hideShowMyStakes ? GridToolbar : undefined,
                }}
                />
        </>
    );
}

