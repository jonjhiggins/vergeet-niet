import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Navigation from "./components/Navigation";
import AddEditSongs from "./components/AddEditSongs";
import "./components/PageLayout.css";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Route
          exact
          path="/"
          render={routeProps => <UserProfile {...routeProps} username="jonjhiggins" />}
        />
        <Route path="/add" component={AddEditSongs} />
      </div>
    </Router>
  );
}

export default App;
