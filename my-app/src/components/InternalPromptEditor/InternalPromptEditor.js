import React, { useEffect, useState } from "react";
import apiClient from "../../instance/config";
import { Button, Stack, Textarea, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function InternalPromptEditor(props) {
  const { promptContent, setPromptContent, havePrompt, promptid } = props;

  const handleChange = (textValue) => {
    setPromptContent(textValue.target.value);
  };

  const handleSubmit = async (e) => {
    await apiClient.put("/prompt");
  };

  return (
    <FormControl>
      <FormLabel htmlFor="edit-prompt">
        <Textarea
          defaultValue={havePrompt ? promptContent : "add a prompt for today"}
          onChange={(textValue) => handleChange(textValue)}
          value={promptContent}
          resize={"none"}
          errorBorderColor="red"
        />
        <FormHelperText>Edit or Set a Prompt for This Day</FormHelperText>

        <Button
          colorScheme="teal"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </FormLabel>
    </FormControl>
  );
}
