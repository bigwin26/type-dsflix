import React, { useState, useEffect } from "react";
import SeasonPresenter from "Components/TV/Season/SeasonPresenter";
import { withRouter } from "react-router-dom";
import { RootState } from "modules";
import { useSelector, useDispatch } from "react-redux";
import { getSeason } from "modules/show";
import { languageCheck } from "modules/modal";

export default withRouter(({ match }) => {
  const dispatch = useDispatch();
  const { season, showError, loading } = useSelector(
    ({ show, loading }: RootState) => ({
      season: show.season,
      showError: show.showError,
      loading: loading["show/GET_SEASON"],
    }),
  );
  const [error, setError] = useState("");
  const { id, number } = match.params;

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) return;
    dispatch(languageCheck(language));
    dispatch(getSeason(id, number));
  }, [dispatch, id, number]);

  useEffect(() => {
    if (showError) {
      setError("시즌정보를 불러올 수 없습니다.");
    }
  }, [showError]);

  return <SeasonPresenter season={season} loading={loading} error={error} />;
});
