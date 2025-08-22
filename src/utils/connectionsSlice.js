import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return state.filter(connection => connection._id !== action.payload);
    },
  },
});

export const { addConnections, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;