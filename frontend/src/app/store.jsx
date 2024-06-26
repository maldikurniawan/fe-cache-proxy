import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import monitoringSlice from "../redux/monitoringSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        monitoring: monitoringSlice,
    },
})