import React from "react";
import ActivityFeed from "./components/ActivityFeed.js";
import ActivityDetail from "./components/ActivityDetail";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <BrowserRouter>
            <div>
              <Route path="/" exact component={ActivityFeed} />
              <Route path="/detail/:id" exact component={ActivityDetail} />
            </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
