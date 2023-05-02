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
} from "react-icons/bs";

export function UserPost(postData) {
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

  console.log("post data - user liked: ", typeof postData.postData.likedusers);
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
    <div class="post-container">
      <div className="top-section">
        <div className="profile-pic">
          <img src={getRandomAnimal()} alt="Animal" />
        </div>
        <p className="date_posted">{postData.postData.posttime}</p>
      </div>
      <div className="middle-section">
        <p className="post_text">{postData.postData.postdescription}</p>

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
          </div>
        </div>
      )}
    </div>
  );
}
