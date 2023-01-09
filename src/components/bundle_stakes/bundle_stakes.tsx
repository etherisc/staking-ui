import { LinearProgress } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { BundleRowView } from "../../model/bundle_row_view";
import { formatInstanceId } from "../../utils/format";
import { formatCurrency } from "../../utils/numbers";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    disableSelection?: boolean;
    showMyAmounts?: boolean;
    showTotalAmounts?: boolean;
}

export default function BundleStakes(props: BundleStakesProps) {
    const { t } = useTranslation(['common']);

    const [ pageSize, setPageSize ] = useState(5);
    const currency = props.stakingApi.currency();
    const currencyDecimals = props.stakingApi.currencyDecimals();

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

    // TODO: display some more values from the bundle
    const columns: Array<GridColDef> = [
        { 
            field: 'instanceId', headerName: t('table.header.instanceId'), flex: 0.5, 
            valueFormatter: (params: GridValueFormatterParams<string>) => formatInstanceId(params.value) 
        },
        { field: 'bundleId', headerName: t('table.header.bundleId'), flex: 0.5 },
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
            field: 'state', headerName: t('table.header.state'), flex: 0.5,
            valueFormatter: (params: GridValueFormatterParams<string>) => t(`bundle_state_${params.value}`, { ns: 'common'})
        },
    ];

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

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
