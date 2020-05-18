import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Horizon from "../Common/Horizon";
import Message from "../Common/Message";
import Poster from "../Common/Poster";
import Loader from "../Common/Loader";

const Container = styled.div`
  padding: 0px 10px 0px 30px;
  @media (max-width: 768px) {
    padding: 0px 10px 0px 10px;
  }
`;

interface ITV {
  topRated: Array<{
    id: number;
    poster_path: string;
    name: string;
    vote_average?: number;
    first_air_date: string;
  }> | null;
  popular: Array<{
    id: number;
    poster_path: string;
    name: string;
    vote_average?: number;
    first_air_date: string;
  }> | null;
  airingToday: Array<{
    id: number;
    poster_path: string;
    name: string;
    vote_average?: number;
    first_air_date: string;
  }> | null;
  loading: boolean;
  error: string;
}

const TVPresenter = ({
  topRated,
  popular,
  airingToday,
  loading,
  error,
}: ITV) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading... | DSflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color={"red"} />
  ) : (
    <Container>
      <Helmet>
        <title>TV Show | DSflix</title>
      </Helmet>
      {topRated && topRated.length > 0 && (
        <Horizon title="Top Rated" path="/shows/TopRated">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Horizon>
      )}
      {airingToday && airingToday.length > 0 && (
        <Horizon title="Airing Today" path="/shows/AiringToday">
          {airingToday.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Horizon>
      )}
      {popular && popular.length > 0 && (
        <Horizon title="Popular" path="/shows/Popular">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Horizon>
      )}
      {error && <Message text={error} color={"#e74c3c"} />}
    </Container>
  );
};

export default TVPresenter;
