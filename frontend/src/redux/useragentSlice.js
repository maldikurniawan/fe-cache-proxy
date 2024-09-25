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

export const { useragentReducers, set_id_server } = useragentSlice.actions;

export default useragentSlice.reducer;
