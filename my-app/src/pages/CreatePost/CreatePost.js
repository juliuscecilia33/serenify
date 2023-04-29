import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import "./CreatePost.css";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";

export function CreatePost(props) {
  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  //   const [userid, setUserid] = useState();

  return (
    <div>
      <div className="container">
        <h1>Create post</h1>
        <FormControl>
          <FormLabel>Label</FormLabel>
          <Textarea
            color="warning"
            disabled={false}
            minRows={2}
            placeholder="Leave your thoughts here..."
            size="lg"
            variant="soft"
            onChange={(textValue) => setPostDescription(textValue)}
            value={postDescription}
          />
          <FormHelperText>This is a helper text.</FormHelperText>
        </FormControl>

        {/* <Textarea
            name="Post area"
            rows={7}
            cols={35}
            maxLength="105"
            placeholder="Leave Your Thoughts here..."
            
          /> */}
      </div>
    </div>
  );
}
