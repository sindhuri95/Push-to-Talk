
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [initialGreeting, setInitialGreeting] = useState('');

  return (
    <Modal isOpen={open} onClose={() => onOpenChange(false)}>
      <ModalOverlay />
      <ModalContent maxW="425px">
        <ModalHeader>Translation Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={4} color="gray.600">
            Configure your translation preferences
          </Text>
          
          <FormControl mt={4}>
            <FormLabel>Initial Greeting</FormLabel>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Enter a custom greeting or introduction for the session
            </Text>
            <Textarea
              value={initialGreeting}
              onChange={(e) => setInitialGreeting(e.target.value)}
              placeholder="E.g., I am a nurse visiting John who only speaks Spanish. Greet the patient and ask how he has been feeling for the past week."
              resize="none"
              rows={4}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsDialog;
