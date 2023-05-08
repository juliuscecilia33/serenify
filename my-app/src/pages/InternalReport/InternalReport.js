import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { NavbarVTwo } from "../../components/NavbarVTwo/NavbarVTwo";
import apiClient from "../../instance/config";
import { ReportList } from "../../components/ReportList/ReportList";

export function InternalReport() {
  return (
    <div>
      <NavbarVTwo />
      <div className="admin-report-title">
        <span>Handle reports:</span>
      </div>
    </div>
  );
}
