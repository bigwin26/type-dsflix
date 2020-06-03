import React, { useState, useEffect } from "react";
import ActorPresenter from "Components/Actor/ActorPresenter";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { init } from "modules/actor";
import { languageCheck } from "modules/modal";

export default withRouter(({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { actor, movies, shows, actorError, loading } = useSelector(
    ({ actor, loading }: RootState) => ({
      actor: actor.actor,
      movies: actor.movies,
      shows: actor.shows,
      actorError: actor.actorError,
      loading: loading["actor/INIT"],
    }),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) return;
    dispatch(languageCheck(language));
    dispatch(init(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (actorError) {
      setError("배우정보를 불러올 수 없습니다.");
    }
  }, [actorError]);

  return (
    <ActorPresenter
      actor={actor}
      movies={movies}
      shows={shows}
      loading={loading}
      error={error}
    />
  );
});
