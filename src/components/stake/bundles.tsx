import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/system/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { AppContext } from "../../context/app_context";
import { BundleRowView } from "../../model/bundle_row_view";
import { add, finishLoading, reset, startLoading } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";

interface BundlesProps {
    stakingApi: StakingApi;
}

export default function Bundles(props: BundlesProps) {
    const { t } = useTranslation(['stake', 'common']);
    const appContext = useContext(AppContext);
    const currency = props.stakingApi.currency();

    const bundles = useSelector((state: RootState) => state.staking.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.staking.isLoadingBundles);
    const dispatch = useDispatch();

    const [ pageSize, setPageSize ] = useState(5);

    const convertBundles = useCallback((policies: BundleInfo[]): BundleRowView[] => {
        return policies.map((bundle: BundleInfo) => {
            return {
                id: bundle.id,
                instanceId: bundle.instanceId,
                bundleId: bundle.bundleId.toString(),
                stakedAmount: `${currency} ${formatEther(BigNumber.from(bundle.stakedAmount))}`,
                supportingAmount: `${currency} ${formatEther(BigNumber.from(bundle.supportingAmount))}`,
                state: t('bundle_state_' + bundle.state, { ns: 'common'}),
            } as BundleRowView;
        });
    }, [t, currency]);

    useEffect(() => {
        if (appContext.data.signer) {
            dispatch(startLoading());
            dispatch(reset());
            props.stakingApi.retrieveBundles(
                (bundle: BundleInfo) => {
                    dispatch(add(bundle));
                    return Promise.resolve();
                },
                () => {
                    dispatch(finishLoading());
                }
            );
        } else {
            
        }
    }, [appContext?.data.signer, props.stakingApi, dispatch]);

    const columns: GridColDef[] = [
        { field: 'instanceId', headerName: t('table.header.instanceId'), flex: 1 },
        { field: 'bundleId', headerName: t('table.header.bundleId'), flex: 1 },
        { field: 'stakedAmount', headerName: t('table.header.stakedAmount'), flex: 1 },
        { field: 'supportingAmount', headerName: t('table.header.supportingAmount'), flex: 1 },
        { field: 'state', headerName: t('table.header.state'), flex: 1 },
    ];

    const loadingBar = isLoadingBundles ? <LinearProgress /> : null;

    return (
        <>
            <Typography variant="body1" sx={{ my: 2 }}>{t('choose_bundle')}</Typography>
            
            {loadingBar}

            <DataGrid 
                autoHeight
                rows={convertBundles(bundles)} 
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
                />
        </>
    );
}