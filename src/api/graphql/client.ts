import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/",
});

export const graphQLClient = new ApolloClient({
  link: httpLink,           // ⬅️ plus aucun header Authorization
  cache: new InMemoryCache(),
});
