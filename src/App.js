import "./App.css";
import Main from "./components/Main";
import Card from "./components/Card";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/card" component={Card} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
      
    </div>
  );
}

export default App;
