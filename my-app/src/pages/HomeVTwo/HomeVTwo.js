import React, { useState } from "react";
import "./HomeVTwo.css";
import Cat from "../../images/Cat.png";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { NavbarVTwo } from "../../components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import DividerBig from "../../images/DividerBig.png";

export function HomeVTwo() {
  const x = useMotionValue(0);
  // const rotate = useTransform(x, [-100, 100], [-180, 180]);

  const handleDrag = (event, info) => {
    x.set(info.point.x);
  };

  const handleDragEnd = () => {
    x.set(0);
  };
  const [rotate, setRotate] = useState(false);

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
          </h1>
          <div className="profile-page-div">--------------</div>
          {/* <img
            className="divider-small negative-margin"
            src={DividerBig}
            alt="Divider Big"
          /> */}
        </div>
        <div className="s2">
          <h1 className="big">Your</h1>
          <p className="small">
            &nbsp;Online&nbsp;
            <br />
            &nbsp;Anonymous&nbsp;
            <br />
            &nbsp;Mental Health&nbsp;
            <br />
            &nbsp;Prompt Based&nbsp;
            <br />
          </p>
          <h1 className="big">Forum.</h1>
          <div className="profile-page-div">--------------</div>
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
          <div className="profile-page-div">--------------</div>
          {/* <img
            className="wheel"
            alt={"Wheel"}
            src={
              "https://anima-uploads.s3.amazonaws.com/projects/64480ae0ca3bfce771e46398/releases/6448516f8ae30cff1df92e11/img/wheel.svg"
            }
          /> */}
          <motion.div>
            <motion.img
              className="wheel"
              alt="Wheel"
              src="https://anima-uploads.s3.amazonaws.com/projects/64480ae0ca3bfce771e46398/releases/6448516f8ae30cff1df92e11/img/wheel.svg"
              drag="x"
              animate={{ rotate: rotate ? 360 : 0 }}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                setRotate(!rotate);
              }}
            />
          </motion.div>
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
          </p>
          <Link to={ROUTES.PROMPT}>
            <img className="cat" alt={"Cat"} src={Cat} />
          </Link>
        </div>

        <div className="about-us">
          <div className="profile-page-div">--------------</div>
          <div className="about-us-line">
            <Link to={ROUTES.ABOUT}>
              <span>ABOUT SERENIFY (｡◕‿‿◕｡)</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
