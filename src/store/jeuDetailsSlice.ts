import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getJeuDetailsREST } from "../api/rest/jeuDetailsApi";
import { graphQLClient } from "../api/graphql/client";
import { GET_JEU_DETAILS } from "../api/graphql/queries";
import { Jeu } from "../types";

export const fetchJeuDetails = createAsyncThunk(
  "jeuDetails/fetch",
  async ({ id, mode }: { id: number; mode: "rest" | "graphql" }) => {

    if (mode === "graphql") {
      const res = await graphQLClient.query<{ jeu: Jeu }>({
        query: GET_JEU_DETAILS,
        variables: { id },
        fetchPolicy: "network-only"
      });

      if (!res.data || !res.data.jeu) {
        throw new Error("GraphQL: jeu introuvable");
      }

      return res.data.jeu;
    }

    return await getJeuDetailsREST(id);
  }
);


const jeuDetailsSlice = createSlice({
  name: "jeuDetails",
  initialState: { item: null as Jeu | null, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJeuDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJeuDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchJeuDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement du jeu";
      });
  },
});

export default jeuDetailsSlice.reducer;
