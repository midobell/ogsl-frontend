import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sourcesReducer from "./sourcesSlice";
import jeuxReducer from "./jeuxSlice";
import fichiersReducer from "./fichiersSlice";
import statsReducer from "./statsSlice";
import jeuDetailsReducer from "./jeuDetailsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sources: sourcesReducer,
    jeux: jeuxReducer,
    fichiers: fichiersReducer,
    stats: statsReducer,
    jeuDetails: jeuDetailsReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
