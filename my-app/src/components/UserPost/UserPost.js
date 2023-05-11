import React, { useState } from "react";
import "./UserPost.css";
import { handleTimeSince } from "../../helpers/handleTimeSince";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import Pencil from "../../images/PencilTwo.png";

export function UserPost(postData) {
  return (
    <>
      <div className="post-container">
        <div className="top-section"></div>
        <div className="middle-section">
          <p className="post_text">{postData.postData.postdescription}</p>
          {postData.postData.attachment ? (
            <iframe
              className="post-image-attachment"
              src={postData.postData.attachment}
              alt="post_image"
              title="attachment"
            />
          ) : null}
        </div>
        {postData.postData.ascii_mood && (
          // <div className="mood-backing">
          <h3 className="mood-backing">{postData.postData.ascii_mood}</h3>
          // </div>
        )}
        <br />
        <p className="date_posted">
          {handleTimeSince(new Date(postData.postData.posttime))} ago
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
