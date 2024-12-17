import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from '../lib/apollo-client'
const client = createApolloClient();

import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
