import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStatsApi } from "../api/rest/statsApi";
import { StatsJeux } from "../types";

// === Thunk pour charger les stats ===
export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async () => {
    const data = await getStatsApi();
    return data as StatsJeux;
  }
);

// === Typage du state ===
interface StatsState {
  data: StatsJeux | null;
  loading: boolean;
  error: string | null;
}

// === État initial bien typé ===
const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

// === Slice Redux ===
const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // OK maintenant
      })
      .addCase(fetchStats.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement des statistiques";
      });
  },
});

export default statsSlice.reducer;
