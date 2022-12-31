import { createSlice } from "@reduxjs/toolkit";

// トークンを保持するスライス
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { 
    idToken: "" 
  },
  reducers: {
    addIdToken(state, action) {
      const newState = { ...state };
      newState.idToken = action.payload
      // state.idToken = action.payload;
      return newState;
    }
  }
});

export const { addIdToken } = currentUserSlice.actions;
export default currentUserSlice.reducer;