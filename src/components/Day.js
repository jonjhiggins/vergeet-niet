import React, { useState } from "react";
import Date from "./Date";
import Song from "./Song";
import "./Day.css";

/**
 * Container for a number of songs for a specific date.
 */
export default () => {
  const [dayData, setDayData] = useState({
    dirty: true,
    date: "",
    songs: [
      {
        artistName: "",
        songName: ""
      }
    ]
  });

  const tempDayData = Object.assign({}, dayData);

  const handleSubmit = e => {
    setDayData({
      ...dayData,
      ...tempDayData,
      dirty: false
    });
    e.preventDefault();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const isArtistName = name.search("artistName");
    const isSongName = name.search("songName");
    if (isArtistName < 0 && isSongName < 0) {
      tempDayData[name] = value;
      return;
    }
    // Handle song fields differently as they are in array
    const index = name.replace(/artistName|songName/, "");
    const fieldName = isArtistName ? "artistName" : "songName";
    tempDayData.songs[index][fieldName] = value;
    
  };

  const handleEdit = e => {
    setDayData({
      ...dayData,
      dirty: true
    });
  };
  return (
    <article className="day">
      <form className="day-form" onSubmit={handleSubmit}>
        <Date
          date={dayData.date}
          editing={dayData.dirty}
          handleChange={handleChange}
        />
        <div className="songs">
          {dayData.songs.map(({artistName, songName}, index) => (
            <Song
              handleChange={handleChange}
              editing={dayData.dirty}
              artistName={artistName}
              songName={songName}
              key={index}
              index={index}
            />
          ))}
        </div>
        <footer className="submit-footer">
          {dayData.dirty && (
            <button type="submit">
              <span role="presentation">✔</span> Save
            </button>
          )}
          {!dayData.dirty && (
            <button type="button" onClick={handleEdit}>
              <span role="presentation">✎</span> Edit
            </button>
          )}
        </footer>
      </form>
    </article>
  );
};
