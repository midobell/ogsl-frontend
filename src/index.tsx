
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";


import { Provider } from "react-redux";
import { store } from "./store/store";
import { ApolloProvider } from "@apollo/client/react";
import { graphQLClient } from "./api/graphql/client";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={graphQLClient}>
        <BrowserRouter>   {/* ⬅️ ROUTER MANQUANT */}
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
