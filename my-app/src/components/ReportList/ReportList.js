import React, { useEffect, useState } from "react";

export function ReportList(props) {
  const { reportPost } = props;

  return (
    <div class="post-container">
      <div className="top-section"></div>
      <div className="middle-section">
        <div className="report-count">
          <span>Report Count: {reportPost.reportPost.reportCount}</span>
        </div>
        <div className="admin-action">
          <span className="admin-action-text">Admin Actions: </span>
          <div className="button-container"></div>
        </div>
        <p className="post_text">{reportPost.reportPost.postdescription}</p>
        {reportPost.reportPost.attachment ? (
          <img src={reportPost.reportPost.attachment} alt="post_image" />
        ) : null}
      </div>
    </div>
  );
}
