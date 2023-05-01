import "./CreatePostButton.css";
import React, { useState } from "react";
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

  console.log("create post button props: ", showPencil);

  const createPostInfo = {
    promptid,
    //,
    //localStorage.getItem(userid);
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
