import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "@/function/slice";

const store = configureStore({
  // reducer
  reducer: {
    currentUser: currentUserReducer
  }
});

export default store;