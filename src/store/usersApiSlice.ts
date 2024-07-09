// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  id: string;
  color: string;
  name: string;
};
type UsersApiResponse = User[];

export const USERS_TAG = "Users";

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "users" }),
  reducerPath: "usersApi",
  refetchOnMountOrArgChange: 30, // this is the most common cache timing adjustment
  tagTypes: [USERS_TAG], // Tag types are used for caching and invalidation.
  endpoints: (build) => ({
    getUsers: build.query<UsersApiResponse, void>({
      query: () => {
        return { url: `/` };
      },
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (_result, _error) => [{ type: USERS_TAG }],
    }),
  }),
});

// Hooks are auto-generated by RTK-Query
export const { useGetUsersQuery } = usersApiSlice;
