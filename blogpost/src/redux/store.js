import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./user/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
// 03:13:30
const rootRecucer = combineReducers({
  user: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistReducers = persistReducer(persistConfig, rootRecucer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);
