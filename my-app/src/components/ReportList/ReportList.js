import React, { useEffect, useState } from "react";
import apiClient from "../../instance/config";

export function ReportList() {
  const [reportPostList, setReportPostList] = useState([]);

  const getReport = async () => {
    await apiClient.get(``);
  };

  return (
    <div>
      <h1>fuck</h1>
    </div>
  );
}
