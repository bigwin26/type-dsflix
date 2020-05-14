import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";
import Detail from "./Routes/Detail";
import SeeMore from "./Routes/SeeMore";

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/show" component={TV} />
      <Route exact path="/search" component={Search} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Route path="/movies/:id" component={SeeMore}/>
      <Route path="/shows/:id" component={SeeMore}/>
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default Router;
