import { LinearProgress, useTheme } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
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
    const theme = useTheme();

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

    function rowSelected(selectionModel: GridSelectionModel, details: GridCallbackDetails) {
        const bi = props.bundles.find((bundle) => bundle.id === selectionModel[0]);
        if (bi === undefined) {
            console.log(`Bundle with id ${selectionModel[0]} not found`);
            return;
        }
        console.log(bi);
        if (props.onBundleSelected !== undefined) {
            props.onBundleSelected(bi);
        }
    }

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
            }
        },
        { 
            field: 'bundleId', headerName: t('table.header.bundleId'), flex: 0.5,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.bundleId, params.row.bundleName ],
            renderCell: (params: GridRenderCellParams<[string, string]>) => {
                if (params.value![1] === undefined || params.value![1] === null || params.value![1] === '') {
                    return (<>{params.value![0]}</>);
                }
                return (<>
                    <WithTooltip tooltipText={t('bundle_id_num', { id: params.value![0]})}>
                        {params.value![1]}
                    </WithTooltip>
                </>);
            }
        },
        { 
            field: 'myStakedAmount', headerName: t('table.header.myStakedAmount'), flex: 0.7,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.myStakedAmount, params.row.stakedAmount ],
            renderCell: (params: GridRenderCellParams<[string, string]>) => (<>
                    <WithTooltip tooltipText={`${t('staked_amount_total')} ${formatAmount(BigNumber.from(params.value![1]), currency, currencyDecimals)}`}>
                        {formatAmount(BigNumber.from(params.value![0]), currency, currencyDecimals)}
                    </WithTooltip>
                </>)
        },
        { 
            field: 'supportingAmount', headerName: t('table.header.myAllSupportingAmount'), flex: 1,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                [ params.row.mySupportingAmount, params.row.supportingAmount, params.row.supportingToken, params.row.supportingTokenDecimals ],
            valueFormatter: (params: GridValueFormatterParams<[string, string, string, number]>) => {
                // console.log("supportingAmount valueFormatter", params.value[0], ",", params.value[1], params.value[2], params.value[3]);
                return formatAmountMineTotal(BigNumber.from(params.value[0]), BigNumber.from(params.value[1]), params.value[2], params.value[3]);
            }
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
            }
        });
    }

    if (props.buildActions !== undefined) {
        columns.push({ 
            field: 'actions', 
            headerName: t('table.header.actions'), 
            flex: 0.5,
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
                onSelectionModelChange={rowSelected}
                disableSelectionOnClick={props.disableSelection ?? false}
                disableColumnMenu={true}
                />
        </>
    );
}

