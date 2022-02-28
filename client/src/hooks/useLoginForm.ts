import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginThunk, useAppDispatch } from "../redux";
import { CreateSessionInput, createSessionSchema } from "../validators";

function useLoginForm() {
  const dispatch = useAppDispatch();
  const methods = useForm<CreateSessionInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(createSessionSchema),
    mode: "onChange",
  });
  const onSubmit = React.useCallback((data: CreateSessionInput) => dispatch(loginThunk(data)), [dispatch]);
  return { methods, onSubmit } as const;
}

export default useLoginForm;
