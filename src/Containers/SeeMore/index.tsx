import React, { useState, useEffect, useCallback } from "react";
import SeeMorePresenter from "../../Components/SeeMore/SeeMorePresenter";
import * as Api from "../../lib/api";
import { withRouter } from "react-router-dom";

export default withRouter(({ match }) => {
  const { id } = match.params;
  const { url } = match;

  const [movieResult, setMovieResult] = useState<any[]>([]);
  const [showResult, setShowResult] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(2);

  const MfetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (id === "nowplaying") {
        for (let index = 1; index < 3; index++) {
          const {
            data: { results: nowplaying },
          } = await Api.movieApi.nowPlaying(index);
          nowplaying.map((movie: any) => movieResult.push(movie));
          setMovieResult(movieResult);
        }
        console.log(movieResult);
        setTitle("Now Playing");
      } else if (id === "popular") {
        const {
          data: { results: popular },
        } = await Api.movieApi.popular();
        popular.map((movie: any) => movieResult.push(movie));
        setMovieResult(movieResult);
        setTitle("Popular");
      } else if (id === "upcoming") {
        const {
          data: { results: upcoming },
        } = await Api.movieApi.upcoming();
        upcoming.map((movie: any) => movieResult.push(movie));
        setMovieResult(movieResult);
        setTitle("Up Coming");
      }
    } catch (error) {
      setError("영화정보를 불러올 수 없습니다.");
    }
    setLoading(false);
  }, [id, movieResult]);

  const SfetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (id === "topRated") {
        const {
          data: { results: toprated },
        } = await Api.tvApi.topRated();
        setShowResult(toprated);
        setTitle("Top Rated");
      } else if (id === "airingToday") {
        const {
          data: { results: airingtoday },
        } = await Api.tvApi.airingToday();
        setShowResult(airingtoday);
        setTitle("Airing Today");
      } else if (id === "popular") {
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

  const infiniteScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight + 10 >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (url.includes("movies")) {
      MfetchData();
    }
    if (url.includes("shows")) {
      SfetchData();
    }
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
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
