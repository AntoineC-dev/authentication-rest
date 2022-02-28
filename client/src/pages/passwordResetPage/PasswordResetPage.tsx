import * as React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { HookFormInput } from "../../shared";
import { usePasswordResetForm } from "../../hooks";
import { CenteredStack } from "../../components";

function PasswordResetPage() {
  const {
    methods: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
    onSubmit,
  } = usePasswordResetForm();
  return (
    <CenteredStack title="Choose your new password">
      <VStack as="form" w="100%" maxW="container.sm" onSubmit={handleSubmit(onSubmit)}>
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
            Change password
          </Button>
        </Box>
      </VStack>
    </CenteredStack>
  );
}

export default PasswordResetPage;
