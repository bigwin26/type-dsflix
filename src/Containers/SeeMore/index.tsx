import React, { useState, useEffect } from "react";
import SeeMorePresenter from "../../Components/SeeMore/SeeMorePresenter";
import * as Api from "../../lib/api";
import { withRouter } from "react-router-dom";

export default withRouter(({match}) => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const {id} = match.params;
    async function fetchData() {
      setLoading(true);
      try {
        if(id === 'nowplaying'){
        const {
          data: { results: nowplaying },
        } = await Api.movieApi.nowPlaying();
        setNowPlaying(nowplaying);
      } else if(id === 'popular'){
        const {
          data: { results: popular },
        } = await Api.movieApi.popular();
        setPopular(popular);
      } else if(id === 'upcoming'){
        const {
          data: { results: upcoming },
        } = await Api.movieApi.upcoming();
        setUpcoming(upcoming);
      }
      } catch (error) {
        setError("영화정보를 불러올 수 없습니다.");
      }
      setLoading(false);
    }
    fetchData();
  }, [match.params]);

  return (
    <SeeMorePresenter
      nowPlaying={nowPlaying}
      popular={popular}
      upcoming={upcoming}
      loading={loading}
      error={error}
    />
  );
});
