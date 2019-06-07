import React, { useState, useEffect } from "react";
import Autocomplete from "accessible-autocomplete/react";
import "./Song.css";
import "accessible-autocomplete/src/autocomplete.css";

export default ({
  artistName = "",
  trackName = "",
  index,
  editing,
  handleChange
}) => {
  const [songData, setSongData] = useState({
    artistName,
    trackName
  });

  const artistFieldName = `artistName`;
  const trackFieldName = `trackName`;

  let controller = new AbortController();
  let signal = controller.signal;

  const handleSearch = (searchTerm, fieldName, callback) => {
    if (searchTerm.length < 3) {
      return;
    }

    if (
      fieldName === trackFieldName &&
      (songData.artistName === "" || !songData.artistName)
    ) {
      return;
    }

    const apiKey = "c425f3d0505cdb190f4db766b2fca747";
    const baseUrl = "http://ws.audioscrobbler.com/2.0/?method=";
    const urlArtist = `${baseUrl}artist.search&artist=${searchTerm}&api_key=${apiKey}&format=json`;
    const urlTrack = `${baseUrl}track.search&track=${searchTerm}&api_key=${apiKey}&artist=${
      songData.artistName
    }&format=json`;
    const url = fieldName === artistFieldName ? urlArtist : urlTrack;
    controller.abort();
    controller = new AbortController();
    signal = controller.signal;

    const request = new Request(url, { signal });
    return fetch(request)
      .then(response => response.json())
      .then(json => handleResponse(fieldName, json))
      .then(results => callback(results))
      .catch(handleFail);
  };

  const handleResponse = (fieldName, json, callback) => {
    try {
      const results = fieldName === artistFieldName
        ? json.results.artistmatches.artist
        : json.results.trackmatches.track;
      return results.map(item => item.name);
    } catch (e) {
      handleFail(e);
    }
  };

  // Pass state changes up to parent
  useEffect(() => {
    handleChange(index, songData)
  })

  const handleFail = e => {
    console.log(e);
  };

  const handleArtistSearch = (query, populateResults) => {
    handleSearch(query, artistFieldName, populateResults);
  };

  const handleTrackSearch = (query, populateResults) => {
    handleSearch(query, trackFieldName, populateResults);
  };

  const handleConfirm = (fieldName, value) => {
    if (!value || !fieldName) {
      return;
    }
    setSongData({
      ...songData,
      [fieldName]: value
    });
  };

  return (
    <section className="song">
      {editing && (
        <div>
          <label>
            Artist {index + 1}
            <Autocomplete
              onConfirm={handleConfirm.bind(null, artistFieldName)}
              name={artistFieldName}
              defaultValue={songData.artistName}
              data-index={index}
              source={handleArtistSearch}
            />
          </label>
          <label>
            Track {index + 1}
            <Autocomplete
              onConfirm={handleConfirm.bind(null, trackFieldName)}
              name={trackFieldName}
              defaultValue={songData.trackName}
              data-index={index}
              source={handleTrackSearch}
            />
          </label>
        </div>
      )}

      {!editing && artistName !== "" && (
        <p>
          <span>{artistName}</span> - <span>{trackName}</span>
        </p>
      )}
    </section>
  );
};
