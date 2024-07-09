import { useGetUserByIdQuery } from "../store/usersApiSlice";

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useGetUserByIdQuery(id);
  return { data, error, isLoading };
};
