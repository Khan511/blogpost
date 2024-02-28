import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./user/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ThemeReducer from "./theme/ThemeSlice";
// import persistReducer from "redux-persist/es/persistReducer";

const rootRecucer = combineReducers({
  user: UserReducer,
  theme: ThemeReducer,
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
