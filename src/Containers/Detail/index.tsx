import React, { useState, useEffect, useCallback } from "react";
import DetailPresenter from "../../Components/Detail/DetailPresenter";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetail,
  getShowDetail,
  getCast,
  getSimilar,
  cleanUp,
} from "modules/detail";
import { RootState } from "modules";

export default withRouter(({ history, location, match }) => {
  const { id } = match.params;
  const { push } = history;
  const { pathname } = location;
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { result, cast, similar, error } = useSelector(
    ({ detail: { result, cast, similar, error } }: RootState) => ({
      result,
      cast,
      similar,
      error,
    }),
  );

  const setData = useCallback(
    async (id: number) => {
      setLoading(true);
      if (pathname.includes("/movie/")) {
        dispatch(getMovieDetail(id));
        dispatch(getCast(id));
        dispatch(getSimilar(id));
      } else if (pathname.includes("/show/")) {
        dispatch(getShowDetail(id));
      }
    },
    [pathname, dispatch],
  );

  useEffect(() => {
    if (isNaN(parseInt(id))) {
      push("/");
    }
    setData(parseInt(id));

    return () => {
      dispatch(cleanUp());
    };
  }, [id, push, setData, dispatch]);

  useEffect(() => {
    if ((result && similar && cast) !== null) {
      setLoading(false);
    }
  }, [result, similar, cast]);

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
