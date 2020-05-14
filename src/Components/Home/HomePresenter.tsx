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

interface Object {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface Ihome {
  nowPlaying: Array<Object>;
  popular: Array<Object>;
  upcoming: Array<Object>;
  loading: Boolean;
  error: String;
}

export default function HomePresenter({
  nowPlaying,
  popular,
  upcoming,
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
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing" path="/movies/nowplaying">
          {nowPlaying.map((movie) => (
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
      {upcoming && upcoming.length > 0 && (
        <Section title="Up Coming" path="/movies/upcoming">
          {upcoming.map((movie) => (
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
      {popular && popular.length > 0 && (
        <Section title="Popular" path="/movies/popular">
          {popular.map((movie) => (
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
      {error && <Message text={error} color={"#e74c3c"} />}
    </Container>
  );
}
