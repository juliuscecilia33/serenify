import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/index";
import apiClient from "../../instance/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InternalPromptEditor } from "../../components/InternalPromptEditor/InternalPromptEditor";

export function InternalPrompt() {
  const [admin, setAdmin] = useState(false);
  const [date, setDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, "-")
  );
  const [promptContent, setPromptContent] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [promptid, setPromptid] = useState("");
  const navigate = useNavigate();

  const userType = async () => {
    await apiClient
      .get(`/users/${localStorage.getItem("userid")}`)
      .then((response) => {
        console.log("response", response);
        const adminOrNot = response.data.isAdmin;
        console.log(adminOrNot);
        setAdmin(adminOrNot);
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  useEffect(() => {
    userType();
    if (admin === false) {
      navigate("/prompt");
    }
  }, [admin]);

  useEffect(() => {
    const getPromptContent = async () => {
      const res = await apiClient
        .get(`/prompt/:${date}`)
        .then((response) => {
          console.log("response: ", response.data.promptdescription);
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
  }, [date, havePrompt]);

  const handleClick = (date) => {
    localStorage.setItem("internalDate", date);
  };

  useEffect(() => {
    setDate(
      new Date(
        localStorage
          .getItem("internalDate")
          .toLocaleDateString()
          .replace(/\//g, "-")
      )
    );
  }, [localStorage.getItem("internalDate")]);

  return (
    <div>
      <div className="calendar-container">
        <DatePicker
          className="calendar-input"
          selected={date}
          onChange={(date) => setDate(date)}
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

// export default InternalPrompt;
