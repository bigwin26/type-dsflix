import React, { useState, useEffect, useCallback } from "react";
import SeeMorePresenter from "../../Components/SeeMore/SeeMorePresenter";
import * as Api from "../../lib/api";
import { withRouter } from "react-router-dom";

export default withRouter(({ match }) => {
  const { id } = match.params;
  const { url } = match;

  const [movieResult, setMovieResult] = useState([]);
  const [showResult, setShowResult] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MfetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (id === "nowplaying") {
        const {
          data: { results: nowplaying },
        } = await Api.movieApi.nowPlaying();
        setMovieResult(nowplaying);
        setTitle("Now Playing");
      } else if (id === "popular") {
        const {
          data: { results: popular },
        } = await Api.movieApi.popular();
        setMovieResult(popular);
        setTitle("Popular");
      } else if (id === "upcoming") {
        const {
          data: { results: upcoming },
        } = await Api.movieApi.upcoming();
        setMovieResult(upcoming);
        setTitle("Up Coming");
      }
    } catch (error) {
      setError("영화정보를 불러올 수 없습니다.");
    }
    setLoading(false);
  }, [id]);

  const SfetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (id === "TopRated") {
        const {
          data: { results: toprated },
        } = await Api.tvApi.topRated();
        setShowResult(toprated);
        setTitle("Top Rated");
      } else if (id === "AiringToday") {
        const {
          data: { results: airingtoday },
        } = await Api.tvApi.airingToday();
        setShowResult(airingtoday);
        setTitle("Airing Today");
      } else if (id === "Popular") {
        const {
          data: { results: popular },
        } = await Api.tvApi.popular();
        setShowResult(popular);
        setTitle("Popular");
      }
    } catch (error) {
      setError("영화정보를 불러올 수 없습니다.");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (url.includes("movies")) {
      MfetchData();
    }
    if (url.includes("shows")) {
      SfetchData();
    }
  }, []);

  return (
    <SeeMorePresenter
      movieResult={movieResult}
      showResult={showResult}
      title={title}
      loading={loading}
      error={error}
    />
  );
});
