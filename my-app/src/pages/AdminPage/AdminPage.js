import * as ROUTES from "../../constants/routes";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { NavbarVTwo } from "../../components/index";

export function AdminPage() {
  const navigate = useNavigate();
  const [promptSelect, setPromptSelect] = useState(false);
  const [reportSelect, setReportSelect] = useState(false);

  const handleClick = (e) => {
    if (promptSelect) {
      navigate("/admin/prompt");
    }

    if (reportSelect) {
      navigate("/admin/report");
    }
  };

  return (
    <div>
      <NavbarVTwo />
      <h1>Admin</h1>
      <div className="admin-selections">
        <div className="admin-prompt-selection">
          <button
            onClick={() => {
              setPromptSelect(!promptSelect);
              setReportSelect(false);
            }}
          >
            {promptSelect ? "> Edit/Post a Prompt" : "Edit/Post a Prompt"}
          </button>
        </div>

        <div className="admin-report-selection">
          <button
            onClick={() => {
              setPromptSelect(false);
              setReportSelect(!reportSelect);
            }}
          >
            {reportSelect ? "> Handle User Report" : "Handle User Report"}
          </button>
        </div>
      </div>

      <>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          -&gt;
        </button>
      </>
    </div>
  );
}
