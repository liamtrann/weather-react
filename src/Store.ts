import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers/RootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "location",
  storage,
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export const persistor = persistStore(Store);
