import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

import { ApolloAuthProviderProps } from './types';

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URI, // your URI here...
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

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloAuthProvider;
