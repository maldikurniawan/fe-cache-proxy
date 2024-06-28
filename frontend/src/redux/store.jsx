import { configureStore } from "@reduxjs/toolkit"
import monitoringSlice from "./monitoringSlice";


export const store = configureStore({
    reducer: {
        monitoring: monitoringSlice,
    },
})