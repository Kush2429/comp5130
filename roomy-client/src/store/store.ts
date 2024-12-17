import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./slices/auth";
import { apiSlice } from "./baseApiSlice";
import { authApi } from "./services/auth";
import productSlice from "./slices/productList-slice";
import addListingSlice from "./slices/addListing-slice";
import postFilterSlice from "./slices/postFilter-slice";
import modalSlice from "./slices/modal-slice";
import editListingSlice from "./slices/editListing-slice";
export const store = configureStore({
  reducer: {
    authSlice,
    productSlice,
    addListingSlice,
    postFilterSlice,
    modalSlice,
    editListingSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
