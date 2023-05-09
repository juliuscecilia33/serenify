import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarVTwo } from "../../components/NavbarVTwo/NavbarVTwo";
import apiClient from "../../instance/config";
import { ReportList } from "../../components/ReportList/ReportList";
import DividerSmall from "../../images/DividerSmall.png";
import * as ROUTES from "../../constants/routes";

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
    <div>
      <NavbarVTwo />
      <div className="admin-report-title">
        <span>Handle reports:</span>
      </div>
      <div>
        {reportPostList &&
          reportPostList.map((reportPost, id) => (
            <div>
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
  );
}
