import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null,
    status: STATUS.IDLE,
  },
  reducers: {
    setActiveUser(state, action) {
      const { email, userName, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
    removeActiveUser(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {setStatus, setActiveUser, removeActiveUser } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;
