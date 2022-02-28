import * as React from "react";
import { EmailIcon } from "@chakra-ui/icons";
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
import { handleAxiosRequest, sendVerificationEmailRequest } from "../../../api";

const VerificationEmailModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, reset } = useForm<SendEmailInput>({
    defaultValues: { email: "" },
    resolver: zodResolver(sendEmailSchema),
  });
  const onSubmit = async (data: SendEmailInput) => {
    await handleAxiosRequest(sendVerificationEmailRequest(data));
    reset();
    onClose();
  };
  return (
    <>
      <Button variant="outline" size="sm" onClick={onOpen} rightIcon={<EmailIcon />}>
        Send Again
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send verification email</ModalHeader>
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

export default VerificationEmailModal;
