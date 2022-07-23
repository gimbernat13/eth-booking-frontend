import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { CreateListingForm } from "../../molecules/CreateListingForm/CreateListingForm";

type Props = {
  submit: ( ) => void;
};

export function CreateListingModal({submit} : Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        // width={"100%"}
        // isLoading
        loadingText="Submitting"
        colorScheme="purple"
        variant="outline"
      >
        Create a new Listing
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List a new property: </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateListingForm submit={submit} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
