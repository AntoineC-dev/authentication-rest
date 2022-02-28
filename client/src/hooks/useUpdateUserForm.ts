import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { selectUser, updateUserThunk, useAppDispatch, useAppSelector } from "../redux";
import { UpdateUserInput, updateUserSchema } from "../validators";

function useUpdateUserForm() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const methods = useForm<UpdateUserInput>({
    defaultValues: {
      email: user!.email,
      username: user!.username,
    },
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
  });
  const onSubmit = React.useCallback(
    async (data: UpdateUserInput) => {
      if (data.email === user!.email && data.username === user!.username) return;
      dispatch(updateUserThunk(data));
    },
    [dispatch, user]
  );
  return { methods, onSubmit } as const;
}

export default useUpdateUserForm;
