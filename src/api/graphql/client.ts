import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_BASE_URL}/graphql/`,
});

export const graphQLClient = new ApolloClient({
  link: httpLink,           // ⬅️ plus aucun header Authorization
  cache: new InMemoryCache(),
});
