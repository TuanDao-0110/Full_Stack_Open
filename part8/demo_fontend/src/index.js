import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// import ws vs 
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})
// set up HTTP connection vs WebSocket connection to GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})
const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)
const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
},
  wsLink,
  authLink.concat(httpLink)
)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: authLink.concat(httpLink)
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

