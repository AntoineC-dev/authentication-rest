import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserRequest, handleAxiosRequest } from "../api";
import { CreateUserInput, createUserSchema } from "../validators";

function useRegisterForm() {
  const navigate = useNavigate();
  const methods = useForm<CreateUserInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });
  const onSubmit = React.useCallback(
    async (data: CreateUserInput) => {
      const success = await handleAxiosRequest(createUserRequest(data));
      if (success) navigate("/login");
    },
    [navigate]
  );
  return { methods, onSubmit } as const;
}

export default useRegisterForm;
