import React, { useState, useEffect, useCallback } from "react";
import DetailPresenter from "../../Components/Detail/DetailPresenter";
import { withRouter } from "react-router-dom";
import * as Api from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { getResult, getCast, getSimilar, cleanUp } from "modules/detail";
import { RootState } from "modules";

export default withRouter(({ history, location, match }) => {
  const { id } = match.params;
  const { push } = history;
  const { pathname } = location;

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { result, cast, similar } = useSelector(
    ({ detail: { result, cast, similar } }: RootState) => ({
      result,
      cast,
      similar,
    }),
  );

  const setData = useCallback(async () => {
    try {
      setLoading(true);
      if (pathname.includes("/movie/")) {
        const { data: movieDetail } = await Api.movieApi.movieDetail(id);
        dispatch(getResult(movieDetail));
        const {
          data: { cast },
        } = await Api.movieApi.credits(id);
        dispatch(getCast(cast));
        const {
          data: { results: similarList },
        } = await Api.movieApi.similar(id);
        dispatch(getSimilar(similarList));
      } else if (pathname.includes("/show/")) {
        const { data: showDetail } = await Api.tvApi.tvDetail(id);
        dispatch(getResult(showDetail));
      }
    } catch (error) {
      setError("존재하지 않는 정보입니다.");
    }
    setLoading(false);
  }, [id, pathname, dispatch]);

  useEffect(() => {
    if (isNaN(parseInt(id))) {
      push("/");
    }
    setData();
    return ()=>{dispatch(cleanUp());}
  }, [id, push, setData,dispatch]);

  return (
    <DetailPresenter
      result={result}
      similar={similar}
      cast={cast}
      error={error}
      loading={loading}
    />
  );
});
