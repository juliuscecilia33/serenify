import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import DividerBig from "../../images/DividerBig.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { NavbarVTwo } from "../../components";
import apiClient from "../../instance/config";
import { Button, AspectRatio, List, ListItem } from "@chakra-ui/react";

export function InternalReportPostDetail() {
  let { postid } = useParams();
  const navigate = useNavigate();
  const [postDescription, setPostDescription] = useState("");
  const [postReportCount, setPostReportCount] = useState(null);
  const [postAttachment, setPostAttachment] = useState(null);
  const [reportReason, setReportReason] = useState(null);

  const getPostDetail = async () => {
    await apiClient
      .get(`/posts/${postid}`)
      .then((response) => {
        console.log("post detail in report: ", response);
        setPostReportCount(response.data.reportcount);
        setPostDescription(response.data.postDescription);
        setPostAttachment(response.data.attachment);
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  const getReportReason = async () => {
    await apiClient
      .get(`/report/reason/${postid}`)
      .then((response) => {
        console.log("report reasons:", response.data);
        setReportReason(response.data.reason);
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  useEffect(() => {
    getPostDetail();
    getReportReason();
  }, []);

  return (
    <div>
      <NavbarVTwo />
      <div className="post-page-tag">
        <button
          onClick={() => {
            navigate(ROUTES.INTERNALREPORT);
          }}
          className="post-page-div"
        >
          &lt;-
        </button>
      </div>

      <div className="post-container">
        <div className="top-section"></div>
        <div className="middle-section">
          <div className="report-count">
            <span>Report Count: {postReportCount}</span>
          </div>
          <p className="post_text">{postDescription}</p>
          {postAttachment ? (
            <AspectRatio>
              <iframes
                src={postAttachment}
                title="attachment"
                alt="post attachment"
              />
            </AspectRatio>
          ) : null}
        </div>
      </div>

      <div className="report-reason-container">
        <List>reportReason.map((reason, id) => {})</List>
      </div>
    </div>
  );
}
