// import WalletConnectProvider from "@walletconnect/web3-provider";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery, useTheme } from "@mui/material";
import Button from '@mui/material/Button';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { useTranslation } from "next-i18next";

export default function LoginWithWalletConnectV2Button(props: any) {
    const { closeDialog } = props;
    const { open,  } = useWeb3Modal();

    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider, walletProviderType } = useWeb3ModalProvider();  

    const { t } = useTranslation('common');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    async function login() {
        console.log("wallet connect v4 login");
        closeDialog();
        // show walletconnect v4 modal
        await open();
    }

    let button = (<></>);
    let buttonText = t('action.login_walletconnect');

    if (isMobile) {
        buttonText = t('action.login_walletconnect_short');
    }

    if (! isConnected ) {
        button = (
            <Button variant="contained" color="secondary" onClick={login} fullWidth>
                <FontAwesomeIcon icon={faRightToBracket} className="fa" />
                {buttonText}
            </Button>
        );
    }

    return (
        <>{button}</>
    );
}
