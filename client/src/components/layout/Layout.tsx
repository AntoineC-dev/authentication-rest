import * as React from "react";
import { Center, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useInitializeApp } from "../../hooks";

const Layout = () => {
  const isHealthy = useInitializeApp();
  return (
    <Grid minH="100vh" py={3} px={6}>
      {isHealthy ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Center>
          <VStack maxW="sm" textAlign="center" spacing={6}>
            <Heading size="2xl">Network error!</Heading>
            <Heading size="md">You are probably offline or our API is not currently available.</Heading>
            <Text>Please refresh this page or try again later.</Text>
          </VStack>
        </Center>
      )}
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "bottom-center",
        }}
      />
    </Grid>
  );
};

export default Layout;
