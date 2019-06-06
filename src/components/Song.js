import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import "./Song.css";

export default ({
  artistName = "",
  trackName = "",
  index,
  editing,
  handleChange
}) => {
  const [songData, setSongData] = useState({
    artistName,
    trackName,
    autocomplete: {
      artistName: [],
      trackName: []
    }
  });

  const artistFieldName = `artistName`;
  const trackFieldName = `trackName`;

  let controller = new AbortController();
  let signal = controller.signal;

  let keyupTimeout = null;

  const handleKeyup = e => {
    clearTimeout(keyupTimeout);
    controller.abort();
    const searchTerm = e.target.value;
    const fieldName = e.target.name;
    keyupTimeout = setTimeout(() => {
      handleSearch(searchTerm, fieldName);
    }, 300);
  };

  const handleInputChange = e => {
    setSongData({
      ...songData,
      [e.target.name]: e.target.value,
      autocomplete: {
        ...songData.autocomplete,
        [e.target.name]: []
      }
    });
    handleChange(e);
  };

  const handleSearch = (searchTerm, fieldName) => {
    if (searchTerm.length < 3) {
      return;
    }
    if (fieldName === trackFieldName && songData.artistName === "") {
      return;
    }

    const apiKey = "c425f3d0505cdb190f4db766b2fca747";
    const baseUrl = "http://ws.audioscrobbler.com/2.0/?method=";
    const urlArtist = `${baseUrl}artist.search&artist=${searchTerm}&api_key=${apiKey}&format=json`;
    const urlTrack = `${baseUrl}track.search&track=${searchTerm}&api_key=${apiKey}&artist=${
      songData.artistName
    }&format=json`;
    const url = fieldName === artistFieldName ? urlArtist : urlTrack;
    controller = new AbortController();
    signal = controller.signal;

    const request = new Request(url, { signal });
    fetch(request)
      .then(response => response.json())
      .then(json => handleResponse(fieldName, json))
      .catch(handleFail);
  };

  const handleResponse = (fieldName, json) => {
    try {
      setSongData({
        ...songData,
        autocomplete: {
          ...songData.autocomplete,
          artistName:
            fieldName === artistFieldName
              ? json.results.artistmatches.artist
              : [],
          trackName:
            fieldName === trackFieldName ? json.results.trackmatches.track : []
        }
      });
    } catch (e) {
      handleFail(e);
    }
  };

  const handleFail = e => {
    setSongData({
      ...songData,
      autocomplete: {
        ...songData.autocomplete,
        artistName: [],
        trackName: []
      }
    });
    console.log(e);
  };

  const setArtist = artist => {
    setSongData({
      ...songData,
      artistName: artist,
      autocomplete: {
        ...songData.autocomplete,
        artistName: []
      }
    });
  };

  const setSong = song => {
    setSongData({
      ...songData,
      trackName: song,
      autocomplete: {
        ...songData.autocomplete,
        trackName: []
      }
    });
  };

  return (
    <section className="song">
      {editing && (
        <div>
          <label>
            Artist {index + 1}
            <input
              type="text"
              name={artistFieldName}
              onKeyUp={handleKeyup}
              data-index={index}
              value={songData.artistName}
              onChange={handleInputChange}
              autoComplete={"off"}
            />
            {songData.autocomplete.artistName.length > 0 && (
              <Autocomplete
                autocompleteItems={songData.autocomplete.artistName}
                handleClick={setArtist}
              />
            )}
          </label>
          <label>
            Track {index + 1}
            <input
              type="text"
              name={trackFieldName}
              onKeyUp={handleKeyup}
              data-index={index}
              value={songData.trackName}
              onChange={handleInputChange}
              autoComplete={"off"}
            />
            {songData.autocomplete.trackName.length > 0 && (
              <Autocomplete
                autocompleteItems={songData.autocomplete.trackName}
                handleClick={setSong}
              />
            )}
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
