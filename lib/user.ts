import { Account } from "../generated/graphql";
import { GraphQLClient, gql } from "graphql-request";

interface LoginInputProps {
  email: string;
  password: string;
}

interface RegisterInputProps extends LoginInputProps {
  userName: string;
}

interface CustomAccount extends Omit<Account, "_ts"> {
  _ts?: any;
}

interface CustomUserInfo {
  secret: string;
  data: CustomAccount;
}

export const getFaunadbAccountToken = async (url: string) => {
  const { user } = await fetch(url).then((res) => {
    if (res.status !== 200) {
      console.error("account token not found");
      return { user: null };
    }
    return res.json();
  });

  return (user && user.secret) || process.env.NEXT_PUBLIC_FAUNADB_USER_KEY;
};

const initGraphqlClient = (accessToken: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_FAUDADB_GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

export const registerUser = async ({
  userName,
  email,
  password,
}: RegisterInputProps) => {
  try {
    const graphQLClient = initGraphqlClient(
      process.env.NEXT_PUBLIC_FAUNADB_USER_KEY
    );

    const query = gql`
      mutation Register(
        $userName: String!
        $email: String!
        $password: String!
      ) {
        register(userName: $userName, email: $email, password: $password) {
          _id
          userName
          profile_id
          email
        }
      }
    `;

    return await graphQLClient.request<CustomAccount>(query, {
      userName,
      email,
      password,
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const loginUser = async ({ email, password }: LoginInputProps) => {
  try {
    const graphQLClient = initGraphqlClient(
      process.env.NEXT_PUBLIC_FAUNADB_USER_KEY
    );

    const query = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          secret
          data {
            _id
            userName
            profile_id
            email
          }
        }
      }
    `;

    return await graphQLClient.request<CustomUserInfo>(query, {
      email,
      password,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logoutUser = async (userSecret: string) => {
  try {
    const graphQLClient = initGraphqlClient(userSecret);
    const query = gql`
      mutation Logout {
        logout
      }
    `;
    await graphQLClient.request(query);
  } catch (error) {
    console.error(error);
  }
};
