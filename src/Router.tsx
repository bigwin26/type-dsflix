import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Loader from "Components/Common/Loader";
const Home = lazy(() => import("./Routes/Home"));
const Search = lazy(() => import("./Routes/Search"));
const TV = lazy(() => import("./Routes/TV"));
const Detail = lazy(() => import("./Routes/Detail"));
const SeeMore = lazy(() => import("./Routes/SeeMore"));
const Actor = lazy(() => import("./Routes/Actor"));
const Season = lazy(() => import("./Routes/Season"));

function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/show" component={TV} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/actor/:id" component={Actor} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route exact path="/show/:id" component={Detail} />
        <Route exact path="/show/:id/season/:number" component={Season} />
        <Route path="/movies/:id" component={SeeMore} />
        <Route path="/shows/:id" component={SeeMore} />
        <Redirect from="*" to="/" />
      </Switch>
    </Suspense>
  );
}

export default Router;
