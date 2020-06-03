import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Horizon from "../Common/Horizon";
import Message from "../Common/Message";
import Poster from "../Common/Poster";
import Loader from "../Common/Loader";
import { TV } from "lib/types";

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
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 10px;
    justify-content: unset;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 30%;
  @media (max-width: 768px) {
    overflow: hidden;
  }
  margin-bottom: 10px;
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
  font-size: 16px;
  opacity: 0.8;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const DetailButton = styled(Link)`
  display: flex;
  background-color: rgba(133, 133, 133, 0.6);
  padding: 0.6rem;
  border-radius: 0.3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  align-items: center;
  width: 30%;
  @media (max-width: 768px) {
    font-size: 10px;
    width: 80%;
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

interface ITV {
  topRated: Array<TV> | null;
  popular: Array<TV> | null;
  airingToday: Array<TV> | null;
  mainShow: TV | null;
  loading: boolean;
  error: string;
}

const TVPresenter = ({
  topRated,
  popular,
  airingToday,
  mainShow,
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
    <>
      {mainShow && (
        <MainContainer>
          <MainContent>
            <TitleContainer>
              <Title>{mainShow.name}</Title>
            </TitleContainer>
            {mainShow.overview !== "" && (
              <InnerContainer>
                <Overview>
                  {mainShow.overview.length > 200
                    ? `${mainShow.overview.slice(0, 200)}...`
                    : mainShow.overview}
                </Overview>
              </InnerContainer>
            )}
            <InnerContainer>
              <DetailButton to={`/show/${mainShow.id}`}>
                <img
                  src={require("../../lib/assets/info.svg")}
                  alt="Info Icon"
                  style={{ marginRight: "10px" }}
                />
                상세 정보
              </DetailButton>
            </InnerContainer>
          </MainContent>
          <MainPoster
            bgImg={`https://image.tmdb.org/t/p/original${mainShow.backdrop_path}`}
          >
            <Gredient />
          </MainPoster>
        </MainContainer>
      )}
      <Container>
        <Helmet>
          <title>TV Show | DSflix</title>
        </Helmet>
        {topRated && topRated.length > 0 && (
          <Horizon title="Top Rated" path="/shows/topRated">
            {topRated.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Horizon>
        )}
        {airingToday && airingToday.length > 0 && (
          <Horizon title="Airing Today" path="/shows/airingToday">
            {airingToday.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Horizon>
        )}
        {popular && popular.length > 0 && (
          <Horizon title="Popular" path="/shows/popular">
            {popular.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Horizon>
        )}
      </Container>
    </>
  );
};

export default React.memo(TVPresenter);
