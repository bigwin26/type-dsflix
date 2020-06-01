import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Horizon from "../Common/Horizon";
import Loader from "../Common/Loader";
import Message from "../Common/Message";
import Poster from "../Common/Poster";
import { Movie } from "lib/types";

const Container = styled.div`
  padding: 0px 10px 0px 30px;
  @media (max-width: 768px) {
    padding: 0px 10px 0px 10px;
    top: -200px;
  }
  position: relative;
  top: -80px;
`;

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
`;

const MainContent = styled.div`
  width: 35%;
  height: 100%;
  background-color: black;
  padding: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 30%;
  @media (max-width: 768px) {
    height: 10%;
  }
`;

const Title = styled.h2`
  @font-face {
    font-family: "napjak";
    src: url(${require("../../lib/assets/fonts/gabia_napjakBlock.ttf")});
  }
  font-family: "napjak", sans-serif;
  font-size: 60px;
  position: absolute;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Overview = styled.p`
  font-size: 18px;
  opacity: 0.7;
  position: absolute;
  z-index: 1;
  width: 40%;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const MainPoster = styled.div<{ bgImg: string }>`
  width: 65%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  @media (max-width: 768px) {
    height: calc(100vh - 400px);
  }
`;

const Gredient = styled.div`
  display: block;
  position: relative;
  top: 0px;
  z-index: 10;
  bottom: 0px;
  left: 0px;
  background-image: linear-gradient(
    -90deg,
    rgba(56, 43, 32, 0) 0%,
    rgb(0, 0, 0) 100%
  );
  height: 100%;
  width: 200px;
`;

type Ihome = {
  nowPlaying: Array<Movie>;
  popular: Array<Movie>;
  upcoming: Array<Movie>;
  mainMovie: Movie | null;
  loading: Boolean;
  error: String;
};

export default function HomePresenter({
  nowPlaying,
  popular,
  upcoming,
  mainMovie,
  loading,
  error,
}: Ihome) {
  console.log(mainMovie);
  return loading ? (
    <>
      <Helmet>
        <title>Loading... | DSflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      {mainMovie && (
        <MainContainer>
          <MainContent>
            <InnerContainer>
              <Title>{mainMovie.title}</Title>
            </InnerContainer>
            <InnerContainer>
              <Overview>{mainMovie.overview}</Overview>
            </InnerContainer>
            <InnerContainer></InnerContainer>
          </MainContent>
          <MainPoster
            bgImg={`https://image.tmdb.org/t/p/original${mainMovie.backdrop_path}`}
          >
            <Gredient />
          </MainPoster>
        </MainContainer>
      )}
      {/*       <iframe
        width="100%"
        height="677"
        src="https://www.youtube.com/embed/yhXT3hBaDoU?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="깡"
      ></iframe> */}
      <Container>
        <Helmet>
          <title>Movies | DSflix</title>
        </Helmet>
        {nowPlaying && nowPlaying.length > 0 && (
          <Horizon title="Now Playing" path="/movies/nowplaying">
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
          </Horizon>
        )}
        {upcoming && upcoming.length > 0 && (
          <Horizon title="Up Coming" path="/movies/upcoming">
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
          </Horizon>
        )}
        {popular && popular.length > 0 && (
          <Horizon title="Popular" path="/movies/popular">
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
          </Horizon>
        )}
        {error && <Message text={error} color={"#e74c3c"} />}
      </Container>
    </>
  );
}
