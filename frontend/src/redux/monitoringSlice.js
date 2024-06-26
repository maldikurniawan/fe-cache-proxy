import { createSlice } from "@reduxjs/toolkit";

export const monitoringSlice = createSlice({
  name: "monitoring",
  initialState: {
    getMonitoringResult: false,
    getMonitoringLoading: false,
    getMonitoringError: false,
    addMonitoringResult: false,
    addMonitoringLoading: false,
    deleteMonitoringResult: false,
  },
  reducers: {
    monitoringReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_MONITORING":
          return {
            ...state,
            getMonitoringResult: payload.data,
            getMonitoringLoading: payload.loading,
            getMonitoringError: payload.error,
          };
        case "ADD_MONITORING":
          return {
            ...state,
            addMonitoringResult: payload.data,
            addMonitoringLoading: payload.loading,
          };
        case "DELETE_MONITORING":
          return {
            ...state,
            deleteMonitoringResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { monitoringReducers } = monitoringSlice.actions;

export default monitoringSlice.reducer;
