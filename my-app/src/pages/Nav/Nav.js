import React from "react";
import * as ROUTES from "../../constants/routes";

export default function Nav(props) {
  return (
    <>
      <nav>
        <p>Put Logo Here</p>
        <input type="text" placeholder="Search"></input>
        <ul class="navbar-nav ml-auto">
          <li>
            <a href="/Home">Community</a>
          </li>
          <li>
            <a href={ROUTES.RESOURCES}>Resources</a>
          </li>
          <li>
            <a href={ROUTES.USER}>User</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
