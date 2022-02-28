import * as React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useController, UseControllerProps } from "react-hook-form";
import { EditIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";

type InputTypes = "text" | "email" | "password";

const renderInputIcon = (type: InputTypes) => {
  switch (type) {
    case "password":
      return <LockIcon />;
    case "email":
      return <EmailIcon />;
    case "text":
      return <EditIcon />;
  }
};

const ChakraInput = forwardRef(({ type, ...rest }, ref) => {
  const icon = renderInputIcon(type);
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={icon} />
      <Input ref={ref} type={type} autoComplete={type === "password" ? "on" : "off"} {...rest} />
    </InputGroup>
  );
});

type HookFormInputProps<T> = {
  label?: string;
  placeholder?: string;
  type?: InputTypes;
} & UseControllerProps<T>;

function HookFormInput<T>({ label, placeholder, type = "text", ...rest }: HookFormInputProps<T>) {
  const { field, fieldState } = useController(rest);
  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel htmlFor={field.name}>
        {label ?? `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`} :
      </FormLabel>
      <ChakraInput placeholder={placeholder ?? `Enter your ${field.name} here...`} type={type} {...field} />
      <FormErrorMessage>{fieldState.error && fieldState.error.message}</FormErrorMessage>
    </FormControl>
  );
}

export default HookFormInput;
