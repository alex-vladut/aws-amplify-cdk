import React, { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

export interface GrpahqlApiClientProviderProps {
  children: React.ReactNode;
}

export const GrpahqlApiClientProvider = ({
  children,
}: GrpahqlApiClientProviderProps) => {
  const client = useMemo(() => createApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

function createApolloClient() {
  const cache = new InMemoryCache({});
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      // TODO: send error to Sentry
      console.log({ graphQLErrors, networkError, operation });
      if (
        networkError &&
        'statusCode' in networkError &&
        networkError.statusCode === 401
      ) {
        cache.reset();
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`, networkError);
      }
    }
  );
  return new ApolloClient({
    link: ApolloLink.from([errorLink, new RetryLink()]),
    cache,
  });
}
