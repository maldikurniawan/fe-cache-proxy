import { createSlice } from "@reduxjs/toolkit";

export const accessSlice = createSlice({
  name: "access",
  initialState: {
    getAccessResult: false,
    getAccessLoading: false,
    getAccessError: false,
    addAccessResult: false,
    addAccessLoading: false,
    deleteAccessResult: false,
  },
  reducers: {
    accessReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_ACCESS":
          return {
            ...state,
            getAccessResult: payload.data,
            getAccessLoading: payload.loading,
            getAccessError: payload.error,
          };
        case "ADD_ACCESS":
          return {
            ...state,
            addAccessResult: payload.data,
            addAccessLoading: payload.loading,
          };
        case "DELETE_ACCESS":
          return {
            ...state,
            deleteAccessResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { accessReducers } = accessSlice.actions;

export default accessSlice.reducer;
