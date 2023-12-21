import {configureStore} from '@reduxjs/toolkit';
import ScoreSlice from './scoreSlice';

export const globalStore = configureStore({
  reducer: {
    scores: ScoreSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof globalStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof globalStore.dispatch;
