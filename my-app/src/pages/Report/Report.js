import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import "./Report.css";

export function Report() {
  const [optionOneSelected, setOptionOneSelected] = useState(false);
  const [optionTwoSelected, setOptionTwoSelected] = useState(false);
  const [optionThreeSelected, setOptionThreeSelected] = useState(false);
  const [optionFourSelected, setOptionFourSelected] = useState(false);
  const [optionFiveSelected, setOptionFiveSelected] = useState(false);
  const [reasonSelected, setReasonSelected] = useState("");

  const toast = useToast();

  console.log("reason selected:", reasonSelected);

  const navigate = useNavigate();

  let { postid } = useParams();

  const handleSendReport = (e) => {
    e.preventDefault();

    const reportBody = {
      reason: reasonSelected,
      userid: localStorage.getItem("userid"),
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}report/${postid}/add`,
        reportBody
      )
      .then((response) => {
        console.log("report response: ", response);
        navigate(ROUTES.PROMPT);

        toast({
          title: "Your Report was sent!",
          description:
            "We will take a look at your report as soon as possible!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast({
          title: "Post already reported!",
          description: "You have already reported this post before",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="report-report">
      <div className="report-content">
        <div className="report-b">
          <div className="report-frame">
            <button
              onClick={() => {
                navigate(ROUTES.PROMPT);
              }}
              className="post-page-div"
            >
              <div className="report-text-wrapper">&lt;-</div>
            </button>
          </div>
          <h1 className="report-text-wrapper">Report?</h1>
        </div>
        <div className="report-b-2">
          <button
            onClick={() => {
              setOptionOneSelected(true);
              setOptionTwoSelected(false);
              setOptionThreeSelected(false);
              setOptionFourSelected(false);
              setOptionFiveSelected(false);
              setReasonSelected("False information");
            }}
            className={optionOneSelected ? "report-div-bold" : "report-div"}
          >
            {optionOneSelected && ">"} False information
          </button>
          <button
            onClick={() => {
              setOptionOneSelected(false);
              setOptionTwoSelected(true);
              setOptionThreeSelected(false);
              setOptionFourSelected(false);
              setOptionFiveSelected(false);
              setReasonSelected("Harassment");
            }}
            className={optionTwoSelected ? "report-div-bold" : "report-div"}
          >
            {optionTwoSelected && ">"} Harassment
          </button>
          <button
            onClick={() => {
              setOptionOneSelected(false);
              setOptionTwoSelected(false);
              setOptionThreeSelected(true);
              setOptionFourSelected(false);
              setOptionFiveSelected(false);
              setReasonSelected("Hate Speech");
            }}
            className={optionThreeSelected ? "report-div-bold" : "report-div"}
          >
            {optionThreeSelected && ">"} Hate speech
          </button>
          <button
            onClick={() => {
              setOptionOneSelected(false);
              setOptionTwoSelected(false);
              setOptionThreeSelected(false);
              setOptionFourSelected(true);
              setOptionFiveSelected(false);
              setReasonSelected("Spam");
            }}
            className={optionFourSelected ? "report-div-bold" : "report-div"}
          >
            {optionFourSelected && ">"} Spam
          </button>
          <button
            onClick={() => {
              setReasonSelected("");
              setOptionOneSelected(false);
              setOptionTwoSelected(false);
              setOptionThreeSelected(false);
              setOptionFourSelected(false);
              setOptionFiveSelected(true);
            }}
            className={optionFiveSelected ? "report-div-bold" : "report-div"}
          >
            {optionFiveSelected && ">"} Other...
          </button>
          {optionFiveSelected && (
            <textarea
              value={reasonSelected}
              onChange={(e) => setReasonSelected(e.target.value)}
              className="other-input"
              placeholder="Enter your reason here..."
              maxLength="500"
            />
          )}
          <button
            onClick={(e) => handleSendReport(e)}
            className="report-text-wrapper-2"
          >
            -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
