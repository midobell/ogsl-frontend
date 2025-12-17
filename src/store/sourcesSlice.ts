import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getSourcesApi } from "../api/rest/sourcesApi";
import { Source } from "../types"; // ⬅️ ASSURE-TOI QUE CE TYPE EXISTE

// --- Typage du state ---
interface SourcesState {
  items: Source[];
  loading: boolean;
  error: string | null;
}

const initialState: SourcesState = {
  items: [],
  loading: false,
  error: null,
};

// --- Thunk pour charger les sources ---
export const fetchSources = createAsyncThunk<Source[]>(
  "sources/fetchSources",
  async () => {
    const data = await getSourcesApi();
    return data;
  }
);

// --- Slice ---
const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSources.fulfilled,
        (state, action: PayloadAction<Source[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchSources.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement des sources";
      });
  },
});

export default sourcesSlice.reducer;
