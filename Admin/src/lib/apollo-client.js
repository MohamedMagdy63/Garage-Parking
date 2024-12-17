import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const createApolloClient = () => {
  const uri = process.env.NEXT_APP_API_URL
  const httpLink = createHttpLink({uri})
  const authLink = setContext((_,{headers})=>{
    return{
      headers:{
        ...headers,
        authorization: localStorage.getItem('Token') || ''
      }
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;