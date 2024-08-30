import { createSlice } from "@reduxjs/toolkit";

export const useragentSlice = createSlice({
  name: "useragent",
  initialState: {
    getUserAgentResult: false,
    getUserAgentLoading: false,
    getUserAgentError: false,
    addUserAgentResult: false,
    addUserAgentLoading: false,
    deleteUserAgentResult: false,
  },
  reducers: {
    useragentReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_USERAGENT":
          return {
            ...state,
            getUserAgentResult: payload.data,
            getUserAgentLoading: payload.loading,
            getUserAgentError: payload.error,
          };
        case "ADD_USERAGENT":
          return {
            ...state,
            addUserAgentResult: payload.data,
            addUserAgentLoading: payload.loading,
          };
        case "DELETE_USERAGENT":
          return {
            ...state,
            deleteUserAgentResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { useragentReducers } = useragentSlice.actions;

export default useragentSlice.reducer;
