import React, { useState, useEffect } from "react";
import TVPresenter from "../../Components/TV/TVPresenter";
import * as Api from "../../lib/api";

export default () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const {
          data: { results: topRated },
        } = await Api.tvApi.topRated();
        setTopRated(topRated);
        const {
          data: { results: popular },
        } = await Api.tvApi.popular();
        setPopular(popular);
        const {
          data: { results: airingToday },
        } = await Api.tvApi.airingToday();
        setAiringToday(airingToday);
      } catch (error) {
        setError("TV정보를 불러올 수 없습니다.");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
};
