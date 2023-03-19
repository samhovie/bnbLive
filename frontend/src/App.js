import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { Route } from "react-router";
import SpotPage from "./components/SpotPage"
import SpotForm from "./components/SpotForm"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="page-container">
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/spots/:spotId">
            <SpotPage />
          </Route>

        </Switch>
      )}
      </div>
    </>
  );
}

export default App;
