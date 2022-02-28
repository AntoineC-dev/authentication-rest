import * as React from "react";
import { Button, Code, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { selectUser, useAppSelector } from "../../redux";
import { CenteredStack, PasswordResetEmailModal } from "../../components";
import { useUpdateUserForm } from "../../hooks";
import { HookFormInput } from "../../shared";

const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  const {
    methods: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
    onSubmit,
  } = useUpdateUserForm();
  return (
    <CenteredStack title="Dashboard">
      <Text fontSize="lg">
        Logged in user:{" "}
        <Code fontSize="inherit" fontWeight="semibold">
          {user?.username}
        </Code>
      </Text>
      <VStack as="form" w="100%" maxW="container.sm" onSubmit={handleSubmit(onSubmit)}>
        <HookFormInput control={control} name="username" />
        <HookFormInput control={control} name="email" type="email" />
        <HStack spacing={4} pt={2}>
          <Button type="submit" disabled={isSubmitting}>
            Update profile
          </Button>
          <PasswordResetEmailModal ctaLabel="Update  my password" />
        </HStack>
      </VStack>
      <Text>
        You can find the source code of this project and the API on{" "}
        <Link href="https://github.com/AntoineC-dev" textDecor="underline" textTransform="uppercase" isExternal>
          github
          <ExternalLinkIcon mx={1} mb={1} />
        </Link>
      </Text>
    </CenteredStack>
  );
};

export default DashboardPage;
