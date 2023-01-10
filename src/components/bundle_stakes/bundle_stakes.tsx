import { Button, LinearProgress, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { BundleRowView } from "../../model/bundle_row_view";
import { bundleSelected } from "../../redux/slices/staking";
import { formatInstanceId } from "../../utils/format";
import { formatCurrency } from "../../utils/numbers";
import WithTooltip from "../with_tooltip";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    disableSelection?: boolean;
    showMyAmounts?: boolean;
    showTotalAmounts?: boolean;
    showActions?: boolean;
}

export default function BundleStakes(props: BundleStakesProps) {
    const { t } = useTranslation(['common']);

    const [ pageSize, setPageSize ] = useState(5);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();
    const dispatch = useDispatch();
    const router = useRouter();

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

    let stakedAmountHeader = t('table.header.stakedAmount');
    let supportingAmountHeader = t('table.header.supportingAmount');
    if (props.showMyAmounts !== undefined && props.showMyAmounts && props.showTotalAmounts !== undefined && props.showTotalAmounts) {
        stakedAmountHeader = t('table.header.myAllStakedAmount');
        supportingAmountHeader = t('table.header.myAllSupportingAmount');
    } else if (props.showMyAmounts !== undefined && props.showMyAmounts) {
        stakedAmountHeader = t('table.header.myStakedAmount');
        supportingAmountHeader = t('table.header.mySupportingAmount');
    } 

    function formatAmountMineTotal(myValue: BigNumber, totalValue: BigNumber, tokenSymbol: string, tokenDecimals: number): string {
        // console.log('formatAmountMineTotal', myValue, totalValue, tokenSymbol, tokenDecimals);
        if (props.showMyAmounts !== undefined && props.showMyAmounts && props.showTotalAmounts !== undefined && props.showTotalAmounts) {
            return `${tokenSymbol} ${formatCurrency(myValue, tokenDecimals)} / ${tokenSymbol} ${formatCurrency(totalValue, tokenDecimals)}`;    
        } else if (props.showMyAmounts !== undefined && props.showMyAmounts) {
            return `${tokenSymbol} ${formatCurrency(myValue, tokenDecimals)}`;
        } else {
            return `${tokenSymbol} ${formatCurrency(totalValue, tokenDecimals)}`;
        }
    }

    function stakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/?noreset=true", undefined, { shallow: true });
    }

    function unstakeBundle(bundle: BundleInfo) {
        dispatch(bundleSelected(bundle))
        router.push("/unstake?noreset=true", undefined, { shallow: true });
    }

    // TODO: display some more values from the bundle
    const columns: Array<GridColDef> = [
        { 
            field: 'instanceId', headerName: t('table.header.instanceId'), flex: 0.5, 
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.instanceId, params.row.instanceName ],
            renderCell: (params: GridRenderCellParams<[string, string]>) => {
                if (params.value![1] !== undefined && params.value![1] !== null && params.value![1] !== '') {
                    return (<>
                        <WithTooltip text={params.value![1]} tooltipText={params.value![0]} />
                    </>);
                }
                return (<>
                    <WithTooltip text={formatInstanceId(params.value![0])} tooltipText={params.value![0]} />
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
                    <WithTooltip text={params.value![1]} tooltipText={t('bundle_id_num', { id: params.value![0]})} />
                </>);
            }
        },
        { 
            field: 'stakedAmount', headerName: stakedAmountHeader, flex: 1,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => [ params.row.stakedAmount, params.row.myStakedAmount ],
            valueFormatter: (params: GridValueFormatterParams<[string, string, string, number]>) => 
                formatAmountMineTotal(BigNumber.from(params.value[1]), BigNumber.from(params.value[0]), currency, currencyDecimals)
        },
        { 
            field: 'supportingAmount', headerName: supportingAmountHeader, flex: 1,
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

    if (props.showActions !== undefined && props.showActions) {
        columns.push({ 
            field: 'actions', 
            headerName: t('table.header.actions'), 
            flex: 0.65,
            valueGetter: (params: GridValueGetterParams<any, BundleInfo>) => 
                params.row,
            renderCell: (params: GridRenderCellParams<BundleInfo>) => {
                return (<>
                    <Button onClick={() => stakeBundle(params.value!)}>{t('action.stake')}</Button>
                    <Button onClick={() => unstakeBundle(params.value!)}>{t('action.unstake')}</Button>
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

