import React from "react";
import "./Song.css";

export default ({ artistName, songName, index, editing, handleChange }) => {
  const artistFieldName = `artistName`
  const songFieldName = `songName`
  return (
    <section className="song">
      {editing && (
        <div>
          <label>
            Artist { index + 1 }
            <input
              type="text"
              name={artistFieldName}
              data-index={index}
              defaultValue={artistName}
              onChange={handleChange}
            />
          </label>
          <label>
            Song { index + 1 }
            <input
              type="text"
              name={songFieldName}
              data-index={index}
              defaultValue={songName}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

      {!editing && artistName !== '' && (
        <p>
          <span>{artistName}</span> - <span>{songName}</span>
        </p>
      )}
    </section>
  );
};
