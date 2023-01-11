/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import React from 'react';
import {CreateListingForm} from '../../molecules/CreateListingForm/CreateListingForm';

type Props = {};

export function CreateListingModal({}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        loadingText="Submitting"
        onClick={onOpen}
        colorScheme={'purple'}
      >
        Rent your Crib
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent as={'nav'}>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateListingForm />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="purple" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
