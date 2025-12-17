import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/rest/authApi";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: LoginPayload) => {
    const data = await loginApi(username, password);
    return data;
  }
);

// 🔥 Définition du type du state
interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;   // <-- accepte string OU null
}

// 🔥 initialState typé explicitement
const initialState: AuthState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.access = null;
      state.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;

        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Identifiants incorrects"; // ✔️ maintenant autorisé
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
