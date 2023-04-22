import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar";
import { BsFilterRight, BsChevronUp, BsChevronDown } from "react-icons/bs";

export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  //const [promptInfo, setPromptInfo] = useState("");
  // const [defaultPromptContent, setDefaultPromptContent] = useState("");
  // const [defaultPromptDate, setDefaultPromptDate] = useState(null);
  // const [errMessage, setErrMessage] = useState("");

  // // setDefaultPromptDate(new Date().toLocaleDateString().replace(/\//g, "-")); //default is today
  // console.log("default prompt date:", defaultPromptDate);

  // const getCompanies = async () => {
  //   await axios
  //     .get("http://localhost:5000/company/", {
  //       headers: {
  //         jwt_token: localStorage.token,
  //       },
  //     })
  //     .then((response) => {
  //       setCompanies(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.error("There was an error!", error);
  //     });
  // };

  const getDefaultPromptContent = async () => {
    await axios
      .get(`http://localhost:3005/prompt/all`)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        // setErrMessage(error.message);
        console.error(error.message);
      });
    // const res = await apiClient
    //   .get(`/:${defaultPromptDate}`)
    //   .then((response) => {
    //     console.log("response: ", response);
    //   })
    //   .catch((err) => {
    //     setDefaultPromptContent(res.promptDescription);
    //     setErrMessage(
    //       "We have not published the prompt for today, please wait~"
    //     );
    //     console.err(err.message);
    //   });
  };

  useEffect(() => {
    //use promptDate to find the content
    getDefaultPromptContent();
  }, []);

  //user selectable
  const [selectedPromptContent, setSelectedPromptContent] = useState("");
  const [selectedPromptDate, setSelectedPromptDate] = useState(null);

  // useEffect(() => {
  //   if (defaultPromptDate) {
  //     //use promptDate to find the content
  //     async function getSelectedPromptContent() {
  //       try {
  //         const res = await apiClient.get(
  //           `/prompt/${selectedPromptDate}`
  //         );
  //         setSelectedPromptContent(res.promptDescription);
  //       } catch (err) {
  //         setErrMessage(
  //           "The date of prompt is invalid, or the prompt does not exist T_T"
  //         );
  //         console.err(err.message);
  //         setErrMessage(err.message);
  //       }
  //     }
  //   }
  //   // getSelectedPromptContent();
  // }, [selectedPromptDate]);

  return (
    <>
      <div class="container">
        <Navbar />
        <h1>Posts</h1>
        <button>
          <BsFilterRight />
        </button>
        <div class="post">
          <h2>Don't eat before bed</h2>
          <h3>2h ago</h3>
          <button class="expand">
            <BsChevronUp />
          </button>
        </div>

        <div class="post-expand">
          <button class="report">Report</button>
          <h3>Report</h3>
          <div class="like-c">
            <button class="like">Like</button>
            <button class="comment">Like</button>
          </div>

          <Calendar dateCallBack={selectedPromptDate} />
        </div>
      </div>
    </>
  );
}
