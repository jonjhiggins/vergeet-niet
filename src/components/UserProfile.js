import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Day from "./Day";

export default ({ username }) => {
  const [daysList, setDaysList] = useState([]);

  useEffect(() => {
    const getDays = username => {
      const db = firebase.firestore();
      const songsRef = db
        .collection("users")
        .doc(username)
        .collection("days");
      songsRef
        .get()
        .then(snapshot => {
          const docs = snapshot.docs.map(doc => doc.data())
          setDaysList(docs);
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    };
    getDays(username);
  }, [username]);

  return (
    <div className="page-layout">
      <h1>{username}</h1>
      {daysList.map((day, index) => {
        return <Day day={day} editing={false} fullscreen={false} key={index} />;
      })}
    </div>
  );
};
