import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFichiersApi } from "../api/rest/fichiersApi";
import { Fichier } from "../types";   // 🔥 Assure-toi que ce type existe

// -------------------------
// Typage du payload
// -------------------------
export const fetchFichiers = createAsyncThunk<Fichier[]>(
  "fichiers/fetchFichiers",
  async () => {
    const data = await getFichiersApi();
    return data;
  }
);

// -------------------------
// Typage du state
// -------------------------
interface FichiersState {
  items: Fichier[];
  loading: boolean;
  error: string | null;
}

// -------------------------
// initialState typé
// -------------------------
const initialState: FichiersState = {
  items: [],
  loading: false,
  error: null,
};

// -------------------------
// Slice
// -------------------------
const fichiersSlice = createSlice({
  name: "fichiers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFichiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFichiers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // 🔥 Maintenant Fichier[] OK
      })
      .addCase(fetchFichiers.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement des fichiers";
      });
  },
});

export default fichiersSlice.reducer;
