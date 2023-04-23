import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar";
import { BsChevronDown } from "react-icons/bs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  const [promptDescription, setPromptDescription] = useState("");
  const [defaultPromptDate, setDefaultPromptDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, "-")
  );
  const [errMessage, setErrMessage] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDefaultPromptContent = async () => {
    if (defaultPromptDate) {
      //console.log("default prompt date:", defaultPromptDate);

      const res = await apiClient
        .get(`/prompt/:${defaultPromptDate}`)
        .then((response) => {
          console.log("response: ", response.data.promptdescription);
          setPromptDescription(response.data.promptdescription);
        })
        .catch((err) => {
          setErrMessage(
            "We have not published the prompt for today, please wait~"
          );
          console.err(err.message);
        });
    }
  };

  const selectedPromptDate = (date) => {
    setDefaultPromptDate(date);
  };

  useEffect(() => {
    //use promptDate to find the content
    getDefaultPromptContent();
  }, [getDefaultPromptContent]);

  return (
    <>
      <div class="container">
        <Navbar />
        <h1>Posts</h1>
        <div class="post">
          <h2>
            {promptDescription ? (
              promptDescription
            ) : (
              <div>
                <p>"We do not have prompt for this day...</p>
                <p>sorry T_T"</p>
              </div>
            )}
          </h2>
        </div>

        <Calendar dateCallBack={selectedPromptDate} />
      </div>
    </>
  );
}
