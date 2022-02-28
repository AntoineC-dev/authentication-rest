import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

type RouterButtonProps = {
  to: string;
} & ButtonProps;

const RouterButton = ({ to, ...rest }: RouterButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const navigate = useNavigate();
  const onClick = () => navigate(to);
  return <Button isDisabled={isActive} onClick={onClick} {...rest} />;
};

export default RouterButton;
