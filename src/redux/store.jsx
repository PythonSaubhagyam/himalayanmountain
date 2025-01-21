import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import bannerReducer from "../redux/slices/homeApi";
import shopReducer from "../redux/slices/shopApi"
import categoryReducer from "../redux/slices/categoryApi"

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    category: categoryReducer,
    shop: shopReducer,

  },
});

setupListeners(store.dispatch);
