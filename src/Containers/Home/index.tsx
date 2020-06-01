import React, { useState, useEffect, useCallback } from "react";
import HomePresenter from "../../Components/Home/HomePresenter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "modules";
import { init } from "modules/movie";

export default () => {
  const dispatch = useDispatch();
  const { nowPlaying, popular, upcoming, error } = useSelector(
    ({ movie }: RootState) => ({
      nowPlaying: movie.nowPlaying,
      popular: movie.popular,
      upcoming: movie.upComing,
      error: movie.error,
    }),
  );
  const [mainMovie, setMainMovie] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      dispatch(init());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (upcoming !== null) {
      getMainMovie(upcoming);
    }
    if (nowPlaying && upcoming && popular !== null) {
      setLoading(false);
    }
  }, [getMainMovie, upcoming, nowPlaying, popular]);

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
