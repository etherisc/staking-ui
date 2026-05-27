import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { parseEther } from 'ethers/lib/utils';
import { BundleInfo } from '../../../src/backend/bundle_info';
import { NftInfo } from '../../../src/backend/nft_info';
import UnstakeBundleForm from '../../../src/components/unstake/unstake_bundle_form';
import { BundleAction, StakesState } from '../../../src/redux/slices/stakes';
import { StakingState } from '../../../src/redux/slices/staking';
import { mockStakingApiSimple } from '../../mocks/staking_api';
import { EMPTY_ROOT_STATE, renderWithProviders } from '../../util/render_with_provider';

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

describe('UnstakeBundleForm', () => {
    it('submits the unstake transaction only once on a double click', async () => {
        const user = userEvent.setup();
        const stakingApi = mockStakingApiSimple();
        const bundle = {
            id: "0x1234-1",
            nftId: "76594322",
            myStakedNfsIds: ["1234"],
        } as BundleInfo;
        const ownedNfts = [
            {
                nftId: "1234",
                stakedAmount: parseEther("100").toString(),
                targetNftId: "76594322",
                unstakingAvailable: true,
            } as NftInfo,
        ];
        const unstake = jest.fn(() => new Promise<void>(() => {}));

        renderWithProviders(
            <UnstakeBundleForm
                stakingApi={stakingApi}
                bundle={bundle}
                formDisabled={false}
                unstake={unstake}
            />,
            {
                preloadedState: {
                    ...EMPTY_ROOT_STATE,
                    stakes: {
                        bundles: [],
                        selectedBundleIdx: null,
                        ownedNfts,
                        isLoadingBundles: false,
                        bundleAction: BundleAction.None,
                        pendingFeeless: false,
                    } as StakesState,
                    staking: {
                        step: 3,
                        stakeingBundle: bundle,
                        restakingBundle: null,
                    } as StakingState,
                }
            }
        );

        fireEvent.change(screen.getByLabelText('stakedAmount'), { target: { value: '10' } });

        const submitButton = screen.getByRole('button', { name: 'action.unstake' });
        await waitFor(() => expect(submitButton).toBeEnabled());

        await user.dblClick(submitButton);

        expect(unstake).toHaveBeenCalledTimes(1);
    });
});
