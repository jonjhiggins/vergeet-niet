import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Songs</Link>
        </li>
      </ul>
    </nav>
  );
};
