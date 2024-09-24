import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
    name: "cache",
    initialState: {
        getServerResult: false,
        getServerLoading: false,
        getServerError: false,
        addServerResult: false,
        addServerLoading: false,
        deleteServerResult: false,
    },
    reducers: {
        serverReducers: (state, action) => {
            const { type, payload } = action.payload;
            switch (type) {
                case "GET_SERVER":
                    return {
                        ...state,
                        getServerResult: payload.data,
                        getServerLoading: payload.loading,
                        getServerError: payload.error,
                    };
                case "ADD_SERVER":
                    return {
                        ...state,
                        addServerResult: payload.data,
                        addServerLoading: payload.loading,
                    };
                case "DELETE_SERVER":
                    return {
                        ...state,
                        deleteServerResult: payload.data,
                    };
                default:
                    return state;
            }
        },
    },
});

export const { serverReducers } = serverSlice.actions;

export default serverSlice.reducer;
