import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchStakeInfo } from "./data";
import { useEffect } from "react";

export default function StakingData() {
    const signer = useSelector((state: RootState) => state.chain.signer);
    const numStakes = useSelector((state: RootState) => state.dashboard.numStakes);

    useEffect(() => {
        if (signer && numStakes === 0) {
            fetchStakeInfo(signer);
        }
    }, [signer]);

    if (!signer) {
        return <>No signer</>;
    }

    return <>Data</>;
}