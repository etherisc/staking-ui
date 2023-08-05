import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchStakeInfo } from "./data";
import { useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { formatAmount } from "../../utils/format";
import { formatEther, formatUnits } from "ethers/lib/utils";

export default function StakingData() {
    const signer = useSelector((state: RootState) => state.chain.signer);
    const numStakes = useSelector((state: RootState) => state.dashboard.numStakes);
    const stakes = useSelector((state: RootState) => state.dashboard.stakes);
    const isLoading = useSelector((state: RootState) => state.dashboard.isLoadingStakes);
    const totalStaked = useSelector((state: RootState) => state.dashboard.totalStaked);
    const totalRewards = useSelector((state: RootState) => state.dashboard.totalRewards);
    const currency = 'DIP';
    const decimals = 18;

    useEffect(() => {
        if (signer && numStakes === 0) {
            fetchStakeInfo(signer);
        }
    }, [signer]);

    if (!signer) {
        return <>No signer</>;
    }

    const columns = [
        { 
            field: 'id', headerName: 'NFT ID', flex: 0.6, },
        { field: 'target', headerName: 'Bundle ID', flex: 0.6, },
        { field: 'bundleName', headerName: 'Bundle name', flex: 0.8 },
        { 
            field: 'stakeOwner', 
            headerName: 'Stake owner',
            valueFormatter: (params: any) => params.value.substring(0, 6) + '...' + params.value.substring(params.value.length - 4),
            flex: 0.7,
        },
        { 
            field: 'stakeBalance', 
            headerName: 'Stake balance',
            valueFormatter: (params: any) => formatAmount(params.value, currency, decimals),
            flex: 1,
        },
        { 
            field: 'rewardTotalNow', 
            headerName: 'Accumulated rewards',
            valueFormatter: (params: any) => formatAmount(params.value, currency, decimals),
            flex: 1,
        },
        { 
            field: 'stakingStarted',
            headerName: 'Started',
            valueFormatter: (params: any) => new Date(params.value * 1000).toDateString(),
            flex: 0.8,
        },
        { 
            field: 'updatedAt',
            headerName: 'Updated',
            valueFormatter: (params: any) => new Date(params.value * 1000).toDateString(),
            flex: 0.8,
        },
        {
            field: 'unstakingAfter',
            headerName: 'Unstaking after',
            valueFormatter: (params: any) => new Date(params.value * 1000).toDateString(),
            flex: 0.8,
        }
    ];

    const loadingBar = isLoading ? <LinearProgress /> : null

    return (<>
        {loadingBar}

        <Box sx={{ mb: 1 }}>
            <div>Total stakes: {numStakes}</div>
            <div>Total staked: {currency} {formatEther(totalStaked)}</div>
            <div>Total rewards: {currency} {formatEther(totalRewards)}</div>
        </Box>

        <DataGrid 
            autoHeight
            rows={stakes} 
            columns={columns} 
            getRowId={(row) => row.id}
            // initialState={{
            //     sorting: {
            //         sortModel: [{ field: 'expiryAt', sort: 'asc' }],
            //     },
            //     pagination: {
            //         paginationModel: { pageSize: 10, page: 0 },
            //     },
            // }}
            disableRowSelectionOnClick={true}
            disableColumnMenu={true}
            columnBuffer={20}
            // slots={{
            //     noRowsOverlay: NoRowsOverlay,
            //     toolbar: GridToolbar,
            // }}
            />
    </>);
}