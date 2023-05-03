import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import "./Report.css";

export function Report() {
  const [optionOneSelected, setOptionOneSelected] = useState(false);
  const [optionTwoSelected, setOptionTwoSelected] = useState(false);
  const [optionThreeSelected, setOptionThreeSelected] = useState(false);
  const [optionFourSelected, setOptionFourSelected] = useState(false);
  const [optionFiveSelected, setOptionFiveSelected] = useState(false);

  const handleSendReport = (e) => {
    e.preventDefault();
  };

  return (
    <div className="report-report">
      <div className="report-content">
        <div className="report-b">
          <div className="report-frame">
            <div className="report-text-wrapper">&lt;-</div>
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
            }}
            className={optionFourSelected ? "report-div-bold" : "report-div"}
          >
            {optionFourSelected && ">"} Spam
          </button>
          <button
            onClick={() => {
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
