import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import "./Report.css";

export function Report() {
  return (
    <div className="report-report">
      <div className="report-content">
        <div className="report-b">
          <div className="report-frame">
            <div className="report-group">
              <div className="report-overlap-group">
                <div className="report-rectangle" />
                <div className="report-rectangle-552" />
              </div>
            </div>
          </div>
          <h1 className="report-text-wrapper">Report?</h1>
        </div>
        <div className="report-b-2">
          <div className="report-false-information">&gt; False information</div>
          <div className="report-div">Harassment</div>
          <div className="report-div">Hate speech</div>
          <div className="report-div">Spam</div>
          <div className="report-div">Other...</div>
          <div className="report-text-wrapper-2">-&gt;</div>
        </div>
      </div>
    </div>
  );
}
