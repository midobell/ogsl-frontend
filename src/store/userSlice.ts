import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateUserEmail, changePassword, UserProfile, UpdateEmailInput, ChangePasswordInput } from "../api/rest/userApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => await getUserProfile()
);

export const updateEmail = createAsyncThunk(
  "user/updateEmail",
  async (input: UpdateEmailInput) => await updateUserEmail(input)
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (input: ChangePasswordInput) => await changePassword(input)
);

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
        state.error = "Impossible de charger le profil.";
      })

      // update email
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // update password
      .addCase(updatePassword.rejected, (state) => {
        state.error = "Mot de passe invalide.";
      });
  },
});

export default userSlice.reducer;
