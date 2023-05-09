import React, { useState, useEffect } from "react";
import apiClient from "../../instance/config";
import { AspectRatio, Spinner, useToast } from "@chakra-ui/react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export function InternalReportAdminAction(props) {
  //   const [approve, setApprove] = useState("Approve");
  //   const [deny, setDeny] = useState("Deny");
  const { postid } = props;
  const [approveSelect, setApproveSelect] = useState(false);
  const [denySelect, setDenySelect] = useState(false);
  const toast = useToast();

  const handleClick = async (e) => {
    if (approveSelect) {
      await apiClient
        .delete(`/report/approve/${postid}`)
        .then((response) => {
          console.log(response);
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

    if (denySelect) {
      await apiClient
        .delete(`/report/deny/:postid`)
        .then((response) => {
          console.log(response);
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

  return (
    <div>
      <button
        onClick={() => {
          setApproveSelect(!approveSelect);
          setDenySelect(false);
        }}
      >
        {approveSelect ? ">Approve" : "Approve"}
      </button>
      <button
        onClick={() => {
          setDenySelect(!denySelect);
          setApproveSelect(false);
        }}
      >
        {denySelect ? ">Deny" : "Deny"}
      </button>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        -&gt;
      </button>
    </div>
  );
}
