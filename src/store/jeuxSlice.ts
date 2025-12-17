import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getJeuxApi } from "../api/rest/jeuxApi";
import { createJeuGraphQL } from "../api/graphql/mutationsApi";
import { Jeu } from "../types";

// Filtres
interface JeuxFilters {
  search?: string;
  source?: string;
}

// Données pour création
interface CreateJeuInput {
  source_id: string;
  identifiant_permanent: string;
  titre: string;
  url_page?: string;
  date_publication?: string;
  auteurs?: string;
  personne_ressource?: string;
  description?: string;
  sujet?: string;
}

// ✔️ TYPE OBLIGATOIRE POUR CORRIGER LES ERREURS "never"
interface JeuxState {
  items: Jeu[];
  loading: boolean;
  error: string | null;
}

// ✔️ STATE TIPÉ → FINI LES ERREURS
const initialState: JeuxState = {
  items: [],
  loading: false,
  error: null,
};

// -----------------------------------
// ASYNC THUNKS
// -----------------------------------

export const fetchJeux = createAsyncThunk<Jeu[], JeuxFilters>(
  "jeux/fetchJeux",
  async (filters = {}) => {
    return await getJeuxApi(filters);
  }
);

export const createJeu = createAsyncThunk<Jeu, CreateJeuInput>(
  "jeux/createJeu",
  async (payload) => {
    return await createJeuGraphQL(payload);
  }
);

// -----------------------------------
// SLICE
// -----------------------------------

const jeuxSlice = createSlice({
  name: "jeux",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ------------------------
      // FETCH JEUX
      // ------------------------
      .addCase(fetchJeux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchJeux.fulfilled, (state, action: PayloadAction<Jeu[]>) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchJeux.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement des jeux";
      })

      // ------------------------
      // CREATE JEU
      // ------------------------
      .addCase(createJeu.fulfilled, (state, action: PayloadAction<Jeu>) => {
        state.items.push(action.payload);
      });
  },
});

export default jeuxSlice.reducer;
