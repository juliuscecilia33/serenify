import React, { useEffect, useState, useContext } from "react";
import { AdminNavbar, NavbarVTwo } from "../../components/index";
import { useNavigate } from "react-router";
import apiClient from "../../instance/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InternalPromptEditor } from "../../components/InternalPromptEditor/InternalPromptEditor";
import { Authentication } from "../../context/Authentication";
import "./InternalPrompt.css";
import * as ROUTES from "../../constants/routes";

export function InternalPrompt() {
  const [pickDate, setPickDate] = useState(new Date());
  const [promptContent, setPromptContent] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [promptid, setPromptid] = useState("");
  const [promptSubmitted, setPromptSubmitted] = useState(false);
  const navigate = useNavigate();
  const [displayDate, setDisplayDate] = useState(
    new Date(pickDate).toLocaleDateString().replace(/\//g, "-")
  );
  const [displayDay, setDisplayDay] = useState(null);
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);

  const checkUserLogin = () => {
    if (!isAuthenticated) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("internalDate")) {
      localStorage.setItem("internalDate", pickDate);
    }
  }, []);

  //localStorage.setItem('InternalDate', pickDate);
  useEffect(() => {
    const getPromptContent = async () => {
      const dateTime = new Date(pickDate)
        .toLocaleDateString()
        .replace(/\//g, "-");

      setDisplayDate(dateTime);

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
  }, [pickDate, havePrompt, setPickDate]);

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
    <>
      <AdminNavbar />
      <div className="selection-selection-wrapper">
        <div className="selection-selection">
          <div className="selection-content">
            <button
              onClick={() => navigate(ROUTES.ADMINPAGE)}
              className="back-button"
            >
              &lt;-
            </button>
            <div className="selection-b">
              <h1 className="selection-text-wrapper">Edit a prompt</h1>
            </div>

            <div className="selection-b1-5">
              {/* <p className="selection-apr">{displayDate}</p> */}
              <DatePicker
                className="calendar-input"
                selected={pickDate}
                onChange={(date) => {
                  setPickDate(date);
                  localStorage.setItem("internalDate", date);
                }}
                maxDate={new Date()}
                wrapperClassName="datePicker"
              />
              <InternalPromptEditor
                havePrompt={havePrompt}
                promptContent={promptContent}
                setPromptContent={setPromptContent}
                promptid={promptid}
                setPromptSubmitted={setPromptSubmitted}
                promptSubmitted={promptSubmitted}
                setHavePrompt={setHavePrompt}
              />
              {/* <div className="selection-div">-&gt;</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
