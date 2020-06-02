import React, { useState, useEffect, useCallback } from "react";
import HomePresenter from "../../Components/Home/HomePresenter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "modules";
import { init } from "modules/movie";

export default () => {
  const dispatch = useDispatch();
  const { nowPlaying, popular, upcoming, movieError, loading } = useSelector(
    ({ movie, loading }: RootState) => ({
      nowPlaying: movie.nowPlaying,
      popular: movie.popular,
      upcoming: movie.upComing,
      loading: loading["movie/INIT"],
      movieError: movie.movieError,
    }),
  );
  const [mainMovie, setMainMovie] = useState(null);
  const [error, setError] = useState("");

  const getRandomNumber = (number: number) => {
    const random = Math.floor(Math.random() * number);
    return random;
  };

  const getMainMovie = useCallback((movies) => {
    const filterdMovie = movies.filter(
      (movie: any) => movie.backdrop_path !== null,
    );
    const number = getRandomNumber(filterdMovie.length);
    const movie = filterdMovie[number];
    setMainMovie(movie);
  }, []);

  useEffect(() => {
    if ((nowPlaying && upcoming && popular) === null) {
      dispatch(init());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (nowPlaying !== null) {
      getMainMovie(nowPlaying);
    }
    if (movieError) {
      setError("영화목록을 불러올 수 없습니다.");
    }
  }, [getMainMovie, nowPlaying, movieError]);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      popular={popular}
      upcoming={upcoming}
      mainMovie={mainMovie}
      loading={loading}
      error={error}
    />
  );
};
