import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarVTwo } from "../../components/NavbarVTwo/NavbarVTwo";
import apiClient from "../../instance/config";
import { ReportList } from "../../components/ReportList/ReportList";
import DividerSmall from "../../images/DividerSmall.png";
import * as ROUTES from "../../constants/routes";
import "./InternalReport.css";
import { AdminNavbar } from "../../components";
import { useNavigate } from "react-router";

export function InternalReport() {
  const [reportPostList, setReportPostList] = useState([]);
  const navigate = useNavigate();

  const getReport = async () => {
    await apiClient
      .get("/posts/allReports")
      .then((response) => {
        console.log(response);

        if (response) {
          setReportPostList(response.data);
        }
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="admin-page-admin-page">
        <div className="admin-page-content">
          <button
            onClick={() => navigate(ROUTES.ADMINPAGE)}
            className="back-button"
          >
            &lt;-
          </button>
          <div className="admin-page-b">
            <h1 className="admin-page-text-wrapper">
              Handle <br />
              reports
            </h1>
            <img
              className="divider-small"
              src={DividerSmall}
              alt="DividerSmall"
            />
          </div>
          <div>
            {reportPostList && reportPostList.length > 0 ? (
              reportPostList.map((reportPost, id) => (
                <div key={id}>
                  {reportPost.postid && (
                    <Link to={`${reportPost.postid}`}>
                      <ReportList key={id} reportPostData={reportPost} />
                    </Link>
                  )}

                  <img
                    className="divider-small"
                    src={DividerSmall}
                    alt="DividerSmall"
                  />
                </div>
              ))
            ) : (
              <h1 className="admin-page-text-small">No posts to review!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
