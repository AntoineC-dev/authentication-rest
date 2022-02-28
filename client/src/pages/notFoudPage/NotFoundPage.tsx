import * as React from "react";
import { Code, Image, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { RouterButton } from "../../shared";
import { page404 } from "../../assets";
import { CenteredStack } from "../../components";

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <CenteredStack title="Page not found">
      <Image src={page404} h="40vmin" />
      <Text fontSize="lg">
        The route <Code fontSize="xl">{location.pathname}</Code> does not exist.
      </Text>
      <RouterButton to="/">Go back to homepage</RouterButton>
    </CenteredStack>
  );
};

export default NotFoundPage;
