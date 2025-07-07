import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://localhost:3000/graphql',
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
