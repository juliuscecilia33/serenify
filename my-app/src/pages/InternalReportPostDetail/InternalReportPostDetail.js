import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import DividerBig from "../../images/DividerBig.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { AdminNavbar, NavbarVTwo } from "../../components";
import apiClient from "../../instance/config";
import DividerSmall from "../../images/DividerSmall.png";
import "./InternalReportPostDetail.css";

import { AspectRatio, useToast } from "@chakra-ui/react";
import { InternalReportAdminAction } from "../../components/InternalReportAdminAction/InternalReportAdminAction";

export function InternalReportPostDetail() {
  let { postid } = useParams();
  const navigate = useNavigate();
  const [postDescription, setPostDescription] = useState("");
  const [postReportCount, setPostReportCount] = useState(null);
  const [postAttachment, setPostAttachment] = useState(null);
  const [reportReason, setReportReason] = useState([]);
  const [approveSelected, setApproveSelected] = useState(false);
  const [denySelected, setDenySelected] = useState(false);
  const toast = useToast();

  const handleClick = async (e) => {
    e.preventDefault();
    if (approveSelected) {
      await apiClient
        .delete(`/report/${postid}/approve`)
        .then((response) => {
          console.log(response);
          navigate("/admin/report");
        })
        .catch((err) => {
          console.err(err.message);
        });

      toast({
        title: "Successful Action",
        description: `You have approved the report for ${postid}`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }

    if (denySelected) {
      await apiClient
        .delete(`/report/${postid}/deny`)
        .then((response) => {
          console.log(response);
          navigate("/admin/report");
        })
        .catch((err) => {
          console.err(err.message);
        });

      toast({
        title: "Successful Action",
        description: `You have deny the report for ${postid}`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const getPostDetail = async () => {
    await apiClient
      .get(`/posts/${postid}`)
      .then((response) => {
        console.log("post detail in report: ", response);
        setPostReportCount(response.data.reportcount);
        setPostDescription(response.data.postdescription);
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
        setReportReason(response.data);
        // if (reportReason) {
        //    console.log("report reasons after set:", reportReason);
        // }
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  useEffect(() => {
    getPostDetail();
    getReportReason();
  }, []);

  console.log("report reasons after set:", reportReason);

  return (
    <>
      <AdminNavbar />
      <div className="admin-post-page-post-page">
        <div className="admin-post-page-content">
          {/* <img className="post-page-logo" alt={"Logo"} src={"logo-2.png"} />
        <div className="post-page-text-wrapper">You</div> */}
          <div className="admin-post-page-tag">
            <button
              onClick={() => navigate(ROUTES.INTERNALREPORT)}
              className="back-button"
            >
              &lt;-
            </button>
          </div>
          <div className="admin-post-page-b">
            <h1 className="admin-post-page-don-t-eat-before-bed-just-finished-a-sandwich">
              {postDescription && postDescription}
            </h1>
          </div>
          {postAttachment && (
            <AspectRatio>
              <iframes
                src={postAttachment}
                title="attachment"
                alt="post attachment"
              />
            </AspectRatio>
          )}
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="admin-post-page-b1-5">
            <div className="admin-post-page-text-wrapper-2">Report Reasons</div>
            {reportReason &&
              reportReason.map((reason, key) => (
                <div key={key} className="admin-post-page-text-wrapper-3">
                  {reason}
                </div>
              ))}
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="admin-post-page-b1-5-2">
            <div className="admin-post-page-text-wrapper-2">
              Action by admin
            </div>
            <button
              onClick={() => {
                setApproveSelected(true);
                setDenySelected(false);
              }}
              className={
                approveSelected
                  ? "admin-post-page-approve-deny-bolded"
                  : "admin-post-page-approve-deny"
              }
            >
              {approveSelected && ">"} Approve
            </button>
            <button
              onClick={() => {
                setApproveSelected(false);
                setDenySelected(true);
              }}
              className={
                denySelected
                  ? "admin-post-page-approve-deny-bolded"
                  : "admin-post-page-approve-deny"
              }
            >
              {denySelected && ">"} Deny
            </button>
            <button
              onClick={(e) => handleClick(e)}
              className="admin-post-page-text-wrapper-4"
            >
              -&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
