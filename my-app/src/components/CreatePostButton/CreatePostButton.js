import "./CreatePostButton.css";
import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import pencil from "../../images/pencil.png";
import { CreatePost } from "../../pages/CreatePost/CreatePost";

export function CreatePostButton({ promptid, showPencil, setShowPencil }) {
  //navigate to the create post page
  // const navigate = useNavigate();
  // const goToCreatePost = (props) => {
  //   navigate("/createPost");
  //   console.log("props:", props);
  // };

  const createPostInfo = {
    promptid,
    showPencil,
    setShowPencil,
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowPencil(false);
    console.log("after click: ", showPencil);
  };

  return (
    <div>
      {showPencil ? (
        <button onClick={(e) => handleClick(e)}>
          <img src={pencil} alt="pencil click to add post" />
        </button>
      ) : (
        <CreatePost {...createPostInfo} />
      )}
    </div>
  );
}
