import React from "react";
import "./Song.css";

export default ({ artistName, songName, index, editing, handleChange }) => {
  const artistFieldName = `artistName${index}`
  const songFieldName = `songName${index}`
  return (
    <section className="song">
      {editing && (
        <div>
          <label>
            Artist { index + 1 }
            <input
              type="text"
              name={artistFieldName}
              defaultValue={artistName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Song { index + 1 }
            <input
              type="text"
              name={songFieldName}
              defaultValue={songName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      )}

      {!editing && (
        <p>
          <span>{artistName}</span> - <span>{songName}</span>
        </p>
      )}
    </section>
  );
};
