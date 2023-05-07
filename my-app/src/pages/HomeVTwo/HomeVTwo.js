import React from "react";
import "./HomeVTwo.css";
import Cat from "../../images/Cat.png";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { NavbarVTwo } from "../../components";

export function HomeVTwo() {
  return (
    <>
      <NavbarVTwo />
      <div className="content">
        <div className="s1">
          <h1 className="big">
            Hello
            <br />
            &lt;･◡･&gt;!
            <br />
            <br />I am Serenify.
            <br />
            ---------
          </h1>
        </div>
        <div className="s2">
          <h1 className="big">Your</h1>
          <p className="small smallcross">
            &nbsp;Online&nbsp;
            <br />
            &nbsp;Anonymous&nbsp;
            <br />
            &nbsp;Mental Health&nbsp;
            <br />
            &nbsp;Prompt Based&nbsp;
            <br />
          </p>
          <h1 className="big">
            Forum.
            <br />
            ---------
          </h1>
        </div>
        <div className="s3">
          <p className="small">&nbsp;I like to</p>
          <h1 className="big">Scroll</h1>
          <p className="small">&nbsp;and</p>
          <h1 className="big">Hold</h1>
          <span className="small">
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Try it~^
            <br />
          </span>
          <h1 className="big">---------</h1>
          <img
            className="wheel"
            alt={"Wheel"}
            src={
              "https://anima-uploads.s3.amazonaws.com/projects/64480ae0ca3bfce771e46398/releases/6448516f8ae30cff1df92e11/img/wheel.svg"
            }
          />
        </div>
        <div className="s3">
          <p className="small">
            &nbsp;You can
            <br />
            &nbsp;Pet this cat
            <br />
            &nbsp;To move forward.
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="big">---------</h1>
          </p>
          <Link to={ROUTES.PROMPT}>
            <img className="cat" alt={"Cat"} src={Cat} />
          </Link>
        </div>
      </div>
    </>
  );
}
