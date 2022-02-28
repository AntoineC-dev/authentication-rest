import * as React from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { HookFormInput, RouterLink } from "../../shared";
import { useRegisterForm } from "../../hooks";
import { CenteredStack } from "../../components";

function RegisterPage() {
  const {
    methods: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
    onSubmit,
  } = useRegisterForm();
  return (
    <CenteredStack title="Create a new account">
      <Text>You need an account to access our app. We will never share your data.</Text>
      <VStack as="form" w="100%" maxW="container.sm" onSubmit={handleSubmit(onSubmit)}>
        <HookFormInput control={control} name="username" />
        <HookFormInput control={control} name="email" type="email" />
        <HookFormInput control={control} name="password" type="password" />
        <HookFormInput
          control={control}
          name="passwordConfirmation"
          type="password"
          label="Password confirmation"
          placeholder="Confirm your password here..."
        />
        <Box pt={2}>
          <Button type="submit" disabled={isSubmitting}>
            Create account
          </Button>
        </Box>
      </VStack>
      <Text>
        Already have an account?{" "}
        <RouterLink to="/login" textDecor="underline">
          Login now
        </RouterLink>
      </Text>
    </CenteredStack>
  );
}

export default RegisterPage;
