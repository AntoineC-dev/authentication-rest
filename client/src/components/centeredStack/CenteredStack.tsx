import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

type CenteredStackProps = {
  title: string;
};

const CenteredStack: React.FC<CenteredStackProps> = ({ title, children }) => {
  return (
    <VStack spacing={8} textAlign="center" my={16}>
      <Heading as="h2" size="2xl">
        {title}
      </Heading>
      {children}
    </VStack>
  );
};

export default CenteredStack;
