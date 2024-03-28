import { Box, Button, Card, CardContent, FormControlLabel, Grid, LinearProgress, Switch, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { BigNumber } from "ethers";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { bigNumberComparator } from "../../utils/bignumber";
import { formatAmount } from "../../utils/format";
import { fetchStakeInfoData } from "./dashboard_data_fetch";
import React from "react";
import { StakeData } from "../../backend/stake_data";
import Link from "next/link";


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

    const [showAllStakes, setShowAllStakes] = React.useState(false);
    function handleShowAllStakesChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setShowAllStakes(!showAllStakes);
    }

    useEffect(() => {
        if (signer && numStakes === 0) {
            fetchStakeInfoData(signer);
        }
    }, [signer, numStakes]);

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
            valueFormatter: (value: any) => value.substring(0, 6) + '...' + value.substring(value.length - 4),
            flex: 0.7,
        },
        { 
            field: 'stakeBalance', 
            headerName: 'Stake balance',
            flex: 1,
            valueGetter: (value: any) => BigNumber.from(value),
            renderCell: (params: any) => {
                return <Box sx={{ textAlign: 'end', width: '100%', px: 1 }}>{formatAmount(params.value, currency, decimals)}</Box>;
            },
            sortComparator: (v1: BigNumber, v2: BigNumber) => bigNumberComparator(v1, v2)
        },
        { 
            field: 'rewardTotalNow', 
            headerName: 'Accumulated rewards',
            flex: 1,
            valueGetter: (value: any) => BigNumber.from(value),
            renderCell: (params: any) => {
                return <Box sx={{ textAlign: 'end', width: '100%', px: 1 }}>{formatAmount(params.value, currency, decimals)}</Box>;
            },
            sortComparator: (v1: BigNumber, v2: BigNumber) => bigNumberComparator(v1, v2)
        },
        { 
            field: 'stakingStarted',
            headerName: 'Started',
            valueFormatter: (value: any) => (moment.unix(value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        },
        { 
            field: 'updatedAt',
            headerName: 'Updated',
            valueFormatter: (value: any) => (moment.unix(value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        },
        {
            field: 'unstakingAfter',
            headerName: 'Locked until',
            valueFormatter: (value: any) => (moment.unix(value)).format('DD/MMM/YYYY'),
            flex: 0.7,
        }
    ];

    function GridToolbar() {
        const stakingContractUrl = process.env.NEXT_PUBLIC_CHAIN_TOKEN_BLOCKEXPLORER_URL + "/address/" + process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
        return (
            <GridToolbarContainer >
                <Box sx={{ flexGrow: 1 }}>
                    <FormControlLabel 
                        control={
                            <Switch
                                defaultChecked={showAllStakes}
                                value={showAllStakes} 
                                onChange={handleShowAllStakesChanged}
                                sx={{ ml: 1 }}
                                data-testid="show-my-stakes-switch"
                                />} 
                        label={'Show all (including empty)'} />
                </Box>
                {/* aligned right beyond here */}
                <Box sx={{ px: 1 }}>
                    <Button variant="text" sx={{ p: 0, ml: 1 }} href={stakingContractUrl!} target="_blank" rel="noreferrer">
                        <Typography variant="body2" >
                            Staking contract on Etherscan
                        </Typography>
                    </Button>
                </Box>
            </GridToolbarContainer>
        );
    }

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
            rows={stakes.filter((s: StakeData) => showAllStakes ? true : BigNumber.from(s.stakeBalance).gt(0))} 
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
            slots={{
                toolbar: GridToolbar,
            }}
            />
    </>);
}