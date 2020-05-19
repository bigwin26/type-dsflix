import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Section from "../Common/Section";
import Loader from "../Common/Loader";
import Message from "../Common/Message";
import Poster from "../Common/Poster";

const Container = styled.div`
  padding: 0px 10px 0px 30px;
  @media (max-width: 768px) {
    padding: 0px 10px 0px 10px;
  }
`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface Show {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

interface Ihome {
  movieResult: Array<Movie>;
  showResult: Array<Show>;
  title: string;
  loading: Boolean;
  error: String;
}

export default function HomePresenter({
  movieResult,
  showResult,
  title,
  loading,
  error,
}: Ihome) {
  return loading ? (
    <>
      <Helmet>
        <title>Loading... | DSflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>Movies | DSflix</title>
      </Helmet>
      {movieResult && movieResult.length > 0 && (
        <Section title={title}>
          {movieResult.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
       {showResult && showResult.length > 0 && (
        <Section title={title}>
          {showResult.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message text={error} color={"#e74c3c"} />}
    </Container>
  );
}
