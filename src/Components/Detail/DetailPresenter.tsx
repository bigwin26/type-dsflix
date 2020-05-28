import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../Common/Loader";
import Youtube from "../Common/Youtube";
import Message from "../Common/Message";
import Poster from "../Common/Poster";
import Logo from "../Common/Logo";
import Cast from "../Common/Cast";
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
  overflow:auto;
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
  font-size: 13px;
  margin-bottom: 10px;
`;

const Item = styled.span`
  margin-bottom: 10px;
  vertical-align: middle;
`;

const Divider = styled.span`
  margin: 0 10px;
  vertical-align: middle;
`;

const Star = styled.div`
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  width: 85%;
  line-height: 2;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Icon = styled.img<{ src: string }>`
  width: 25px;
  height: 25px;
  cursor: pointer;
  src: ${(props) => props.src};
  align-self: center;
`;

const EtcContainer = styled.div`
  width: 85%;
  border-radius: 3px;
  opacity: 0.8;
`;

interface Result {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  homepage: string;
  release_date: string;
  first_air_date: string;
  runtime: number;
  episode_run_time: Array<number>;
  genres: Array<{ name: string }>;
  imdb_id: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  created_by: Array<{ id: number; profile_path: string; name: string }>;
  belongs_to_collection: { id: number; poster_path: string; name: string };
  seasons: Array<{ id: number; poster_path: string; name: string }>;
  videos: {
    results: Array<{ key: string; src: string; title: string; name: string }>;
  };
  production_companies: Array<{ id: number; logo_path: string; name: string }>;
}

interface IDetail {
  result: Result | null;
  similar: Array<Result> | null;
  cast: Array<any> | null;
  error: string;
  loading: boolean;
}

const DetailPresenter = ({
  result,
  similar,
  cast,
  error,
  loading,
}: IDetail) => {
  console.log(result);
  return loading ? (
    <>
      <Helmet>
        <title>Loading... | DSflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    result && (
      <Container>
        <Helmet>
          <title>{result.title ? result.title : result.name} | DSflix</title>
        </Helmet>
        <Backdrop
          Bgimg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <CoverContainer>
            <Cover
              Bgimg={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                  : require("lib/assets/noPosterSmall.png")
              }
            />
            <button>GO TO WATCH</button>
          </CoverContainer>
          <Data>
            <Title>{result.title ? result.title : result.name}</Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>ㆍ</Divider>
              <Item>
                {result.runtime || result.runtime === 0
                  ? result.runtime
                  : result.episode_run_time[0]}
                min
              </Item>
              <Divider>ㆍ</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `,
                  )}
              </Item>
              {result.imdb_id && (
                <>
                  <Divider>ㆍ</Divider>
                  <Item>
                    <Icon
                      src={require("../../lib/assets/imdb.png")}
                      onClick={() =>
                        window.open(
                          `https://www.imdb.com/title/${result.imdb_id}`,
                        )
                      }
                    />
                  </Item>
                </>
              )}
            </ItemContainer>
            <Star>
              평점 ★{result.vote_average} {`(${result.vote_count}명)`}
            </Star>
            <Overview>{result.overview}</Overview>
            <EtcContainer>
              {cast && (
                <Horizon title="CAST">
                  <Cast data={cast} />
                </Horizon>
              )}
              {result.videos &&
                result.videos.results.length > 0 &&(
                  <Horizon title="TRAILER">
                    <Youtube data={result.videos.results} />
                  </Horizon>
                )}
              {similar && similar.length > 0 && (
                <Horizon title="SIMILAR">
                  {similar.map((movie) => (
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
              {result.belongs_to_collection && (
                <Horizon title="COLLECTION">
                  <Poster
                    key={result.belongs_to_collection.id}
                    id={result.belongs_to_collection.id}
                    imageUrl={result.belongs_to_collection.poster_path}
                    title={result.belongs_to_collection.name}
                  />
                </Horizon>
              )}
              {result.seasons && (
                <Horizon title="SEASON">
                  {result.seasons.map((season) => (
                    <Poster
                      key={season.id}
                      id={season.id}
                      imageUrl={season.poster_path}
                      title={season.name}
                    />
                  ))}
                </Horizon>
              )}
                          {result.production_companies &&
              result.production_companies.length > 0 && (
                <Logo data={result.production_companies} group="logo" />
              )}
            </EtcContainer>
          </Data>
        </Content>
        {error && <Message text={error} color={"#e74c3c"} />}
      </Container>
    )
  );
};

export default DetailPresenter;
