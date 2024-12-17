import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const createApolloClient = () => {
  return new ApolloClient({
    link: createUploadLink({
      uri: process.env.NEXT_APP_API_URL,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;