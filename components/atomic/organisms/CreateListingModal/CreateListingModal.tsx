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

type Props = {};

export function CreateListingModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  let [value, setValue] = React.useState("");

  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

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
            <FormControl>
              <FormLabel>Listing name</FormLabel>
              <Input
                colorScheme={"purple"}
                ref={initialRef}
                placeholder="First name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cost per Night</FormLabel>
              <Input
                colorScheme={"purple"}
                type="number"
                ref={initialRef}
                placeholder="Cost"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder="Here is a sample placeholder"
                size="sm"
              />{" "}
            </FormControl>
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
