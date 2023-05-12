import React, { useEffect, useState, useContext } from "react";
import { NavbarVTwo } from "../../components/index";
import { useNavigate } from "react-router";
import apiClient from "../../instance/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InternalPromptEditor } from "../../components/InternalPromptEditor/InternalPromptEditor";
import { Authentication } from "../../context/Authentication";
import "./InternalPrompt.css";

export function InternalPrompt() {
  const [pickDate, setPickDate] = useState(new Date());
  const [promptContent, setPromptContent] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [promptid, setPromptid] = useState("");
  const [promptSubmitted, setPromptSubmitted] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);

  const checkUserLogin = () => {
    if (!isAuthenticated) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  //localStorage.setItem('InternalDate', pickDate);
  useEffect(() => {
    const getPromptContent = async () => {
      const dateTime = new Date(pickDate)
        .toLocaleDateString()
        .replace(/\//g, "-");

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

  // const handleClick = () => {
  //   setPickDate();
  //   localStorage.setItem("internalDate", pickDate);
  // };

  useEffect(() => {
    if (localStorage.getItem("internalDate")) {
      setPickDate(new Date(localStorage.getItem("internalDate")));
    }
  }, [localStorage.getItem("internalDate")]);

  return (
    <div className="admin-prompt">
      <NavbarVTwo />
      <div className="calendar-container">
        <DatePicker
          className="calendar-input"
          selected={pickDate}
          onChange={(date) => {
            setPickDate(date);
            localStorage.setItem("internalDate", date);
          }}
          maxDate={new Date()}
        />
        {/* <button className="calendar-button" onClick={handleClick}>
          Select
        </button> */}
      </div>
      <InternalPromptEditor
        havePrompt={havePrompt}
        promptContent={promptContent}
        setPromptContent={setPromptContent}
        promptid={promptid}
        setPromptSubmitted={setPromptSubmitted}
        promptSubmitted={promptSubmitted}
        setHavePrompt={setHavePrompt}
      />
    </div>
  );
}
