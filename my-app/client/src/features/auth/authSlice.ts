import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

// Define the user type
interface User {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Define the state type
interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get user from localStorage
const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

const initialState: AuthState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async Thunks
// Register user (dummy example; can be implemented similarly to loginUser)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      return await authService.loginUser(userData); // Replace with authService.register if implemented
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      return await authService.loginUser(userData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// Create Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Export actions and reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;