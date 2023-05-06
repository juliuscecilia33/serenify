import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/index";
import apiClient from "../../instance/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InternalPromptEditor } from "../../components/InternalPromptEditor/InternalPromptEditor";

export function InternalPrompt() {
  const [admin, setAdmin] = useState(false);
  const [pickDate, setPickDate] = useState(new Date());
  const [promptContent, setPromptContent] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [promptid, setPromptid] = useState("");
  const navigate = useNavigate();

  const userType = async () => {
    await apiClient
      .get(`/users/${localStorage.getItem("userid")}`)
      .then((response) => {
        console.log("response", response);
        localStorage.setItem("isAdmin", response.data.isadmin);
        if (!response.data.isadmin) {
          navigate("/prompt");
        }
      })
      .catch((err) => {
        navigate("/prompt");
        console.err(err.message);
      });
  };

  useEffect(() => {
    userType();
  }, []);

  useEffect(() => {
    const dateTime = new Date(pickDate)
      .toLocaleDateString()
      .replace(/\//g, "-");
    const getPromptContent = async () => {
      const res = await apiClient
        .get(`/prompt/:${dateTime}`)
        .then((response) => {
          setPromptContent(response.data.promptdescription);
          setPromptid(response.data.promptid);

          if (response.data.promptdescription) {
            setHavePrompt(true);
          } else {
            setHavePrompt(false);
          }
        })
        .catch((err) => {
          console.err(err.message);
        });
    };
    //use promptDate to find the content
    getPromptContent();
  }, [pickDate, havePrompt]);

  const handleClick = () => {
    localStorage.setItem("internalDate", pickDate);
  };

  useEffect(() => {
    if (localStorage.getItem("internalDate")) {
      setPickDate(new Date(localStorage.getItem("internalDate")));
    }
  }, [localStorage.getItem("internalDate")]);

  return (
    <div>
      <div className="calendar-container">
        <DatePicker
          className="calendar-input"
          selected={pickDate}
          onChange={(date) => setPickDate(date)}
          maxDate={new Date()}
        />
        <button className="calendar-button" onClick={handleClick}>
          Select
        </button>
      </div>
      <InternalPromptEditor
        havePrompt={havePrompt}
        promptContent={promptContent}
        setPromptContent={setPromptContent}
        promptid={promptid}
      />
    </div>
  );
}

