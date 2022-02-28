import * as React from "react";
import { Code, Image, Link, Text, VStack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { authentication } from "../../assets";
import { RouterButton } from "../../shared";
import { CenteredStack } from "../../components";

const Homepage = () => {
  return (
    <>
      <CenteredStack title="Hi, I am Antoine Cheminat">
        <Code fontSize="2xl" fontWeight="semibold" px={2}>
          Fullstack Developer
        </Code>
        <VStack spacing={4}>
          <Text>
            This React app works with an <Code>Express authentication API</Code>.
          </Text>
          <Text>
            You can find the source code of this project and the API on{" "}
            <Link href="https://github.com/AntoineC-dev" textDecor="underline" textTransform="uppercase" isExternal>
              github
              <ExternalLinkIcon mx={1} mb={1} />
            </Link>
          </Text>
          <Image src={authentication} w={{ base: "70vw", md: "50vmin" }} />
        </VStack>
      </CenteredStack>
      <RouterButton
        to="/register"
        variant="ghost"
        size="sm"
        rightIcon={<ChevronRightIcon boxSize={5} />}
        pos="fixed"
        bottom={3}
        right={6}
        textTransform="uppercase">
        Start process now
      </RouterButton>
    </>
  );
};

export default Homepage;
