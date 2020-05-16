import React, { useState, useEffect, useCallback } from "react";
import DetailPresenter from "../../Components/Detail/DetailPresenter";
import { withRouter } from "react-router-dom";
import * as Api from "../../lib/api";

export default withRouter(({ history, location, match }) => {
  const { id } = match.params;
  const { push } = history;
  const { pathname } = location;

  const [result, setResult] = useState(null);
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState("Similar");

  const setData = useCallback(async () => {
    try {
      setLoading(true);
      if (pathname.includes("/movie/")) {
        const { data: movieDetail } = await Api.movieApi.movieDetail(id);
        setResult(movieDetail);
        const { data:{cast}} = await Api.movieApi.credits(id);
        setCast(cast);
        const { data:{results:similarList}} = await Api.movieApi.similar(id);
        console.log(similarList);
        setSimilar(similarList);
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
      similar={similar}
      cast={cast}
      error={error}
      loading={loading}
      handleOnClick={handleOnClick}
      visible={visible}
    />
  );
});
