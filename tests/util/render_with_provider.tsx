import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RootState, AppStore, setupStore } from '../../src/redux/store'
import { ChainState } from '../../src/redux/slices/chain'
import { StakesState } from '../../src/redux/slices/stakes'
import { StakingState } from '../../src/redux/slices/staking'
import { AccountState } from '../../src/redux/slices/account'
import { DashboardState } from '../../src/redux/slices/dashboard'


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: RootState
    store?: AppStore
}

export const EMPTY_ROOT_STATE: RootState = {
    chain: {} as ChainState,
    stakes: {} as StakesState,
    staking: {} as StakingState,
    account: {} as AccountState,
    dashboard: {} as DashboardState,
};

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = EMPTY_ROOT_STATE,
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
