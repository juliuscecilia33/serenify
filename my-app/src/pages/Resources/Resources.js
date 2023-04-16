import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import Nav from "../Nav/Nav.js";

export function Resources() {
  return (
    <>
      {/* <header> */}
      {/* <Nav /> */}
      {/* </header> */}

      <body>
        <div className="post">
          <div className="post-text">
            <h1>Put picture here</h1>
            <h1>Title of the article</h1>
            <p className="body-2">1 day ago</p>
            <p>
              I’m having a hard time falling asleep. Tried to stay away from my
              phone before I go to bed, but it doesn’t help. I should probably
              buy over-the-counter medications, however, I hope to stay away
              from any kinds of medications and fall asleep naturally. Anyone
              have ideas on how to approach this...
            </p>
          </div>
        </div>

        <div className="post">
          <div className="post-text">
            <h1>Put picture here</h1>
            <h1>Title of the event</h1>
            <p className="body-2">1 day ago</p>
            <p>
              Lorem Ipsum comes from a latin text written in 45BC by Roman
              statesman, lawyer, scholar, and philosopher, Marcus Tullius
              Cicero. The text is titled "de Finibus Bonorum et Malorum" which
              means "The Extremes of Good and Evil". The most common form of
              Lorem ipsum is the following...
            </p>
          </div>
        </div>
      </body>
    </>
  );
}
