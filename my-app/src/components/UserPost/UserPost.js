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
import {
  BsChevronUp,
  BsChevronDown,
  BsHeart,
  BsChatRight,
  BsExclamationOctagon,
} from "react-icons/bs";

export function UserPost(postData) {
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

  const [isExpanded, setIsExpanded] = useState(false);

  function getRandomAnimal() {
    let randomNumber = Math.floor(Math.random() * wordBank.length);

    console.log("random animal: ", wordBank[randomNumber]);
    return wordBank[randomNumber];
  }

  return (
    <div class="post-container">
      <div className="top-section">
        <div className="profile-pic">
          <img src={getRandomAnimal()} alt="Animal" />
        </div>
        <p className="date_posted">2h ago</p>
      </div>
      <div className="middle-section">
        <p className="post_text">
          Don’t eat before bed :) just finished a sandwich
        </p>

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
              <button>
                <BsHeart />
              </button>
              <p>1401</p>
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
