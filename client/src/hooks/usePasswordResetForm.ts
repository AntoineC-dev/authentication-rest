import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PasswordResetInput, passwordResetSchema } from "../validators";
import { passwordResetThunk, useAppDispatch } from "../redux";

function usePasswordResetForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const methods = useForm<PasswordResetInput>({
    defaultValues: { password: "" },
    resolver: zodResolver(passwordResetSchema),
    mode: "onChange",
  });
  const onSubmit = React.useCallback(
    async (data: PasswordResetInput) => {
      dispatch(passwordResetThunk({ password: data.password, passwordResetCode: String(params.passwordResetCode) }));
      navigate("/login");
    },
    [dispatch, navigate, params.passwordResetCode]
  );
  return { methods, onSubmit } as const;
}

export default usePasswordResetForm;
