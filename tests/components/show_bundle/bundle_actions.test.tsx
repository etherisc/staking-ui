import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { SnackbarProvider } from 'notistack';
import { BundleInfo } from '../../../src/backend/bundle_info';
import BundleActions from '../../../src/components/show_bundle/bundle_actions';
import { NftInfo } from '../../../src/backend/nft_info';
import { renderWithProviders } from '../../util/render_with_provider';
import dayjs from 'dayjs';

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

// mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('When rendering the bundle detail actions', () => {
    it('the Stake button is enabled for a stakeable bundle', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 0,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: true,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-stake")).toBeEnabled();
    })

    it('the stake button is disabled for a closed bundle', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: true,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-stake")).toBeDisabled();
    })

    it('the Stake button is disabled for a bundle that does not support staking', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 0,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-stake")).toBeDisabled();
    })

    it('the Stake button is disabled for a expired bundle', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 0,
            expiryAt: dayjs().add(-1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: true,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-stake")).toBeDisabled();
    })

    it('the Unstake and Restake button is enabled for a unstakeable bundle', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
                unstakingAvailable: true,
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-unstake")).toBeEnabled();
        expect(screen.getByTestId("button-restake")).toBeEnabled();
    })

    it('the Unstake and Restake button is disabled for a empty unstakeable bundle', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("0").toString(),
                targetNftId: '76594322',
                unstakingAvailable: true,
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-unstake")).toBeDisabled();
        expect(screen.getByTestId("button-restake")).toBeDisabled();
    })

    it('the Unstake and Restake button is disabled for a unstakeable bundle witout nft', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1233'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
                unstakingAvailable: true,
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-unstake")).toBeDisabled();
        expect(screen.getByTestId("button-restake")).toBeDisabled();
    })

    it('the Unstake and Restake button is disabled for a bundle with unstaking disabled', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
                unstakingAvailable: false
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-unstake")).toBeDisabled();
        expect(screen.getByTestId("button-restake")).toBeDisabled();
    })

    it('the Claim rewards button is enabled for a bundle that has an nft and accumulated rewards', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("3.71").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: ['1234'],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-claim-rewards")).toBeEnabled();
    })

    it('the Claim rewards button is disabled for a bundle that has no staked nft and no accumulated rewards', async () => {
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            unclaimedReward: parseEther("0").toString(),
            state: 2,
            expiryAt: dayjs().add(1, 'day').unix(),
            myStakedNfsIds: [] as string[],
            stakingSupported: false,
        } as BundleInfo;

        const ownedNfts = [
            {
                nftId: '1234',
                stakedAmount: parseEther("17543").toString(),
                targetNftId: '76594322',
            } as NftInfo
        ];

        const baseDom = renderWithProviders(
            <SnackbarProvider>
                <BundleActions
                    bundle={bundle}
                    ownedNfts={ownedNfts}
                    claimRewards={jest.fn()}
                    />
            </SnackbarProvider>,
            {}
        );

        expect(screen.getByTestId("button-claim-rewards")).toBeDisabled();
    })

});