import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Common/Loader";
import Message from "../../Common/Message";
import { Season } from "lib/types";

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
  width: 85%;
  border-radius: 3px;
  opacity: 0.8;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const StillContainer = styled.div`
  margin-right: 10px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 10px;
`;
const ContentAir = styled.div`
  margin-bottom: 10px;
`;
const ContentOverview = styled.p`
  font-size: 15px;
`;
type ISeason = {
  season: Season | null;
  error: string | null;
  loading: boolean;
};

const SeasonPresenter = ({ season, error, loading }: ISeason) => {
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
    season && (
      <Container>
        <Helmet>
          <title>{season.name} | DSflix</title>
        </Helmet>
        <Backdrop
          Bgimg={`https://image.tmdb.org/t/p/original${season.poster_path}`}
        />
        <Content>
          <CoverContainer>
            <Cover
              Bgimg={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                  : require("lib/assets/noPosterSmall.png")
              }
            />
          </CoverContainer>
          <Data>
            <Title>{season.name}</Title>
            <ItemContainer>
              {season.episodes.map((episode, index) => (
                <Item key={index}>
                  <StillContainer>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${episode.still_path}`}
                      alt="still_img"
                    />
                  </StillContainer>
                  <ContentContainer>
                    <ContentTitle>{`Episode${episode.episode_number} : ${episode.name}`}</ContentTitle>
                    <ContentAir>{episode.air_date}</ContentAir>
                    <ContentOverview>{episode.overview}</ContentOverview>
                  </ContentContainer>
                </Item>
              ))}
            </ItemContainer>
          </Data>
        </Content>
        {error && <Message text={error} color={"#e74c3c"} />}
      </Container>
    )
  );
};

export default SeasonPresenter;
