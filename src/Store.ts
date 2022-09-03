import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers/RootReducer";

export const Store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
