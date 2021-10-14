import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
};

export type Account = {
  __typename?: 'Account';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  email: Scalars['String'];
  profile_id?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

/** 'Account' input values */
export type AccountInput = {
  email: Scalars['String'];
  profile_id?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  completeTodo?: Maybe<Todo>;
  /** Create a new document in the collection of 'Account' */
  createAccount: Account;
  /** Create a new document in the collection of 'Todo' */
  createTodo: Todo;
  /** Delete an existing document in the collection of 'Account' */
  deleteAccount?: Maybe<Account>;
  deleteTodo?: Maybe<Todo>;
  login?: Maybe<UserInfo>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Account>;
  /** Update an existing document in the collection of 'Account' */
  updateAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'Todo' */
  updateTodo?: Maybe<Todo>;
};


export type MutationAddTodoArgs = {
  note: Scalars['String'];
  title: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCompleteTodoArgs = {
  id: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  data: AccountInput;
  id: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  data: TodoInput;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  GetAllCompletedTodoSortedByCreatedAt: QueryGetAllCompletedTodoSortedByCreatedAtPage;
  GetAllTodosSortedByCreatedAt: QueryGetAllTodosSortedByCreatedAtPage;
  allTodos: TodoPage;
  /** Find a document from the collection of 'Account' by its id. */
  findAccountByID?: Maybe<Account>;
  /** Find a document from the collection of 'Todo' by its id. */
  findTodoByID?: Maybe<Todo>;
};


export type QueryGetAllCompletedTodoSortedByCreatedAtArgs = {
  _cursor?: Maybe<Scalars['String']>;
  _size?: Maybe<Scalars['Int']>;
};


export type QueryGetAllTodosSortedByCreatedAtArgs = {
  _cursor?: Maybe<Scalars['String']>;
  _size?: Maybe<Scalars['Int']>;
};


export type QueryAllTodosArgs = {
  _cursor?: Maybe<Scalars['String']>;
  _size?: Maybe<Scalars['Int']>;
};


export type QueryFindAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};

/** The pagination object for elements of type 'Todo'. */
export type QueryGetAllCompletedTodoSortedByCreatedAtPage = {
  __typename?: 'QueryGetAllCompletedTodoSortedByCreatedAtPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Todo' in this page. */
  data: Array<Maybe<Todo>>;
};

/** The pagination object for elements of type 'Todo'. */
export type QueryGetAllTodosSortedByCreatedAtPage = {
  __typename?: 'QueryGetAllTodosSortedByCreatedAtPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Todo' in this page. */
  data: Array<Maybe<Todo>>;
};

export type Todo = {
  __typename?: 'Todo';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  completed: Scalars['Boolean'];
  created_at: Scalars['String'];
  note: Scalars['String'];
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['String']>;
  user_id: Scalars['String'];
};

/** 'Todo' input values */
export type TodoInput = {
  completed: Scalars['Boolean'];
  created_at: Scalars['String'];
  note: Scalars['String'];
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['String']>;
  user_id: Scalars['String'];
};

/** The pagination object for elements of type 'Todo'. */
export type TodoPage = {
  __typename?: 'TodoPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Todo' in this page. */
  data: Array<Maybe<Todo>>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  data?: Maybe<Account>;
  secret?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'UserInfo' and 'Account' using the field 'UserInfo.data'. */
export type UserInfoDataRelation = {
  /** Connect a document of type 'Account' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** Create a document of type 'Account' and associate it with the current document. */
  create?: Maybe<AccountInput>;
  /** If true, disconnects this document from 'Account' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

/** 'UserInfo' input values */
export type UserInfoInput = {
  data?: Maybe<Scalars['ID']>;
  secret?: Maybe<Scalars['String']>;
};

export type AddTodoMutationVariables = Exact<{
  user_id: Scalars['String'];
  title: Scalars['String'];
  note: Scalars['String'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo?: Maybe<{ __typename?: 'Todo', _id: string, user_id: string, title: string, note: string, created_at: string, updated_at?: Maybe<string>, completed: boolean }> };

export type CompleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
  user_id: Scalars['String'];
}>;


export type CompleteTodoMutation = { __typename?: 'Mutation', completeTodo?: Maybe<{ __typename?: 'Todo', _id: string, user_id: string, title: string, note: string, updated_at?: Maybe<string>, created_at: string, completed: boolean }> };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
  user_id: Scalars['String'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: Maybe<{ __typename?: 'Todo', _id: string }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'UserInfo', secret?: Maybe<string>, data?: Maybe<{ __typename?: 'Account', _id: string, userName: string, profile_id?: Maybe<string>, email: string }> }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: Maybe<boolean> };

export type RegisterMutationVariables = Exact<{
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'Account', _id: string, userName: string, profile_id?: Maybe<string>, email: string }> };

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTodosQuery = { __typename?: 'Query', GetAllTodosSortedByCreatedAt: { __typename?: 'QueryGetAllTodosSortedByCreatedAtPage', data: Array<Maybe<{ __typename?: 'Todo', _id: string, user_id: string, title: string, note: string, created_at: string, updated_at?: Maybe<string>, completed: boolean }>> } };

export type GetCompletedTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompletedTodosQuery = { __typename?: 'Query', GetAllCompletedTodoSortedByCreatedAt: { __typename?: 'QueryGetAllCompletedTodoSortedByCreatedAtPage', data: Array<Maybe<{ __typename?: 'Todo', _id: string, user_id: string, title: string, note: string, created_at: string, updated_at?: Maybe<string>, completed: boolean }>> } };


export const AddTodoDocument = gql`
    mutation AddTodo($user_id: String!, $title: String!, $note: String!) {
  addTodo(user_id: $user_id, title: $title, note: $note) {
    _id
    user_id
    title
    note
    created_at
    updated_at
    completed
  }
}
    `;
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      title: // value for 'title'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const CompleteTodoDocument = gql`
    mutation CompleteTodo($id: String!, $user_id: String!) {
  completeTodo(id: $id, user_id: $user_id) {
    _id
    user_id
    title
    note
    updated_at
    created_at
    completed
  }
}
    `;
export type CompleteTodoMutationFn = Apollo.MutationFunction<CompleteTodoMutation, CompleteTodoMutationVariables>;

/**
 * __useCompleteTodoMutation__
 *
 * To run a mutation, you first call `useCompleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTodoMutation, { data, loading, error }] = useCompleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useCompleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteTodoMutation, CompleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteTodoMutation, CompleteTodoMutationVariables>(CompleteTodoDocument, options);
      }
export type CompleteTodoMutationHookResult = ReturnType<typeof useCompleteTodoMutation>;
export type CompleteTodoMutationResult = Apollo.MutationResult<CompleteTodoMutation>;
export type CompleteTodoMutationOptions = Apollo.BaseMutationOptions<CompleteTodoMutation, CompleteTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: String!, $user_id: String!) {
  deleteTodo(id: $id, user_id: $user_id) {
    _id
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userName: String!, $email: String!, $password: String!) {
  register(userName: $userName, email: $email, password: $password) {
    _id
    userName
    profile_id
    email
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AllTodosDocument = gql`
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

/**
 * __useAllTodosQuery__
 *
 * To run a query within a React component, call `useAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTodosQuery(baseOptions?: Apollo.QueryHookOptions<AllTodosQuery, AllTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTodosQuery, AllTodosQueryVariables>(AllTodosDocument, options);
      }
export function useAllTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTodosQuery, AllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTodosQuery, AllTodosQueryVariables>(AllTodosDocument, options);
        }
export type AllTodosQueryHookResult = ReturnType<typeof useAllTodosQuery>;
export type AllTodosLazyQueryHookResult = ReturnType<typeof useAllTodosLazyQuery>;
export type AllTodosQueryResult = Apollo.QueryResult<AllTodosQuery, AllTodosQueryVariables>;
export const GetCompletedTodosDocument = gql`
    query GetCompletedTodos {
  GetAllCompletedTodoSortedByCreatedAt {
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

/**
 * __useGetCompletedTodosQuery__
 *
 * To run a query within a React component, call `useGetCompletedTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompletedTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompletedTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompletedTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetCompletedTodosQuery, GetCompletedTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompletedTodosQuery, GetCompletedTodosQueryVariables>(GetCompletedTodosDocument, options);
      }
export function useGetCompletedTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompletedTodosQuery, GetCompletedTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompletedTodosQuery, GetCompletedTodosQueryVariables>(GetCompletedTodosDocument, options);
        }
export type GetCompletedTodosQueryHookResult = ReturnType<typeof useGetCompletedTodosQuery>;
export type GetCompletedTodosLazyQueryHookResult = ReturnType<typeof useGetCompletedTodosLazyQuery>;
export type GetCompletedTodosQueryResult = Apollo.QueryResult<GetCompletedTodosQuery, GetCompletedTodosQueryVariables>;