import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";
import Detail from "./Routes/Detail";
import SeeMore from "./Routes/SeeMore";
import Actor from './Routes/Actor'
import Season from './Routes/Season'

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/show" component={TV} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/actor/:id" component={Actor}/>
      <Route exact path="/movie/:id" component={Detail} />
      <Route exact path="/show/:id" component={Detail}/>
      <Route exact path="/show/:id/season/:number" component={Season} />
      <Route path="/movies/:id" component={SeeMore} />
      <Route path="/shows/:id" component={SeeMore} />
      <Redirect from="*" to="/" />
      </Switch>
  );
}

export default Router;
