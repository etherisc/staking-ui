import { StakingApi } from "../../backend/staking_api";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Heading1 } from "../heading";

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
        // TODO: style button
        return <button onClick={() => loginWithRedirect()}>Log in</button>;
    }

    return (<>
        <Heading1>Staking Dashboard</Heading1>
        
    </>);
}