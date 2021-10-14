import { Box, Heading } from "@chakra-ui/react";
import { AddTodo } from "../components/Todo/AddTodo";
import { Todos } from "../components/Todo/Todos";
import { useUser } from "../lib/hooks";
import { withApollo } from "../utils/withApollo";

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
        {user && (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        ) }
        <Todos />
      </Box>
    </Box>
  );
};

// export default Home;
export default withApollo({ ssr: true })(Home);
