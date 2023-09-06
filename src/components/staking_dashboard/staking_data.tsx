import { Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { bigNumberComparator } from "../../utils/bignumber";
import { formatAmount } from "../../utils/format";
import { fetchStakeInfoData } from "./dashboard_data_fetch";

export default function StakingData() {
    const signer = useSelector((state: RootState) => state.chain.signer);
    const numStakes = useSelector((state: RootState) => state.dashboard.numStakes);
    const numStakesWithStake = useSelector((state: RootState) => state.dashboard.stakes).filter((s) => BigNumber.from(s.stakeBalance).gt(0)).length;
    const stakes = useSelector((state: RootState) => state.dashboard.stakes);
    const isLoading = useSelector((state: RootState) => state.dashboard.isLoadingStakes);
    const totalStaked = useSelector((state: RootState) => state.dashboard.totalStaked);
    const totalRewards = useSelector((state: RootState) => state.dashboard.totalRewards);
    const rewardsReserves = useSelector((state: RootState) => state.dashboard.rewardReserves);
    const stakingAllowance = useSelector((state: RootState) => state.dashboard.stakingAllowance);
    const currency = 'DIP';
    const decimals = 18;

    useEffect(() => {
        if (signer && numStakes === 0) {
            fetchStakeInfoData(signer);
        }
    }, [signer]);

    if (!signer) {
        return <>No signer</>;
    }

    const columns = [
        { 
            field: 'id', headerName: 'NFT ID', flex: 0.6, 
        },
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
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, string>) => BigNumber.from(params.value),
            renderCell: (params: any) => {
                return <Box sx={{ textAlign: 'end', width: '100%', px: 1 }}>{formatAmount(params.value, currency, decimals)}</Box>;
            },
            sortComparator: (v1: BigNumber, v2: BigNumber) => bigNumberComparator(v1, v2)
        },
        { 
            field: 'rewardTotalNow', 
            headerName: 'Accumulated rewards',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, string>) => BigNumber.from(params.value),
            renderCell: (params: any) => {
                return <Box sx={{ textAlign: 'end', width: '100%', px: 1 }}>{formatAmount(params.value, currency, decimals)}</Box>;
            },
            sortComparator: (v1: BigNumber, v2: BigNumber) => bigNumberComparator(v1, v2)
        },
        { 
            field: 'stakingStarted',
            headerName: 'Started',
            valueFormatter: (params: any) => (moment.unix(params.value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        },
        { 
            field: 'updatedAt',
            headerName: 'Updated',
            valueFormatter: (params: any) => (moment.unix(params.value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        },
        {
            field: 'unstakingAfter',
            headerName: 'Locked until',
            valueFormatter: (params: any) => (moment.unix(params.value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        }
    ];

    const loadingBar = isLoading ? <LinearProgress /> : null

    return (<>
        {loadingBar}

        <Grid container>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Number of stakes (Total / With stake amount &gt; DIP 0)
                        </Typography>
                        <Typography variant="h5" component="div">
                        {numStakes} / {numStakesWithStake}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total staked
                        </Typography>
                        <Typography variant="h5" component="div">
                            {formatAmount(BigNumber.from(totalStaked), currency, decimals)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Accumulated rewards
                        </Typography>
                        <Typography variant="h5" component="div">
                            {formatAmount(BigNumber.from(totalRewards), currency, decimals)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Reward reserves
                        </Typography>
                        <Typography variant="h5" component="div">
                            {formatAmount(BigNumber.from(rewardsReserves), currency, decimals)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Staking allowance
                        </Typography>
                        <Typography variant="h5" component="div">
                            {formatAmount(BigNumber.from(stakingAllowance), currency, decimals)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

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