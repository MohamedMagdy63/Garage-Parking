
import "@/styles/globals.css";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import createApolloClient from '../lib/apollo-client'
import { IS_LOGGED_IN } from "@/gql/Query";

export default function App({ Component, pageProps }) {
  const cache = new InMemoryCache()
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data:{isLoggedIn : typeof window !== "undefined" && !!localStorage.getItem('Token')}
  })
  createApolloClient().onClearStore(()=>{
    createApolloClient().cache.writeQuery({
      query:gql`{
        isLoggedIn @client }
      `,
      data:{isLoggedIn : typeof window !== "undefined" && !!localStorage.getItem('Token')}
    })
  })
  return(
    <>
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
    </>

  )
}
