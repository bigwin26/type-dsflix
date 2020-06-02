import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../Common/Loader";
import Message from "../Common/Message";
import { Movie, Actor, TV } from "lib/types";
import Poster from "Components/Common/Poster";
import Horizon from "Components/Common/Horizon";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  z-index: 0;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Backdrop = styled.div<{ Bgimg: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(100% - 50px);
  height: 100%;
  background-image: url(${(props) => props.Bgimg});
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 1;
  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  @media (max-width: 768px) {
    width: 40%;
    height: 40%;
  }
`;

const Cover = styled.div<{ Bgimg: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.Bgimg});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
  overflow: auto;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-left: 0px;
    height: calc(100vh - 300px);
  }
`;

const Title = styled.h3`
  font-size: 40px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const ItemContainer = styled.div`
  font-size: 15px;
  width: 85%;
  border-radius: 3px;
  opacity: 0.8;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Star = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const EtcContainer = styled.div`
  width: 85%;
  border-radius: 3px;
  opacity: 0.8;
`;

type IActor = {
  actor: Actor | null;
  movies: Array<Movie> | null;
  shows: Array<TV> | null;
  error: string;
  loading: boolean;
};

const ActorPresenter = ({ actor, movies, shows, error, loading }: IActor) => {
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
    actor && (
      <Container>
        <Helmet>
          <title>{actor.name} | DSflix</title>
        </Helmet>
        <Backdrop
          Bgimg={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
        />
        <Content>
          <CoverContainer>
            <Cover
              Bgimg={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  : require("lib/assets/noPosterSmall.png")
              }
            />
          </CoverContainer>
          <Data>
            <Title>{actor.name}</Title>
            <ItemContainer>
              <Item>Birthday : {actor.birthday}</Item>
              <Item>Place_of_birth : {actor.place_of_birth}</Item>
            </ItemContainer>
            <Star>Popularity ★{actor.popularity}</Star>
            <EtcContainer>
              {movies && movies.length > 0 && (
                <Horizon title="Movie Appearance">
                  {movies.map((movie) => (
                    <Poster
                      key={movie.id}
                      id={movie.id}
                      imageUrl={movie.poster_path}
                      title={movie.title}
                      isMovie={true}
                    />
                  ))}
                </Horizon>
              )}
              {shows && shows.length > 0 && (
                <Horizon title="Show Appearance">
                  {shows.map((show) => (
                    <Poster
                      key={show.id}
                      id={show.id}
                      imageUrl={show.poster_path}
                      title={show.name}
                    />
                  ))}
                </Horizon>
              )}
            </EtcContainer>
          </Data>
        </Content>
      </Container>
    )
  );
};

export default React.memo(ActorPresenter);
