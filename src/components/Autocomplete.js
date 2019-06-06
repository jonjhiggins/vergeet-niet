import React from "react";
import "./Autocomplete.css";

export default ({ autocompleteItems, handleClick }) => {
  return (
    <div
      className="autocomplete"
      hidden={autocompleteItems <= 0}
    >
      <ul>
        {autocompleteItems.map((item, index) => {
          return (
            <li key={index}>
              <button type="button" onClick={handleClick.bind(null, item.name)}>
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
