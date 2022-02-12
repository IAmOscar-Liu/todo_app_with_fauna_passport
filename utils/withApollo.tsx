import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "isomorphic-fetch";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";
import { getLoginSession } from "../lib/auth";
import { getFaunadbAccountToken } from "../lib/user";

export const getStandAloneApolloClient = async () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_FAUDADB_GRAPHQL_ENDPOINT,
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_USER_KEY}`,
    },
    cache: new InMemoryCache(),
  });
};

const createClient = (ctx: NextPageContext) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_FAUDADB_GRAPHQL_ENDPOINT, // "https://graphql.us.fauna.com/graphql",
    // credentials: "include",
  });

  const authLink = new ApolloLink((async (operation, forward) => {
    const getFaunadbAccessToken = async () => {
      try {
        if (typeof window === "undefined") {
          // server side
          console.log("get accessToken on server");
          const session = await getLoginSession(ctx.req);
          console.log(`accessToken: ${session && session.secret}`);
          return (
            (session && session.secret) ||
            process.env.NEXT_PUBLIC_FAUNADB_USER_KEY
          );
        } else {
          // client side
          console.log("get accessToken on client");
          return await getFaunadbAccountToken("/api/user");
        }
      } catch (e) {
        console.log("Error");
        console.log(e);
        return process.env.NEXT_PUBLIC_FAUNADB_USER_KEY;
      }
    };

    // if (typeof window === "undefined") {
    operation.setContext({
      headers: {
        authorization: `Bearer ${await getFaunadbAccessToken()}`,
      },
    });
    // }
    return forward(operation);
  }) as any);

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    connectToDevTools: process.env.NODE_ENV === "development",
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
