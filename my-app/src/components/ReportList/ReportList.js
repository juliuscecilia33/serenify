import React, { useEffect, useState } from "react";

export function ReportList(props) {
  const { reportPostData } = props;
  console.log("reportcount in the reportList:", reportPostData.reportcount);

  return (
    <div class="post-container">
      <div className="top-section"></div>
      <div className="middle-section">
        <div className="report-count">
          <span>
            Report Count: {reportPostData && reportPostData.reportcount}
          </span>
        </div>
        <div className="admin-action">
          <span className="admin-action-text">Admin Actions: </span>
          <div className="button-container"></div>
        </div>
        <p className="post_text">
          {reportPostData && reportPostData.postdescription}
        </p>
        {reportPostData && reportPostData.attachment ? (
          <img
            src={reportPostData && reportPostData.attachment}
            alt="post_image"
          />
        ) : null}
      </div>
    </div>
  );
}
