import * as React from "react";
import { Button, Heading, HStack } from "@chakra-ui/react";
import ColorModeSwitcher from "./colorModeSwitcher/ColorModeSwitcher";
import Logo from "./logo/Logo";
import { RouterButton, RouterLink } from "../../../shared";
import { logoutThunk, selectAuthenticated, useAppDispatch, useAppSelector } from "../../../redux";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(selectAuthenticated);
  const handleLogout = () => dispatch(logoutThunk());
  return (
    <HStack alignSelf="start" justify="space-between">
      <HStack spacing={4}>
        <RouterLink to="/">
          <Logo h="2.5em" pointerEvents="none" />
        </RouterLink>
        <Heading as="h1" size="md" display={{ base: "none", md: "block" }}>
          Authentication demo
        </Heading>
      </HStack>
      <HStack>
        {authenticated ? (
          <>
            <RouterButton to="/dashboard" variant="ghost" size="sm">
              Dashboard
            </RouterButton>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <>
            <RouterButton to="/register" variant="ghost" size="sm">
              Register
            </RouterButton>
            <RouterButton to="/login" variant="ghost" size="sm">
              Login
            </RouterButton>
          </>
        )}

        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
};

export default Navbar;
