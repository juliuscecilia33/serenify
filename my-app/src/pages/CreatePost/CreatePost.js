import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import "./CreatePost.css";
import { Button, Stack, Textarea, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function CreatePost(props) {
  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const defaultHelperText = "Share your thoughts~~~";
  const [helperText, setHelperText] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [isValid, setIsVaild] = useState(true);
  const toast = useToast();
  //const [toastText, setToastText] = useState("Successfully Post~^_^~");
  const maxLength = 500;
  //   const [userid, setUserid] = useState();

  const handleChange = (textValue) => {
    setPostDescription(textValue.target.value);
    if (textValue.target.value.length <= maxLength) {
      setIsVaild(true);
      setHelperText(defaultHelperText);
      setWordCount(textValue.target.value);
    } else {
      setIsVaild(false);
      setHelperText("Exceeded Character Limitation T_T");
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        // 👇️ call submit function here
        handleSubmit();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      if (isValid) {
        await apiClient
          .post("/posts/create", {
            postDescription: postDescription,
            attachment: attachment,
            userid: props.userid,
            promptid: props.promptid,
          })
          .then((response) => {
            toast({
              title: "Account created.",
              description: response,
              status: "success",
              duration: 2500,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.err(err.message);
          });
      } else {
        toast({
          title: "error message",
          description: helperText,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container">
        <FormControl>
          <FormLabel htmlFor="your-thought">
            <Textarea
              placeholder="Leave your thoughts here.."
              onChange={handleChange}
              value={postDescription}
              resize={"none"}
              //isDisabled={!isValid}
            />
            <div>{`characters: ${wordCount.length}/${maxLength}`}</div>
            {isValid ? (
              <FormHelperText id="your-thought-hepler">
                {helperText}
              </FormHelperText>
            ) : (
              <FormErrorMessage>{helperText}</FormErrorMessage>
            )}
            <Button onSubmit={handleSubmit}>
              <ArrowForwardIcon />
            </Button>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}
// {
//   /* <TextField
//           type="text"
//           color="primary"
//           minRows={2}
//           multiline
//           placeholder="Leave Your Thoughts Here..."
//           label="Your Thoughts~"
//           size="lg"
//           value={postDescription}
//           onChange={handleChange}
//         /> */
// }
// {
//   /* <FormHelperText>This is a helper text.</FormHelperText> */
// }
// {
//   /* <Textarea
//             color="primary"
//             minRows={2}
//             multiline
//             placeholder="Leave Your Thoughts Here..."
//             size="lg"
//             variant="plain"
//             value={postDescription}
//             onChange={handleChange}
//             endDecorator={
//             <Typography level="body3" sx={{ ml: 'auto' }}>
//               {`${wordCount.length}/${maxLength}`}
//             </Typography>
//               }
//           /> */
// }
// {
//   /* <Grid>
//               <Textarea
//                 label="Create Post"
//                 minRows={8}
//                 fullWidth="true"
//                 placeholder="Leave your thoughts here.."
//                 onChange={handleChange}
//                 value={postDescription}
//                 helperText={helperText}
//                 animated="true"
//                 shadow="true"
//                 bordered="true"
//                 borderWeight="light"
//               />
//                <div>{`characters: ${wordCount.length}/${maxLength}`}</div>
//           </Grid> */
// }

// {
//   /* <Typography variant="caption">{`${wordCount.length}/${maxLength}`}</Typography> */
// }
