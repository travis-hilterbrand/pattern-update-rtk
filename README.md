# Pattern - Efficient queries (RTK)

This reworks the pattern-query-rtk example to include model updating.

## Overview

It is common in applications to have multiple sources of truth. The selectable banner across the top is filled from the users API. Individual users are selected by clicking on a user which triggers a fetch from the user API. Typically, the user API will contain detailed information not present for the user in the list API.

Clicking on the user will update a counter applied to the name.

## useEditUser custom hook

As with the pattern-query examples, the only meaningful difference between react-update (uses react-query) and react-update-rtk (uses rtk-query) is the custom hook `useEditUser`. Of course, the rtk example also includes some slice-specific changes. However, the components are identical.

## Updates

Mutation endpoints are defined by returning an object inside the endpoints section of createApi, and defining the fields using the build.mutation() method.

## Tags

RTK Query uses a "cache tag" system to automate re-fetching for query endpoints that have data affected by mutation endpoints. This enables designing your API such that firing a specific mutation will cause a certain query endpoint to consider its cached data invalid, and re-fetch the data if there is an active subscription.

The tag system is fairly complicated and is easy to make mistakes. A full reference is discussed here (<https://redux-toolkit.js.org/rtk-query/usage/automated-refetching).

## Pessimistic update

The Pessimistic approach updates the UI once the API call is completed and the data or state has been confirmed. This approach prioritizes consistency and reliability over instant feedback to the user.

To perform an update, the slice defines an endpoint and which tags will be invalidated on success.

```typescript
updateUser: build.mutation<UserApiResponse, User>({
  query: ({ id, ...rest }) => ({
    url: `/${id}`,
    method: "PUT",
    body: rest,
  }),
  invalidatesTags: (_result, _error, user) => [
    { type: USERS_TAG, id: user.id },
    { type: USERS_TAG },
  ],
}),
```

which is used in the edit hook:

```typescript
  const [updateUser, { isLoading, reset }] = useUpdateUserMutation();
```

https://redux-toolkit.js.org/rtk-query/usage/mutations

## Optmistic updates

In the Optimistic approach, the UI is updated immediately with the new data or state before the API call is completed. This approach prioritizes instant feedback to the user over consistency and reliability.

Optmistic updates are more complex. The endpoint is updated to include an `onQueryStarted` call which updates the cache before the API call is made.

```typescript
updateUser: build.mutation<UserApiResponse, User>({
  query: ({ id, ...rest }) => ({
    url: `/${id}`,
    method: "PUT",
    body: rest,
  }),
  invalidatesTags: (_result, _error, user) => [
    { type: USERS_TAG, id: user.id },
    { type: USERS_TAG },
  ],
  async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
    const result = dispatch(
      usersApiSlice.util.updateQueryData(
        "getUserById",
        newUser.id,
        (draft) => {
          return { ...draft, ...newUser };
        }
      )
    );
    queryFulfilled.catch(result.undo);
  },
}),
```

> IMPORTANT NOTE

For simplicity/ robustness, this project uses a mocked API that is enabled with `mock service worker` https://mswjs.io/.