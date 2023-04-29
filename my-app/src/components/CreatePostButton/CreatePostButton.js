import "./CreatePostButton.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import pencil from "../../images/pencil.png";

export function CreatePostButton(promptid) {
  //navigate to the create post page
  const navigate = useNavigate();
  const goToCreatePost = (props) => {
    navigate("/createPost");
    console.log("props:", props);
  };

  const createPostInfo = {
    promptid,
    //,
    //localStorage.getItem(userid);
  };

  return (
    <div>
      <button onClick={() => goToCreatePost(createPostInfo)}>
        <img src={pencil} alt="pencil click to add post" />
      </button>

      {/* <CreatePost pormptid/> */}
    </div>
  );
}
