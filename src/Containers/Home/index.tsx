import React, { useState, useEffect } from "react";
import HomePresenter from "../../Components/Home/HomePresenter";
import * as Api from "../../lib/api";

export default () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const {
          data: { results: nowplaying },
        } = await Api.movieApi.nowPlaying();
        setNowPlaying(nowplaying);
        const {
          data: { results: popular },
        } = await Api.movieApi.popular();
        setPopular(popular);
        const {
          data: { results: upcoming },
        } = await Api.movieApi.upcoming();
        setUpcoming(upcoming);
      } catch (error) {
        setError("영화정보를 불러올 수 없습니다.");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      popular={popular}
      upcoming={upcoming}
      loading={loading}
      error={error}
    />
  );
};
