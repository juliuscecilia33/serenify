import React, { useState } from "react";
import "./UserPost.css";

import ant from "../../images/animals/ant.png";
import bear from "../../images/animals/bear.png";
import bird from "../../images/animals/bird.png";
import bumblebee from "../../images/animals/bumblebee.png";
import butterfly from "../../images/animals/butterfly.png";
import butterflytwo from "../../images/animals/butterflytwo.png";
import cat from "../../images/animals/cat.png";
import chicken from "../../images/animals/chicken.png";
import chickentwo from "../../images/animals/chickentwo.png";
import clownfish from "../../images/animals/clownfish.png";
import cow from "../../images/animals/cow.png";
import crab from "../../images/animals/crab.png";
import dog from "../../images/animals/dog.png";
import dolphin from "../../images/animals/dolphin.png";
import donkey from "../../images/animals/donkey.png";
import duck from "../../images/animals/ant.png";
import elephant from "../../images/animals/elephant.png";
import falcon from "../../images/animals/falcon.png";
import fish from "../../images/animals/fish.png";

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

  const wordBank = [
    ant,
    bear,
    bird,
    bumblebee,
    butterfly,
    butterflytwo,
    cat,
    chicken,
    chickentwo,
    clownfish,
    cow,
    crab,
    dog,
    dolphin,
    donkey,
    duck,
    elephant,
    falcon,
    fish,
  ];

  console.log("post time: ", typeof postData.postData.posttime);
  console.log("post data - user liked: ", postData.postData.likedusers);

  console.log("users liked: ", usersLiked);
  console.log("local storage user id: ", localStorage.getItem("userid"));
  if (usersLiked) {
    console.log(
      "includes console: ",
      usersLiked.includes(localStorage.getItem("userid"))
    );
  }

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

  function getRandomAnimal() {
    let randomNumber = Math.floor(Math.random() * wordBank.length);

    // console.log("random animal: ", wordBank[randomNumber]);
    return wordBank[randomNumber];
  }

  return (
    <>
      <div class="post-container">
        <div className="top-section">
          <div className="profile-pic">
            <img src={getRandomAnimal()} alt="Animal" />
          </div>
          <p className="date_posted">
            {timeSince(new Date(postData.postData.posttime))} ago
          </p>
        </div>
        <div className="middle-section">
          <p className="post_text">{postData.postData.postdescription}</p>
          {postData.postData.attachment ? (
            <img src={postData.postData.attachment} alt="post_image" />
          ) : null}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="post-expand"
          >
            {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        {isExpanded && (
          <div className="expanded-section">
            <div className="report_button">
              <button>
                <BsExclamationOctagon />
              </button>
              <p>Report</p>
            </div>
            <div className="buttons">
              <div className="button-container">
                {postData.postData.likedusers &&
                postData.postData.likedusers.includes(
                  localStorage.getItem("userid")
                ) ? (
                  <button onClick={(e) => handleDecrementLike(e)}>
                    <BsHeartFill />
                  </button>
                ) : (
                  <button onClick={(e) => handleIncrementLike(e)}>
                    <BsHeart />
                  </button>
                )}
                <p>{likeCount}</p>
              </div>
              <div className="button-container">
                <button>
                  <BsChatRight />
                </button>
                <p>234</p>
              </div>
              <div className="button-container">
                {postData.postData.userid ===
                  localStorage.getItem("userid") && (
                  <button onClick={(e) => handleDeletePost(e)}>
                    <BsFillTrash3Fill />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
