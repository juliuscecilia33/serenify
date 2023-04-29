import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import "./CreatePost.css";
//import { Textarea, Grid, Text } from '@nextui-org/react';
import { TextField, Typography, Container} from "@mui/material";
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText } from '@mui/material';


export function CreatePost(props) {
  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [helperText, setHelperText] = useState("");
  const [wordCount, setWordCount] = useState('');
  const maxLength = 500;
  //   const [userid, setUserid] = useState();

  const handleChange = (textValue) => {
    setPostDescription(textValue.target.value);
    if (textValue.target.value.length <= maxLength) {
      setWordCount(textValue.target.value);
    }
  }

  return (
    <div>
      <div className="container">
        <Container>
          <TextField
            type="text"
            color="primary"
            minRows={2}
            multiline
            placeholder="Leave Your Thoughts Here..."
            label="Your Thoughts~"
            size="lg"
            value={postDescription}
            onChange={handleChange}
          />
          <FormHelperText>This is a helper text.</FormHelperText>
          {/* <Textarea
            color="primary"
            minRows={2}
            multiline
            placeholder="Leave Your Thoughts Here..."
            size="lg"
            variant="plain"
            value={postDescription}
            onChange={handleChange}
            endDecorator={
            <Typography level="body3" sx={{ ml: 'auto' }}>
              {`${wordCount.length}/${maxLength}`}
            </Typography>
              }
          /> */}
        </Container>
          {/* <Grid>
              <Textarea
                label="Create Post"
                minRows={8}
                fullWidth="true"
                placeholder="Leave your thoughts here.."
                onChange={handleChange}
                value={postDescription}
                helperText={helperText}
                animated="true"
                shadow="true"
                bordered="true"
                borderWeight="light"
              />
               <div>{`characters: ${wordCount.length}/${maxLength}`}</div>
          </Grid> */}
          

           
      {/* <Typography variant="caption">{`${wordCount.length}/${maxLength}`}</Typography> */}
      </div>
    </div>
  );
}
