import { User, useUpdateUserMutation } from "../store/usersApiSlice";

export const useEditUser = () => {
  const [updateUser, { isLoading, reset }] = useUpdateUserMutation();

  const editUser = async (userToEdit: User) => {
    if (!isLoading) {
      const user = { ...userToEdit };
      const name = user.name;
      const lastChar = name.charAt(name.length - 1);
      const counter = parseInt(lastChar);
      if (isNaN(counter)) {
        user.name += "-1";
      } else {
        user.name = `${name.slice(0, name.length - 2)}-${counter + 1}`;
      }
      await updateUser(user)
        .unwrap()
        .catch(() => {
          reset();
        });
    }
  };
  return { editUser, isSaving: isLoading };
};
