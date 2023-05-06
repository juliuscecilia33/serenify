import React, { useState } from "react";
import "./UserPost.css";

import axios from "axios";

import {
  BsChevronUp,
  BsChevronDown,
  BsHeart,
  BsChatRight,
  BsExclamationOctagon,
  BsHeartFill,
  BsFillTrash3Fill,
} from "react-icons/bs";

import Pencil from "../../images/PencilTwo.png";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function UserPost(postData, refreshPosts, setPostsRefresh) {
  const [postLiked, setPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(postData.postData.postlike);
  const [usersLiked, setUsersLiked] = useState(postData.postData.likedusers);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeletePost = (e) => {
    e.preventDefault();

    console.log("make sure postid exists: ", postData.postData.postid);

    axios
      .delete(`http://localhost:3005/posts/${postData.postData.postid}`)
      .then((response) => {
        console.log("delete response: ", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setPostsRefresh(!refreshPosts);

    console.log("Deleted Post");
  };

  const handleIncrementLike = (e) => {
    e.preventDefault();

    console.log("increment like");
  };

  const handleDecrementLike = (e) => {
    e.preventDefault();

    console.log("decrement like");
  };

  return (
    <>
      <div class="post-container">
        <div className="top-section"></div>
        <div className="middle-section">
          <p className="post_text">{postData.postData.postdescription}</p>
          {postData.postData.attachment ? (
            <img src={postData.postData.attachment} alt="post_image" />
          ) : null}
        </div>
        <p className="date_posted">
          {timeSince(new Date(postData.postData.posttime))} ago
        </p>
        <div className="button-container">
          {postData.postData.userid === localStorage.getItem("userid") && (
            <>
              <button className="trash-icon">
                <BsFillTrash3Fill />
              </button>
              <img alt="Edit-icon" className="pencil-icon" src={Pencil} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
