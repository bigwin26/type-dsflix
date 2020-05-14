import React, { useState, useEffect, useCallback } from "react";
import DetailPresenter from "../../Components/Detail/DetailPresenter";
import { withRouter } from "react-router-dom";
import * as Api from "../../lib/api";

export default withRouter(({ history, location, match }) => {
  const { id } = match.params;
  const { push } = history;
  const { pathname } = location;

  const [result, setResult] = useState(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState("Production");

  const setData = useCallback(async () => {
    try {
      setLoading(true);
      if (pathname.includes("/movie/")) {
        const { data: movieDetail } = await Api.movieApi.movieDetail(id);
        setResult(movieDetail);
      } else if (pathname.includes("/show/")) {
        const { data: showDetail } = await Api.tvApi.tvDetail(id);
        setResult(showDetail);
      }
    } catch (error) {
      setError("존재하지 않는 정보입니다.");
    }
    setLoading(false);
  }, [id, pathname]);

  const handleOnClick = (event:React.MouseEvent<HTMLLIElement>) => {
    setVisible(event.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (isNaN(parseInt(id))) {
      push("/");
    }
    if (result === null) {
      setData();
    }
  }, [id, push, result, setData]);

  return (
    <DetailPresenter
      result={result}
      error={error}
      loading={loading}
      handleOnClick={handleOnClick}
      visible={visible}
    />
  );
});
