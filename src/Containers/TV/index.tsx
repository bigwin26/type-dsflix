import React, { useState, useEffect, useCallback } from "react";
import TVPresenter from "../../Components/TV/TVPresenter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { init } from "modules/show";
import { languageCheck } from "modules/modal";

export default () => {
  const dispatch = useDispatch();
  const { topRated, airingToday, popular, showError, loading } = useSelector(
    ({ show, loading }: RootState) => ({
      topRated: show.topRated,
      airingToday: show.airingToday,
      popular: show.popular,
      showError: show.showError,
      loading: loading["show/INIT"],
    }),
  );
  const [mainShow, setMainShow] = useState(null);
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");

  const getRandomNumber = (number: number) => {
    const random = Math.floor(Math.random() * number);
    return random;
  };

  const getMainShow = useCallback((shows) => {
    const filterdShow = shows.filter(
      (show: any) => show.backdrop_path !== null,
    );
    const number = getRandomNumber(filterdShow.length);
    const show = filterdShow[number];
    setMainShow(show);
  }, []);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) return;
    setLanguage(language);
    dispatch(languageCheck(language));
    if ((topRated && airingToday && popular) === null) {
      dispatch(init());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (popular !== null) {
      getMainShow(popular);
    }
    if (showError) {
      setError("프로그램 목록을 불러올 수 없습니다.");
    }
  }, [getMainShow, popular, showError]);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      mainShow={mainShow}
      loading={loading}
      error={error}
      language={language}
    />
  );
};
