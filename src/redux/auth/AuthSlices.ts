import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "services/QuanLyNguoiDung";
import { login } from "model";
interface User {
  accessToken: string | null;
  avatar: string | null;
  email: string | null;
  id: string | null | number;
  name: string | null;
  phoneNumber: string | null;
}
interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: login, thunkAPI) => {
    try {
      const result = await auth.dangNhap(data);
      localStorage.setItem("token", result.data.content.accessToken);
      console.log(result);
      return result.data.content;
    } catch (error) {
      if (typeof error === "string") {
        // Handle string errors
        return thunkAPI.rejectWithValue(error);
      } else if (error instanceof Error) {
        // Handle Error objects
        return thunkAPI.rejectWithValue(error.message);
      } else {
        // Handle other unknown errors
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: any, thunkAPI) => {
    try {
      const result = await auth.dangKi(data);

      if (result.data.statusCode !== 200) {
        return thunkAPI.rejectWithValue(result.data.message);
      }

      return result.data.content;
    } catch (error) {
      if (typeof error === "string") {
        // Handle string errors
        return thunkAPI.rejectWithValue(error);
      } else if (error instanceof Error) {
        // Handle Error objects
        return thunkAPI.rejectWithValue(error.message);
      } else {
        // Handle other unknown errors
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.user = null;
      });
  },
});

export default authSlice.reducer;
