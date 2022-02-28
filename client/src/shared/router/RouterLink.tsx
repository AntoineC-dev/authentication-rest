import * as React from "react";
import { Link, LinkProps } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type RouterLinkProps = {
  to: string;
} & LinkProps;

const RouterLink = (props: RouterLinkProps) => {
  return <Link as={ReactRouterLink} {...props} />;
};

export default RouterLink;
