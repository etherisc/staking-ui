import { configureStore } from '@reduxjs/toolkit';
import stakingReducer from './slices/staking';
import stakesReducer from './slices/stakes';
import chainReducer from './slices/chain';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export const store: ToolkitStore = configureStore({
    reducer: {
        chain: chainReducer,
        staking: stakingReducer,
        stakes: stakesReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
