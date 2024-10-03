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
    id_server : 1,
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
    set_id_server: (state, action) => {
      return (
        {
          ...state,
          id_server : action.payload
        }
      )
    },
  },
});

export const { accessReducers, set_id_server } = accessSlice.actions;

export default accessSlice.reducer;
