import * as ROUTES from "../../constants/routes";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AdminNavbar, NavbarVTwo } from "../../components/index";
import "./AdminPage.css";

export function AdminPage() {
  const navigate = useNavigate();
  const [createPromptSelect, setCreatePromptSelect] = useState(false);
  const [promptSelect, setPromptSelect] = useState(false);
  const [reportSelect, setReportSelect] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (createPromptSelect) {
      console.log("admin create prompt");
    }

    if (promptSelect) {
      navigate("/admin/prompt");
    }

    if (reportSelect) {
      navigate("/admin/report");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-page-admin-page">
        <div className="admin-page-content">
          <div className="admin-page-b">
            <h1 className="admin-page-text-wrapper">Admin</h1>
          </div>
          <div className="admin-page-b1-5">
            {/* <button
              onClick={() => {
                setCreatePromptSelect(true);
                setPromptSelect(false);
                setReportSelect(false);
              }}
              className={
                createPromptSelect ? "admin-page-div-bolded" : "admin-page-div"
              }
            >
              {createPromptSelect && ">"} Create a prompt
            </button> */}
            <button
              onClick={() => {
                setCreatePromptSelect(false);
                setPromptSelect(true);
                setReportSelect(false);
              }}
              className={
                promptSelect ? "admin-page-div-bolded" : "admin-page-div"
              }
            >
              {promptSelect && ">"} Handle prompts
            </button>
            <button
              onClick={() => {
                setCreatePromptSelect(false);
                setPromptSelect(false);
                setReportSelect(true);
              }}
              className={
                reportSelect ? "admin-page-div-bolded" : "admin-page-div"
              }
            >
              {reportSelect && ">"} Handle reports
            </button>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="admin-page-text-wrapper-2"
            >
              -&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
