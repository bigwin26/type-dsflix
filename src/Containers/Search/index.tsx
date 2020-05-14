import React, { useState } from "react";
import SearchPresenter from "../../Components/Search/SearchPresenter";
import * as Api from "../../lib/api";
import { useCallback } from "react";

export default () => {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm !== ("" || undefined)) {
      setSearchTerm(e.currentTarget.value);
      searchByTerm();
    }
  };

  const searchByTerm = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { results: movieResult },
      } = await Api.movieApi.search(searchTerm);
      setMovieResults(movieResult);

      const {
        data: { results: tvResult },
      } = await Api.tvApi.search(searchTerm);
      setTvResults(tvResult);
    } catch (error) {
      setError("해당 정보를 찾지 못했습니다.");
    }
    setLoading(false);
  }, [searchTerm]);

  const updateTerm = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchTerm(value);
  }, []);

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
      searchTerm={searchTerm}
      loading={loading}
      error={error}
    />
  );
};
