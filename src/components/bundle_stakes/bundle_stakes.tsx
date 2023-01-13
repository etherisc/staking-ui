import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, LinearProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { updateStakeUsage } from "../../redux/slices/stakes";
import { bundleSelected } from "../../redux/slices/staking";
import { formatCurrency } from "../../utils/numbers";
import WithTooltip from "../with_tooltip";
import { grey } from "@mui/material/colors";
import Address from "../address";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    disableSelection?: boolean;
    showActions?: boolean;
    showStakeUsage?: boolean;
}

export default function BundleStakes(props: BundleStakesProps) {
    const { t } = useTranslation(['common']);

    const [ pageSize, setPageSize ] = useState(5);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();
    const router = useRouter();
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
                dispatch(updateStakeUsage({ bundleId: bundle.bundleId, stakeUsage}));
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

    function formatAmount(amount: BigNumber, tokenSymbol: string, tokenDecimals: number): string {
        return `${tokenSymbol} ${formatCurrency(amount, tokenDecimals)}`;
    }

    function stakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/?noreset=true", undefined, { shallow: true });
    }

    function unstakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/unstake?noreset=true", undefined, { shallow: true });
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
            renderCell: (params: GridRenderCellParams<number>) => {
                if (params.value === undefined || params.value < 0) {
                    return (<FontAwesomeIcon icon={faCircle} className="fa" style={{ color: grey[500] }} />);
                } if (params.value === undefined || params.value >= 1) {
                    return (<FontAwesomeIcon icon={faCircle} className="fa" style={{ color: theme.palette.error.light }} />);
                } if (params.value === undefined || params.value >= 0.9) {
                    return (<FontAwesomeIcon icon={faCircle} className="fa" style={{ color: theme.palette.warning.light }} />);
                } else {
                    return (<FontAwesomeIcon icon={faCircle} className="fa" style={{ color: theme.palette.success.light }} />);
                }
            }
        });
    }

    if (props.showActions !== undefined && props.showActions) {
        columns.push({ 
            field: 'actions', 
            headerName: t('table.header.actions'), 
            flex: 0.5,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                params.row,
            renderCell: (params: GridRenderCellParams<BundleInfo>) => {
                const stakeAction = params.value!.stakingSupported ? <Button onClick={() => stakeBundle(params.value!)}>{t('action.stake')}</Button> : undefined;
                const unstakeAction = params.value!.unstakingSupported ? <Button onClick={() => unstakeBundle(params.value!)}>{t('action.unstake')}</Button> : undefined;
                return (<>
                    {stakeAction}
                    {unstakeAction}
                </>);
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

