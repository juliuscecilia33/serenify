import React, { useEffect, useState } from "react";
import "./ReportList.css";
import { handleTimeSince } from "../../helpers/handleTimeSince";
import moment from "moment";

export function ReportList(props) {
  const { reportPostData } = props;
  console.log("reportcount in the reportList:", reportPostData.reportcount);

  const formatDate = (defaultPromptDate) => {
    console.log(new Date(defaultPromptDate));
    let displayDate = moment(new Date(defaultPromptDate)).format("MMMM D, Y");

    return displayDate;
  };
  //console.log("This is the formatted date", reportPostData);

  return (
    <div class="post-container">
      <div className="middle-section">
        <div className="admin-page-report-text-div">
          <span>
            Report Count: {reportPostData && reportPostData.reportcount}
          </span>
        </div>
        <div className="top-top-section">
          <p>
            <b>{reportPostData.promptdescription}</b> •{" "}
            {formatDate(reportPostData.promptdate)}
          </p>
        </div>
        <p className="post_text">
          {reportPostData && reportPostData.postdescription}
        </p>
        {reportPostData && reportPostData.attachment ? (
          <iframe
            src={reportPostData && reportPostData.attachment}
            alt="post_image"
            title="attachment"
          />
        ) : null}
        {/* {reportPostData.ascii_mood && (
          // <div className="mood-backing">
          <h3 className="mood-backing">{reportPostData.ascii_mood}</h3>
          // </div>
        )} */}
        <p className="date_posted">
          {handleTimeSince(new Date(reportPostData.posttime))} ago
        </p>
      </div>
    </div>
  );
}
