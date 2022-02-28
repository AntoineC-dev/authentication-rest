import * as React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SendEmailInput, sendEmailSchema } from "../../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { HookFormInput } from "../../../shared";
import { handleAxiosRequest, sendPasswordResetEmailRequest } from "../../../api";
import { selectUser, useAppSelector } from "../../../redux";

type PasswordResetEmailModalProps = {
  ctaLabel: string;
};

const PasswordResetEmailModal = (props: PasswordResetEmailModalProps) => {
  const user = useAppSelector(selectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, reset } = useForm<SendEmailInput>({
    defaultValues: { email: user?.email ?? "" },
    resolver: zodResolver(sendEmailSchema),
  });
  const onSubmit = async (data: SendEmailInput) => {
    await handleAxiosRequest(sendPasswordResetEmailRequest(data));
    reset();
    onClose();
  };
  return (
    <>
      <Button variant="link" size="sm" onClick={onOpen}>
        {props.ctaLabel}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send password reset email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HookFormInput control={control} name="email" type="email" />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Send email</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordResetEmailModal;
