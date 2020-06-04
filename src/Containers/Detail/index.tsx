import React, { useState, useEffect, useCallback } from "react";
import DetailPresenter from "../../Components/Detail/DetailPresenter";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailInit, showDetailInit } from "modules/detail";
import { RootState } from "modules";
import { languageCheck } from "modules/modal";

export default withRouter(({ history, location, match }) => {
  const { id } = match.params;
  const { push } = history;
  const { pathname } = location;
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { result, cast, similar, detailError, loading } = useSelector(
    ({
      detail: { result, cast, similar, detailError },
      loading,
    }: RootState) => ({
      result,
      cast,
      similar,
      detailError,
      loading:
        loading["detail/MOVIE_DETAIL_INIT"] ||
        loading["detail/SHOW_DETAIL_INIT"],
    }),
  );

  const setData = useCallback(
    async (id: number) => {
      if (pathname.includes("/movie/")) {
        dispatch(movieDetailInit(id));
      } else if (pathname.includes("/show/")) {
        dispatch(showDetailInit(id));
      }
    },
    [pathname, dispatch],
  );

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) return;
    dispatch(languageCheck(language));
    if (isNaN(parseInt(id))) {
      push("/");
    }
    setData(parseInt(id));
  }, [id, push, setData, dispatch]);

  useEffect(() => {
    if (detailError) {
      setError("정보를 불러올 수 없습니다.");
    }
  }, [detailError]);

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
