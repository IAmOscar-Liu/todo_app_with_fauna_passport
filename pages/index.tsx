import { gql } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { AddTodo } from "../components/Todo/AddTodo";
import { Todos } from "../components/Todo/Todos";
import { useUser } from "../lib/hooks";
import { getStandAloneApolloClient, withApollo } from "../utils/withApollo";
import { AllTodosDocument } from "../generated/graphql";

const AllTodoQuery = gql`
  query AllTodos {
    GetAllTodosSortedByCreatedAt {
      data {
        _id
        user_id
        title
        note
        created_at
        updated_at
        completed
      }
    }
  }
`;

const Home = () => {
  const user = useUser();

  return (
    <Box as="section" py="12">
      <Box
        maxW="xl"
        mx="auto"
        width="full"
        px={{
          base: "6",
          md: "8",
        }}
      >
        <Heading size="lg" mb="8" fontWeight="extrabold">
          {user ? "Things you gotta do!" : "Please login!"}
        </Heading>
        {user ? <AddTodo /> : <h2>Login to add new todo</h2>}
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
        <Todos />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = await getStandAloneApolloClient();
  await client.query({
    // query: AllTodoQuery,
    query: AllTodosDocument,
  });

  return {
    revalidate: 10,
    props: { apolloState: client.cache.extract() },
  };
};

// export default Home;
export default withApollo({ ssr: false })(Home);
