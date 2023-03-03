import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SnackbarProvider } from 'notistack';
import userEvent from '@testing-library/user-event';
import BundleStakes from '../../../src/components/bundle_stakes/bundle_stakes';
import { BundleInfo } from '../../../src/backend/bundle_info';
import { mockStakingApiSimple } from '../../mocks/staking_api';
import { renderWithProviders } from '../../util/render_with_provider';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import dayjs from 'dayjs';
import { formatDateUtc } from '../../../src/utils/date';
import moment from 'moment';

const MYADDRESS = "0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729";

Object.assign(navigator, {
    clipboard: {
        writeText: () => {},
    },
});

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

describe('When rendering bundle stakes', () => {
    it('all bundles are rendered', async () => {
        const stakingApi = mockStakingApiSimple();

        const bundle1ExpirationAt = dayjs().add(28, "day").unix();
        const bundle2ExpirationAt = dayjs().add(-5, "day").unix();

        const bundles = [
            {
                id: "0x1234-1",
                instanceId: "0x123456790abcdefgh",
                riskpoolId: 42,
                bundleId: 1,
                bundleName: "Bundle 1",
                myStakedAmount: parseEther("1000").toString(),
                stakedAmount: parseEther("20000").toString(),
                mySupportingAmount: parseUnits("100", 6).toString(),
                supportingAmount: parseUnits("2000", 6).toString(),
                supportingToken: "USDT",
                supportingTokenDecimals: 6,
                state: 0,
                expiryAt: bundle1ExpirationAt,
            } as BundleInfo,
            {
                id: "0x1234-2",
                instanceId: "0x123456790abcdefgh",
                riskpoolId: 42,
                bundleId: 2,
                bundleName: "Bundle 2",
                myStakedAmount: parseEther("3000").toString(),
                stakedAmount: parseEther("40000").toString(),
                mySupportingAmount: parseUnits("300", 6).toString(),
                supportingAmount: parseUnits("4000", 6).toString(),
                supportingToken: "USDT",
                supportingTokenDecimals: 6,
                state: 0,
                expiryAt: bundle2ExpirationAt,
            } as BundleInfo,
        ] as Array<BundleInfo>;

        renderWithProviders(
            <SnackbarProvider>
                <BundleStakes
                    stakingApi={stakingApi}
                    bundles={bundles}
                    isBundlesLoading={false}
                    />
            </SnackbarProvider>
        );

        await waitFor(async () => 
            expect(await screen.findAllByRole("row")).toHaveLength(3)
        );
        
        const rows = await screen.findAllByRole("row");

        // row 0 is header

        expect(rows[1]).toHaveTextContent("0x1234…efgh");
        expect(rows[1]).toHaveTextContent("Bundle 2");
        expect(rows[1]).toHaveTextContent("DIP 3,000.00");
        expect(rows[1]).toHaveTextContent("USDT 300.00");
        expect(rows[1]).toHaveTextContent("USDT 4,000.00");
        expect(rows[1]).toHaveTextContent("bundle_state_0");
        expect(rows[1]).toHaveTextContent(moment.unix(bundle2ExpirationAt).utc().format('YYYY-MM-DD HH:mm UTC'));

        expect(rows[2]).toHaveTextContent("0x1234…efgh");
        expect(rows[2]).toHaveTextContent("Bundle 1");
        expect(rows[2]).toHaveTextContent("DIP 1,000.00");
        expect(rows[2]).toHaveTextContent("USDT 100.00");
        expect(rows[2]).toHaveTextContent("USDT 2,000.00");
        expect(rows[2]).toHaveTextContent("bundle_state_0");
        expect(rows[2]).toHaveTextContent(moment.unix(bundle1ExpirationAt).utc().format('YYYY-MM-DD HH:mm UTC'));

    })

})
