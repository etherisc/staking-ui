import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { SnackbarProvider } from 'notistack';
import { BundleInfo } from '../../../src/backend/bundle_info';
import BundleDetails from '../../../src/components/show_bundle/bundle_details';
import dayjs, { unix } from 'dayjs';
import { timeStamp } from 'console';

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));    

describe('When displaying the bundle detail component', () => {
    it('all bundle data is correctly formatted', async () => {
        const expirationDate = dayjs().add(1, 'day').unix();
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            instanceId: "0x123456790abcdefgh",
            instanceName: "Instance 1",
            riskpoolId: 42,
            bundleId: 43,
            bundleName: "Bundle 1",
            myStakedAmount: parseEther("17543").toString(),
            stakedAmount: parseEther("23654").toString(),
            lockedAmount: parseUnits("2345", 6).toString(),
            mySupportingAmount: parseUnits("1754.3", 6).toString(),
            supportingAmount: parseUnits("2365.4", 6).toString(),
            unclaimedReward: parseEther("3.71").toString(),
            supportingToken: "USDT",
            supportingTokenDecimals: 6,
            state: 0,
            expiryAt: expirationDate,
            rewardRate: 0.1234,
        } as BundleInfo;

        const baseDom = render(
            <SnackbarProvider>
                <BundleDetails
                    bundle={bundle}
                    currency="DIP"
                    decimals={18}
                    />
            </SnackbarProvider>
        );

        expect(screen.getByText('0x1234…efgh')).toBeInTheDocument();
        expect(screen.getByText('Instance 1')).toBeInTheDocument();
        expect(screen.getByText('43 (76594322)')).toBeInTheDocument();
        expect(screen.getByText('Bundle 1')).toBeInTheDocument();
        expect(screen.getByText('bundle_state_0')).toBeInTheDocument();
        expect(screen.getByText('DIP 17,543.00')).toBeInTheDocument();
        expect(screen.getByText('DIP 23,654.00')).toBeInTheDocument();
        expect(screen.getByText('DIP 3.71')).toBeInTheDocument();
        expect(screen.getByText('12.34 %')).toBeInTheDocument();
        expect(screen.getByText('USDT 2,345.00')).toBeInTheDocument();
        expect(screen.getByText('USDT 1,754.30')).toBeInTheDocument();
        expect(screen.getByText('USDT 2,365.40')).toBeInTheDocument();
        expect(screen.getByTestId("bundle-details")).toHaveTextContent(unix(expirationDate).format('YYYY-MM-DD HH:mm UTC')); // valid until
    })

    it('the unclaimed reward is displayed as < 0.01 if its very small', async () => {
        const bundle = {
            id: "0x1234-1",
            instanceId: "0x123456790abcdefgh",
            instanceName: "Instance 1",
            riskpoolId: 42,
            bundleId: 43,
            bundleName: "Bundle 1",
            myStakedAmount: parseEther("17543").toString(),
            stakedAmount: parseEther("23654").toString(),
            lockedAmount: parseUnits("2345", 6).toString(),
            mySupportingAmount: parseUnits("1754.3", 6).toString(),
            supportingAmount: parseUnits("2365.4", 6).toString(),
            unclaimedReward: parseEther("0.000023").toString(),
            supportingToken: "USDT",
            supportingTokenDecimals: 6,
            state: 0,
            expiryAt: 1694349476,
        } as BundleInfo;

        const baseDom = render(
            <SnackbarProvider>
                <BundleDetails
                    bundle={bundle}
                    currency="DIP"
                    decimals={18}
                    />
            </SnackbarProvider>
        );

        expect(screen.getByText('DIP < 0.01')).toBeInTheDocument();
    })
})