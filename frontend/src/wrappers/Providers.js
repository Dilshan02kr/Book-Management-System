'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apolloClient';
import { CssBaseline } from '@mui/material';

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      {children}
    </ApolloProvider>
  );
}
