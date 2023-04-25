import React, { useState, useContext } from "react";
import { Navbar, UserPost } from "../../components/index";
import "./Post.css";
import { BsFilterRight } from "react-icons/bs";

export function Post() {
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
