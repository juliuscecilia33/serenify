import React, { useState, useEffect } from "react";
import apiClient from "../../instance/config";
import { UploadAttachment } from "../../firebase/upload";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig/firebaseConfig";
import "./CreatePost.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  Stack,
  AspectRatio,
  CloseButton,
  ButtonGroup,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

export function CreatePost({
  promptid,
  showPencil,
  setShowPencil,
  postSubmitted,
  setPostSubmitted,
}) {
  const asciiEmojis = [
    "",
    "(ㆆ _ ㆆ)  -  Feeling Afraid",
    "•`_´•  -  Feeling Angry",
    "•͡˘㇁•͡˘  - Feeling Awkward",
    "(˵ ͡° ͜ʖ ͡°˵)  - Feeling Blush",
    "(-_-)  -  Feeling Bored",
    "※(^o^)/※  -  Feeling Cheerful",
    "(｡◕‿‿◕｡)  -  Feeling Cute",
    "ᕕ(⌐■_■)ᕗ ♪♬  -  Dance!",
    "<(^_^)>  -  Feeling Dope",
    "¯(°_o)/¯  - Feeling Dunno",
    "(҂◡_◡) ᕤ  -  Endure",
    "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  -  Feeling Excited",
    "(－‸ლ)  -  Face Palm",
    "(^-^)/  -  Feeling Grateful",
    "( ´◔ ω◔`) ノシ  -  Greetings",
    "٩(^‿^)۶  -  Feeling Happy",
    "(°Ω°)/  -  Help",
    "(づ｡◕‿‿◕｡)づ  -  Hug",
    "(˶‾᷄ ⁻̫ ‾᷅˵)  -  Feeling Pleased",
    "♥‿♥  -  Love",
    "t(ಠ益ಠt)  -  Feeling Mad",
    "ε(´סּ︵סּ`)з  -  Feeling Sad",
    "(๑•́ ヮ •̀๑)  -  Feeling Surprised",
    "(๑•̀ㅂ•́)ง✧  -  Feeling Victory",
  ];

  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState("");
  const [helperText, setHelperText] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [isValid, setIsVaild] = useState(false);
  const [moreThan500, setMoreThan500] = useState(false);
  const toast = useToast();
  const [currentAsciiMood, setCurrentAsciiMood] = useState(asciiEmojis[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVideo, setIsVideo] = useState(false);

  const maxLength = 500;

  //   const [userid, setUserid] = useState();

  const handleChange = (textValue) => {
    setPostDescription(textValue.target.value);
    if (textValue.target.value.length <= maxLength) {
      setIsVaild(true);
      if (textValue.target.value.length === maxLength) {
        setHelperText("No more Characters~~~");
      }
      setWordCount(textValue.target.value);
      setMoreThan500(false);
    } else {
      setIsVaild(false);
      setHelperText("Exceeded Character Limitation T_T");
      setMoreThan500(true);
      toast({
        title: "oops *_*",
        description: "Exceeded Character Limitation T_T",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (attachment !== "") {
      setIsVaild(true);
      // setHelperText(defaultHelperText);
      setMoreThan500(false);
    }
  }, [attachment]);

  const keyDownHandler = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (isValid) {
        await apiClient
          .post("/posts/create", {
            postDescription: postDescription,
            attachment: attachment,
            userid: localStorage.getItem("userid"),
            promptid: promptid,
            ascii_mood: currentAsciiMood !== "" ? currentAsciiMood : null,
            isvideo: isVideo,
          })
          .then((response) => {
            console.log("response successful: ", response);
          })
          .catch((error) => {
            console.error("error from handle submit: ", error.message);
          });

        toast({
          title: "Yeah, a new post ※(^o^)/※",
          description: "Your post was successfully posted!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setShowPencil(true);
        setPostSubmitted(!postSubmitted);
      } else {
        if (postDescription.length < 1 && attachment === "") {
          setHelperText("No Empty Post...T_T");
          toast({
            title: "Oops",
            description: "No Empty Post...T_T",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseButton = (e) => {
    const deleteAttachment = ref(storage, attachment);

    deleteObject(deleteAttachment)
      .then(() => {
        setAttachment("");
        console.log("successfully delete");
      })
      .catch((error) => {
        console.err(error);
      });
  };

  const handleBackButton = (e) => {
    setShowPencil(true);
  };

  return (
    <div>
      <div className="container flex">
        <FormControl isInvalid={isValid} onKeyPress={keyDownHandler}>
          {/* <FormLabel htmlFor="edit-prompt">
            Leave Your Thoughts here...
          </FormLabel> */}
          <textarea
            placeholder="Leave your thoughts here..."
            onChange={(textValue) => handleChange(textValue)}
            value={postDescription}
            resize={"none"}
            className="post-input"
          />
          <span
            className="character-limit"
            style={{ color: moreThan500 ? "red" : "" }}
          >
            {`Characters: ${wordCount.length}/${maxLength}`}
          </span>

          {isValid ? (
            <FormHelperText>{helperText}</FormHelperText>
          ) : (
            <FormErrorMessage>{helperText}</FormErrorMessage>
          )}
          {!attachment ? (
            <UploadAttachment
              attachment={attachment}
              setAttachment={setAttachment}
              setIsVideo={setIsVideo}
            />
          ) : (
            <Stack>
              <CloseButton
                size="sm"
                onClick={(e) => {
                  handleCloseButton(e);
                }}
              />
              <AspectRatio maxW="400px" ratio={1}>
                <iframe
                  src={attachment}
                  alt="user post image"
                  objectFit="cover"
                  title="post-attachment"
                />
              </AspectRatio>
            </Stack>
          )}
          <div className="select-mood">
            <h1 className="upload-text">Select a Mood</h1>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {currentAsciiMood}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Mood: ">
                  {asciiEmojis.map((emoji, id) => (
                    <>
                      <MenuItem
                        onClick={() => setCurrentAsciiMood(emoji)}
                        key={id}
                      >
                        {emoji}
                      </MenuItem>
                    </>
                  ))}
                </MenuGroup>
              </MenuList>
            </Menu>
          </div>
          <ButtonGroup marginTop={10} gap="2">
            <button className="discard" onClick={onOpen}>
              Discard
            </button>
            <button
              className="post-send"
              onClick={(e) => {
                handleSubmit(e);
              }}
              disabled={attachment === "" && postDescription.length < 1}
            >
              Post
            </button>
          </ButtonGroup>

          <>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Discard Your Post
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to discard?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      colorScheme="red"
                      onClick={(e) => {
                        handleBackButton(e);
                        onClose();
                      }}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        </FormControl>
      </div>
    </div>
  );
}
