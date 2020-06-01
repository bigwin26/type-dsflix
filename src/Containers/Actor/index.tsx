import React, { useState, useEffect } from "react";
import ActorPresenter from "Components/Actor/ActorPresenter";
import { actorApi } from "../../lib/api";
import { withRouter } from "react-router-dom";

export default withRouter(({ match }) => {
  const { id } = match.params;
  const [result, setResult] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await actorApi.actor(id);
        setResult(data);
        const {
          data: { cast },
        } = await actorApi.movie_credits(id);
        setMovies(cast);
      } catch (error) {
        setError("배우정보를 불러올 수 없습니다.");
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <ActorPresenter
      result={result}
      movies={movies}
      loading={loading}
      error={error}
    />
  );
});
