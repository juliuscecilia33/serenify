import React, { useEffect, useState } from "react";
import apiClient from "../../instance/config";

export function ReportList() {
  const [reportPostList, setReportPostList] = useState([]);

  const getReport = async () => {
    await apiClient
      .get(`/posts/invisible`)
      .then((response) => {
        console.log(response);
        setReportPostList(response.data);
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  return (
    <div>
      <h1>fuck</h1>
    </div>
  );
}
