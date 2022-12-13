import { LinearProgress } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { BundleRowView } from "../../model/bundle_row_view";

interface BundleStakesProps {
    stakingApi: StakingApi;
    bundles: Array<BundleInfo>;
    isBundlesLoading: boolean;
    onBundleSelected?: (bundle: BundleInfo) => void;
    disableSelection?: boolean;
}

export default function BundleStakes(props: BundleStakesProps) {
    const { t } = useTranslation(['common']);

    const [ pageSize, setPageSize ] = useState(5);
    const currency = props.stakingApi.currency();

    const convertBundles = useCallback((bundles: BundleInfo[]): BundleRowView[] => {
        return bundles.map((bundle: BundleInfo) => {
            return {
                id: bundle.id,
                instanceId: bundle.instanceId,
                bundleId: bundle.bundleId.toString(),
                stakedAmount: `${currency} ${formatEther(BigNumber.from(bundle.stakedAmount))}`,
                supportingAmount: `${currency} ${formatEther(BigNumber.from(bundle.supportingAmount))}`,
                state: t(`bundle_state_${bundle.state}`, { ns: 'common'}),
            } as BundleRowView;
        });
    }, [t, currency]);


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

    const columns: GridColDef[] = [
        { field: 'instanceId', headerName: t('table.header.instanceId'), flex: 1 },
        { field: 'bundleId', headerName: t('table.header.bundleId'), flex: 1 },
        { field: 'stakedAmount', headerName: t('table.header.stakedAmount'), flex: 1 },
        { field: 'supportingAmount', headerName: t('table.header.supportingAmount'), flex: 1 },
        { field: 'state', headerName: t('table.header.state'), flex: 1 },
    ];

    const loadingBar = props.isBundlesLoading ? <LinearProgress /> : null;

    return (
        <>
            {loadingBar}

            <DataGrid 
                autoHeight
                rows={convertBundles(props.bundles)} 
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
                />
        </>
    );
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
