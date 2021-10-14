import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const hasuraGraphqlAPI = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

export const ApolloProviderWrapper = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const authMiddleware = setContext(async (req, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: ``,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: hasuraGraphqlAPI,
  });

  const apolloClient = new ApolloClient({
    // link: from([authMiddleware, httpLink]),
    uri: "https://graphql.us.fauna.com/graphql",
    credentials: "includes",
    connectToDevTools: process.env.NODE_ENV === "development",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            todos: {
              merge: false,
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
