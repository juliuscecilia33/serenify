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
            <div>
              1. Be respectful of others’ cultures, experiences, and opinions.
            </div>
            <div>
              2. No inappropriate content or language (cursing, inflammatory
              words, negative language).
            </div>
            <div>
              3. Do not encourage or propagate methods of injurious and/or
              negative coping mechanisms (self harm, substance abuse, suicide,
              etc.).
            </div>
            <div>
              4. Promote a supportive environment and healthy community for
              people to share their feelings/experiences.
            </div>
            <div>
              5. No unauthorized advertising campaigns or other promotions.{" "}
            </div>
            <div>
              6. Stay on the topic of the discussion page andstay away from
              heated political discussion or other sensitive topics.{" "}
            </div>
            <div>
              7. Do not disclose any private information (name, social media
              handles, phone number, home address, etc.) in posts.{" "}
            </div>
            <div>
              {" "}
              8. We encourage you to speak freely as your privacy is guaranteed.{" "}
            </div>
            <div>
              9.Please report anything that contradicts these community
              guidelines.
            </div>
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
