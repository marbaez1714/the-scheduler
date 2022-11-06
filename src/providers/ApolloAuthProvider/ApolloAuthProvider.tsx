import { useRef } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

import { ApolloAuthProviderProps } from './types';
import { removeTypenameFromMutation } from './utils';

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const client = useRef<ApolloClient<NormalizedCacheObject>>();

  const removeTypenameFromMutationLink = new ApolloLink(
    removeTypenameFromMutation
  );

  const batchHttpLink = new BatchHttpLink({
    uri: process.env.REACT_APP_API_URI,
    batchMax: 20,
    batchDebounce: true,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  if (!client.current) {
    client.current = new ApolloClient({
      link: from([authLink, removeTypenameFromMutationLink, batchHttpLink]),
      cache: new InMemoryCache(),
    });
  }

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

export default ApolloAuthProvider;
