import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";

import EntityDetail from "./components/EntityDetail";
import Homepage from "./components/homepage";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route path="/detail/:id" component={EntityDetail} />
      </Router>
    </div>
  );
}

export default App;
