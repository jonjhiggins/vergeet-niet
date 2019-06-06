import React, { useState } from "react";
import DateBlock from "./Date";
import Song from "./Song";
import firebase from "../firebase";
import "./Day.css";

/**
 * Container for a number of songs for a specific date.
 */
export default ({ editing, fullscreen, day }) => {
  const getDate = dateObj => {
    try {
      return dateObj.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };
  const [dayData, setDayData] = useState({
    dirty: editing,
    date: day ? getDate(new Date(day.date.toDate())) : getDate(new Date()),
    songs: day
      ? day.songs
      : [
          {
            artistName: "",
            trackName: ""
          },
          {
            artistName: "",
            trackName: ""
          },
          {
            artistName: "",
            trackName: ""
          },
          {
            artistName: "",
            trackName: ""
          },
          {
            artistName: "",
            trackName: ""
          }
        ]
  });

  const tempDayData = Object.assign({}, dayData);

  const handleSubmit = e => {
    e.preventDefault();
    setDayData({
      ...dayData,
      ...tempDayData,
      dirty: false
    });
    const db = firebase.firestore();
    db.collection("users")
      .doc("jonjhiggins")
      .collection("days")
      .doc(dayData.date)
      .set({
        date: firebase.firestore.Timestamp.fromDate(new Date(dayData.date)),
        songs: dayData.songs
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const isArtistName = name.search("artistName") === 0;
    const istrackName = name.search("trackName") === 0;
    if (!isArtistName && !istrackName) {
      tempDayData[name] = value;
      return;
    }
    // Handle track fields differently as they are in array
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const fieldName = isArtistName ? "artistName" : "trackName";
    tempDayData.songs[index][fieldName] = value;
  };

  const handleEdit = e => {
    setDayData({
      ...dayData,
      dirty: true
    });
  };
  return (
    <form
      className={`day-form ${fullscreen ? "day-form-fullscreen" : ""}`}
      onSubmit={handleSubmit}
    >
      <DateBlock
        date={dayData.date}
        editing={dayData.dirty}
        handleChange={handleChange}
      />
      <div className="songs">
        {dayData.songs.map(({ artistName, trackName }, index) => (
          <Song
            handleChange={handleChange}
            editing={dayData.dirty}
            artistName={artistName}
            trackName={trackName}
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
  );
};
