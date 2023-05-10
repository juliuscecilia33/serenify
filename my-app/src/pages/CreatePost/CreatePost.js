import React, { useState, useEffect } from "react";
import apiClient from "../../instance/config";
import { UploadAttachment } from "../../firebase/upload";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig/firebaseConfig";
import "./CreatePost.css";
import {
  Button,
  Stack,
  Textarea,
  AspectRatio,
  Image,
  CloseButton,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

export function CreatePost({
  promptid,
  showPencil,
  setShowPencil,
  postSubmitted,
  setPostSubmitted,
}) {
  const asciiEmojis = [
    "(ㆆ _ ㆆ)  -  Afraid",
    "•`_´•  -  Angry",
    "•͡˘㇁•͡˘  -  Awkward",
    "(˵ ͡° ͜ʖ ͡°˵)  -  Blush",
    "(-_-)  -  Bored",
    "※(^o^)/※  -  Cheer",
    "(｡◕‿‿◕｡)  -  Cute",
    "ᕕ(⌐■_■)ᕗ ♪♬  -  Dance",
    "<(^_^)>  -  Dope",
    "¯(°_o)/¯  -  Dunno",
    "(҂◡_◡) ᕤ  -  Endure",
    "(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  -  Excited",
    "(－‸ლ)  -  Face Palm",
    "(^-^)/  -  Grateful",
    "( ´◔ ω◔`) ノシ  -  Greetings",
    "٩(^‿^)۶  -  Happy",
    "(°Ω°)/  -  Help",
    "(づ｡◕‿‿◕｡)づ  -  Hug",
    "(˶‾᷄ ⁻̫ ‾᷅˵)  -  Pleased",
    "♥‿♥  -  Love",
    "t(ಠ益ಠt)  -  Mad",
    "ε(´סּ︵סּ`)з  -  Sad",
    "(๑•́ ヮ •̀๑)  -  Surprised",
    "(๑•̀ㅂ•́)ง✧  -  Victory",
  ];

  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState("");
  const defaultHelperText = "Share your thoughts~~~";
  const [helperText, setHelperText] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [isValid, setIsVaild] = useState(false);
  const [moreThan500, setMoreThan500] = useState(false);
  const toast = useToast();
  const [currentAsciiMood, setCurrentAsciiMood] = useState(asciiEmojis[0]);

  const maxLength = 500;

  //   const [userid, setUserid] = useState();

  const handleChange = (textValue) => {
    setPostDescription(textValue.target.value);
    if (textValue.target.value.length <= maxLength) {
      setIsVaild(true);
      if (textValue.target.value.length === maxLength) {
        setHelperText("No more Characters~~~");
      } else {
        setHelperText(defaultHelperText);
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
    if (attachment != "") {
      setIsVaild(true);
      setHelperText(defaultHelperText);
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
          })
          .then((response) => {
            console.log("response successful: ", response);
          })
          .catch((error) => {
            console.error("error from handle submit: ", error.message);
          });

        toast({
          title: "Yeah, a new post~",
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
          <FormLabel htmlFor="edit-prompt">
            Leave Your Thoughts here...
          </FormLabel>
          <Textarea
            placeholder="Leave your thoughts here.."
            onChange={(textValue) => handleChange(textValue)}
            value={postDescription}
            resize={"none"}
            errorBorderColor="red"
            colorScheme={"green"}
          />
          <span style={{ color: moreThan500 ? "red" : "" }}>
            {`characters: ${wordCount.length}/${maxLength}`}
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
          <ButtonGroup gap="2">
            <Button
              colorScheme="red"
              onClick={(e) => {
                handleBackButton(e);
              }}
            >
              &gt;-
            </Button>
            <Button
              colorScheme="teal"
              onClick={(e) => {
                handleSubmit(e);
              }}
              disabled={attachment === "" && postDescription.length < 1}
            >
              -&gt;
            </Button>
          </ButtonGroup>
        </FormControl>
      </div>
    </div>
  );
}
