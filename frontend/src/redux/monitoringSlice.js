import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
  name: "monitoring",
  initialState: {
    getArticlesResult: false,
    getArticlesLoading: false,
    getArticlesError: false,
    addArticlesResult: false,
    addArticlesLoading: false,
    deleteArticlesResult: false,
  },
  reducers: {
    monitoringReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_ARTICLES":
          return {
            ...state,
            getArticlesResult: payload.data,
            getArticlesLoading: payload.loading,
            getArticlesError: payload.error,
          };
        case "ADD_ARTICLES":
          return {
            ...state,
            addArticlesResult: payload.data,
            addArticlesLoading: payload.loading,
          };
        case "DELETE_ARTICLES":
          return {
            ...state,
            deleteArticlesResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { monitoringReducers } = articlesSlice.actions;

export default articlesSlice.reducer;
