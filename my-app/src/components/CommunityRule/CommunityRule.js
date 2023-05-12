import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

export function CommunityRule(props) {
  const { agreeCommunityRule, setAgreeCommunityRule } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      {!agreeCommunityRule ? (
        <h3>
          <button onClick={onOpen}>
            <u>Community Guideline</u>
          </button>
        </h3>
      ) : (
        <h3>
          ✔
          <button onClick={onOpen}>
            <u>Community Guideline</u>
          </button>
        </h3>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Community Rule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Welcome!</p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                setAgreeCommunityRule(true);
                onClose();
              }}
            >
              Agree
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
