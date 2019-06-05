import React from "react";
import "./Date.css";

/**
 * Add / display / edit a date
 */
export default ({ date, editing, handleChange }) => {
  return (
    <header className="date">
      {editing && (
        <label>
          Date
          <input type="date" name="date" defaultValue={date} required min="1998-01-01" max="2098-01-01" onChange={handleChange}/>
        </label>
      )}
      {!editing && (
        <p className="date-text">{date}</p>
      )}
    </header>
  );
};
