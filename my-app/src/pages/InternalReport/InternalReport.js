import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarVTwo } from "../../components/NavbarVTwo/NavbarVTwo";
import apiClient from "../../instance/config";
import { ReportList } from "../../components/ReportList/ReportList";
import DividerSmall from "../../images/DividerSmall.png";
import * as ROUTES from "../../constants/routes";
import "./InternalReport.css";
import { AdminNavbar } from "../../components";

export function InternalReport() {
  const [reportPostList, setReportPostList] = useState([]);

  const getReport = async () => {
    await apiClient
      .get(`/posts/invisible`)
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
          <div className="admin-page-b">
            <h1 className="admin-page-text-wrapper">
              Handle <br />
              reports
            </h1>
          </div>
          <div>
            {reportPostList &&
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
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
