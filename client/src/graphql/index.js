import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const wsLink = new GraphQLWsLink(
    createClient({
      url: `wss://${process.env.REACT_APP_SERVER_URL}/graphql`,
    }),
  );
  
  const httpLink = createHttpLink({
    uri: `https://${process.env.REACT_APP_SERVER_URL}/graphql`
  })
  
  const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('userToken');
    return {
      headers: {
        ...headers,
        authorization: token || ""
      }
    }
  })
  
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );
  
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  export default client;