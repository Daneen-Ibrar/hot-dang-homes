import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL, // Use the public environment variable
    credentials: 'same-origin', // Adjust based on your CORS policy
  }),
  cache: new InMemoryCache(),
  errorPolicy: "all",
});

export default client;
