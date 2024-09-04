import { configureStore } from "@reduxjs/toolkit";
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

export default store;
