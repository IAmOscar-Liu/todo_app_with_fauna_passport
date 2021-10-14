import { ChakraProvider } from "@chakra-ui/react";
import { PageShell } from "../components/Layout/Pageshell";
import { SWRConfig } from "swr";
import axios from "axios";

// const httpLink = createHttpLink({
//   uri: "https://graphql.fauna.com/graphql", // "https://graphql.us.fauna.com/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_USER_KEY}`, // await extractAccessToken(ctx),
//     },
//   };
// });

// const client = new ApolloClient({//   link: authLink.concat(httpLink),
//   connectToDevTools: process.env.NODE_ENV === "development",
//   cache: new InMemoryCache(),
// });

axios.defaults.baseURL = "http://localhost:3000";

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          // dedupingInterval: 15000,
          fetcher: (url: string) =>
            axios(url).then((r) => ({ user: r.data?.user || null })),
        }}
      >
        <PageShell>
          <Component {...pageProps} />
        </PageShell>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
