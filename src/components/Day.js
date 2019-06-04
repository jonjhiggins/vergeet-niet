import React, { useState } from "react";
import "./Day.css";

export default () => {
  const [date, setDate] = useState("1986-10-17");

  const handleSubmit = e => {
    const dateValue = e.target.querySelector("input").value;
    setDate(dateValue);
    e.preventDefault();
  };

  const handleEdit = e => {
    setDate();
  }

  return (
    <article className="day">
      <header className="date">
        {!date && (
          <form className="date-form" onSubmit={handleSubmit}>
            <label>
              Date
              <input type="date" required min="1998-01-01" max="2098-01-01"/>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
        {date && (
          <button className="date-text" type="button" onClick={handleEdit}>
            {date}{" "}
            <span role="img" aria-label="Edit">
              ✏️
            </span>
          </button>
        )}
      </header>
    </article>
  );
};
