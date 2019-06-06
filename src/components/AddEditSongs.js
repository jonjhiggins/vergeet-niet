import React from "react";
import Day from "./Day";

export default () => {
  return (
    <div className="page-layout">
      <h1>Add Songs</h1>
      <Day editing={true} fullscreen={true} />
    </div>
  );
};
