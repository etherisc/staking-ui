import { LinearProgress, useTheme } from "@mui/material";
import { DataGrid, GridColDef, gridNumberComparator, GridRenderCellParams, GridSortCellParams, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { updateStakeUsage } from "../../redux/slices/stakes";
import { formatCurrency } from "../../utils/numbers";
import WithTooltip from "../with_tooltip";
import Address from "../address";
import { StakeUsage } from "../../utils/types";
import { formatAmount } from "../../utils/format";
import StakeUsageIndicator from "./stake_usage_indicator";
import { bigNumberComparator } from "../../utils/bignumber";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    disableSelection?: boolean;
    showStakeUsage?: boolean;
    /**
     * Build the actions to be displayed for each bundle.
     */
    buildActions?: (bundle: BundleInfo) => JSX.Element;
}

export default function BundleStakes(props: BundleStakesProps) {
    const { t } = useTranslation(['common']);

    const [ pageSize, setPageSize ] = useState(5);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();

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

    const columns: Array<GridColDef> = [
        { 
            field: 'instanceId', headerName: t('table.header.instanceId'), flex: 0.6, 
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.instanceId, params.row.instanceName ],
            renderCell: (params: GridRenderCellParams<[string, string]>) => {
                if (params.value![1] !== undefined && params.value![1] !== null && params.value![1] !== '') {
                    return (<>
                        <Address address={params.value![1]} iconColor="palette.secondary.main" />
                    </>);
                }
                return (<>
                    <Address address={params.value![0]} iconColor="secondary.main" />
                </>);
            },
            sortComparator: (v1: [string, string], v2: [string, string]) => v1[0].localeCompare(v2[0]),
        },
        { 
            field: 'bundleId', headerName: t('table.header.bundleId'), flex: 0.5,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.bundleId, params.row.bundleName ],
            renderCell: (params: GridRenderCellParams<[number, string]>) => {
                if (params.value![1] === undefined || params.value![1] === null || params.value![1] === '') {
                    return (<>{params.value![0]}</>);
                }
                return (<>
                    <WithTooltip tooltipText={t('bundle_id_num', { id: params.value![0]})}>
                        {params.value![1]}
                    </WithTooltip>
                </>);
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
            field: 'myStakedAmount', headerName: t('table.header.myStakedAmount'), flex: 0.7,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ BigNumber.from(params.row.myStakedAmount), BigNumber.from(params.row.stakedAmount) ],
            renderCell: (params: GridRenderCellParams<[BigNumber, BigNumber]>) => (<>
                    <WithTooltip tooltipText={`${t('staked_amount_total')} ${formatAmount(params.value![1], currency, currencyDecimals)}`}>
                        {formatAmount(params.value![0], currency, currencyDecimals)}
                    </WithTooltip>
                </>),
            sortComparator: (v1: [BigNumber], v2: [BigNumber]) => bigNumberComparator(v1[0], v2[0])
        },
        { 
            field: 'supportingAmount', headerName: t('table.header.myAllSupportingAmount'), flex: 1,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                [ BigNumber.from(params.row.mySupportingAmount), BigNumber.from(params.row.supportingAmount), params.row.supportingToken, params.row.supportingTokenDecimals ],
            valueFormatter: (params: GridValueFormatterParams<[BigNumber, BigNumber, string, number]>) => {
                return formatAmountMineTotal(params.value[0], params.value[1], params.value[2], params.value[3]);
            },
            sortComparator: (v1: [BigNumber], v2: [BigNumber]) => bigNumberComparator(v1[0], v2[0])
        },
        { 
            field: 'state', headerName: t('table.header.state'), flex: 0.35,
            valueFormatter: (params: GridValueFormatterParams<string>) => t(`bundle_state_${params.value}`, { ns: 'common'})
        },
    ];

    if (props.showStakeUsage !== undefined && props.showStakeUsage) {
        columns.push({ 
            field: 'stakeUsage', 
            headerName: t('table.header.stake_usage'), 
            flex: 0.3,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                [ params.row.stakeUsage, params.row.supportingAmount, params.row.lockedAmount, params.row.supportingToken, params.row.supportingTokenDecimals, params.row ],
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

    if (props.buildActions !== undefined) {
        columns.push({ 
            field: 'actions', 
            headerName: t('table.header.actions'), 
            flex: 0.5,
            sortable: false,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                params.row,
            renderCell: (params: GridRenderCellParams<BundleInfo>) => {
                return props.buildActions!(params.value!);
            }
        });
    }

    const loadingBar = props.isBundlesLoading ? <LinearProgress /> : null;

    return (
        <>
            {loadingBar}

            <DataGrid 
                autoHeight
                rows={props.bundles} 
                columns={columns} 
                getRowId={(row) => row.id}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'coverageUntil', sort: 'asc' }],
                    },
                }}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                disableSelectionOnClick={true}
                disableColumnMenu={true}
                />
        </>
    );
}

