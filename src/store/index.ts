import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import archivedReducer from "./archived";
import favoriteReducer from "./favorite";
import searchedReducer from "./searched";
import settingsReducer from "./settings";

const store = configureStore({
  reducer: {
    archived: archivedReducer,
    favorite: favoriteReducer,
    searched: searchedReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
