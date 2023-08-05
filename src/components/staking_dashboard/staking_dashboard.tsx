import { StakingApi } from "../../backend/staking_api";
import { useAuth0 } from '@auth0/auth0-react';
import { Heading1 } from "../heading";
import StakingData from "./staking_data";
import { Button } from "@mui/material";

interface StakingDashboardProps {
    stakingApi: StakingApi;
}

export default function StakingDashboard(props: StakingDashboardProps) {

    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
    } = useAuth0();

    // console.log("auth0", user, isAuthenticated, isLoading);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!isAuthenticated) {
        return <Button variant="contained" color="secondary" onClick={() => loginWithRedirect()}>Log in</Button>;
    }

    return (<>
        <Heading1>Staking Dashboard</Heading1>
        
        <StakingData />
    </>);
}