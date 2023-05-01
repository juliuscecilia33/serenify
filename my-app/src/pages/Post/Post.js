import React, { useState, useEffect } from "react";
import { Navbar, UserPost } from "../../components";
import "./Post.css";
import { BsFilterRight } from "react-icons/bs";
import axios from "axios";

export function Post() {
  const [postsForPrompt, setPostsForPrompt] = useState();

  const gettPostsForCertainPrompt = async () => {
    axios
      .get("http://localhost:3005/posts/all")
      .then((response) => {
        console.log("posts response: ", response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    gettPostsForCertainPrompt();
  }, []);

  return (
    <>
      <div class="container">
        <Navbar />
        <div class="post-filter">
          <h1>Posts</h1>
          <button>
            <BsFilterRight className="filter_icon" />
          </button>
        </div>
        <UserPost />
      </div>
    </>
  );
}
