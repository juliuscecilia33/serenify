import "./CreatePostButton.css";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import pencil from "../../images/pencil.png";
import { CreatePost } from "../../pages/CreatePost/CreatePost";

export function CreatePostButton(promptid) {
  //navigate to the create post page
  // const navigate = useNavigate();
  // const goToCreatePost = (props) => {
  //   navigate("/createPost");
  //   console.log("props:", props);
  // };

  const [showPencil, setShowPencil] = useState(true);

  const createPostInfo = {
    promptid,
    //,
    //localStorage.getItem(userid);
  };

  const handleClick = () => {
    setShowPencil(false);
  };

  return (
    <div>
      {showPencil ? (
        <button onClick={handleClick}>
          <img src={pencil} alt="pencil click to add post" />
        </button>
      ) : (
        <CreatePost createPostInfo={createPostInfo} />
      )}
    </div>
  );
}
