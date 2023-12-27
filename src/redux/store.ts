import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/account';
import chainReducer from './slices/chain';
import dashboardReducer from './slices/dashboard';
import stakesReducer from './slices/stakes';
import stakingReducer from './slices/staking';


// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    chain: chainReducer,
    staking: stakingReducer,
    stakes: stakesReducer,
    account: accountReducer,
    dashboard: dashboardReducer,
})

export const setupStore = (preloadedState?: RootState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
