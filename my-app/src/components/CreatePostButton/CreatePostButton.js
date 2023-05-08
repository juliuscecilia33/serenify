import "./CreatePostButton.css";
import React from "react";
import pencil from "../../images/pencil.png";
import { CreatePost } from "../../pages/CreatePost/CreatePost";

export function CreatePostButton({
  promptid,
  showPencil,
  setShowPencil,
  postSubmitted,
  setPostSubmitted,
}) {
  const createPostInfo = {
    promptid,
    showPencil,
    setShowPencil,
    postSubmitted,
    setPostSubmitted,
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
