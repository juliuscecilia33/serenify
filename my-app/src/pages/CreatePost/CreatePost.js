import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import "./CreatePost.css";

export function CreatePost(props) {
    const [postDescription, setPostDescription] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [userid, setUserid] = useState();
}


