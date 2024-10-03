import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: "store",
    initialState: {
        getStoreResult: false,
        getStoreLoading: false,
        getStoreError: false,
        addStoreResult: false,
        addStoreLoading: false,
        deleteStoreResult: false,
        id_server : 1,
    },
    reducers: {
        storeReducers: (state, action) => {
            const { type, payload } = action.payload;
            switch (type) {
                case "GET_STORE":
                    return {
                        ...state,
                        getStoreResult: payload.data,
                        getStoreLoading: payload.loading,
                        getStoreError: payload.error,
                    };
                case "ADD_STORE":
                    return {
                        ...state,
                        addStoreResult: payload.data,
                        addStoreLoading: payload.loading,
                    };
                case "DELETE_STORE":
                    return {
                        ...state,
                        deleteStoreResult: payload.data,
                    };
                default:
                    return state;
            }
        },
        set_id_server: (state, action) => {
            return (
                {
                    ...state,
                    id_server: action.payload
                }
            )
        },
    },
});

export const { storeReducers, set_id_server } = storeSlice.actions;

export default storeSlice.reducer;
