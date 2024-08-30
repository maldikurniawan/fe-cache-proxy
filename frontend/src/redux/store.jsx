import { configureStore } from "@reduxjs/toolkit"
import accessSlice from "./accessSlice";
import storeSlice from "./storeSlice";
import useragentSlice from "./useragentSlice";
import cacheSlice from "./cacheSlice";


export const store = configureStore({
    reducer: {
        access: accessSlice,
        store: storeSlice,
        useragent: useragentSlice,
        cache: cacheSlice,
    },
})