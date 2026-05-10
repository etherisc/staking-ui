import { useState } from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeSigner } from '../../utils/chain';

export default function Logout() {
    const { t } = useTranslation('common');
    const { isConnected, isWalletConnect } = useSelector((state: any) => state.chain);
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            removeSigner(dispatch);
            if (isWalletConnect) {
                // wagmiDisconnect();
            }
        } finally {
            // Usually we redirect or the component unmounts, 
            // but just in case:
            setIsLoggingOut(false);
        }
    }
        
    let button = (<></>);

    if (isConnected) {
        button = (
            <Button variant="contained" color="secondary" onClick={logout} disabled={isLoggingOut}>
                <FontAwesomeIcon icon={faRightFromBracket} className="fa" />
                {t('action.disconnect')}
            </Button>
        );
    }


    return (<>{button}</>);
}