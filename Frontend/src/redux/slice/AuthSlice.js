import { createSlice } from "@reduxjs/toolkit";

// initial state
const authSlice = createSlice({
  name: "auth", // it has to be unique
  initialState: {
    user: null,
  },
  //   1 Reducer
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // 2. logout
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

// export actions
export const { loginAction, logoutAction } = authSlice.actions;
// export reducer
const authReducer = authSlice.reducer;
export default authReducer;
