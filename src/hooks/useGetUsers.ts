import { useGetUsersQuery } from "../store/usersApiSlice";

export const useGetUsers = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  return { data: data && data.length ? data : [], error, isLoading };
};
