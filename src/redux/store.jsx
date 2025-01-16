import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import bannerReducer from "../redux/slices/homeApi";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
  },
});

setupListeners(store.dispatch);
