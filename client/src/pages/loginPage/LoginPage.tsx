import * as React from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { HookFormInput, RouterLink } from "../../shared";
import { useLoginForm, useVerifyUserEffect } from "../../hooks";
import { CenteredStack, PasswordResetEmailModal, VerificationEmailModal } from "../../components";

function RegisterPage() {
  useVerifyUserEffect(); // Read params and send verifyUserRequest
  const {
    methods: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
    onSubmit,
  } = useLoginForm();
  return (
    <CenteredStack title="Login to your account">
      <Text>
        You did not receive your verification email?&nbsp;&nbsp;
        <VerificationEmailModal />
      </Text>

      <VStack as="form" w="100%" maxW="container.sm" onSubmit={handleSubmit(onSubmit)}>
        <HookFormInput control={control} name="email" type="email" />
        <HookFormInput control={control} name="password" type="password" />
        <HStack spacing={4} pt={2}>
          <Button type="submit" disabled={isSubmitting}>
            Go to dashboard
          </Button>
          <PasswordResetEmailModal ctaLabel="Forgot password?" />
        </HStack>
      </VStack>
      <Text>
        No account yet?{" "}
        <RouterLink to="/register" textDecor="underline">
          Create new account
        </RouterLink>
      </Text>
    </CenteredStack>
  );
}

export default RegisterPage;
