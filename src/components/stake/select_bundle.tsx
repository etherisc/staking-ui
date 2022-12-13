import { Button, Grid, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/system/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridCallbackDetails, GridColDef, GridSelectionModel } from "@mui/x-data-grid/models";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useTranslation } from "next-i18next";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { AppContext } from "../../context/app_context";
import { BundleRowView } from "../../model/bundle_row_view";
import { add, bundleSelected, finishLoading, reset, startLoading } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import BundleStakes from "../bundle_stakes/bundle_stakes";

interface SelectBundleProps {
    stakingApi: StakingApi;
}

export default function SelectBundle(props: SelectBundleProps) {
    const { t } = useTranslation(['stake', 'common']);
    const appContext = useContext(AppContext);
    const currency = props.stakingApi.currency();

    const bundles = useSelector((state: RootState) => state.staking.bundles);
    const isLoadingBundles = useSelector((state: RootState) => state.staking.isLoadingBundles);
    const dispatch = useDispatch();

    const [ selectedBundle, setSelectedBundle ] = useState<BundleInfo | undefined>(undefined);

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
            dispatch(reset());
        }
    }, [appContext?.data.signer, props.stakingApi, dispatch]);

    return (
        <>
            <Typography variant="body1" sx={{ my: 2 }}>{t('choose_bundle')}</Typography>

            <BundleStakes 
                stakingApi={props.stakingApi}
                bundles={bundles}
                isBundlesLoading={isLoadingBundles}
                onBundleSelected={setSelectedBundle}
                />

            <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
                <Button 
                    variant="contained"
                    disabled={selectedBundle === undefined}
                    onClick={() => dispatch(bundleSelected(selectedBundle!))}
                    >{t('action.continue', { ns: "common" })}</Button>
            </Grid>
        </>
    );
}