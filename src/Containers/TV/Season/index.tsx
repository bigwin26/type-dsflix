import React, { useState, useEffect } from "react";
import SeasonPresenter from "Components/TV/Season/SeasonPresenter";
import * as Api from "../../../lib/api";
import { withRouter } from "react-router-dom";

export default withRouter(({match,history,location}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {id,number} = match.params;
  console.log(match,history,location);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const {data} = await Api.tvApi.season(id,number);
        setResult( data );
      } catch (error) {
          console.log(error);
        setError("정보를 불러올 수 없습니다.");
      }
      setLoading(false);
    }
    fetchData();
  }, [id, number]);

    return <SeasonPresenter result={result} loading={loading} error={error}/> 
})