import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 12px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  :not(:last-child) {
    margin-right: 10px;
  }
`;

const Image = styled.div<{ bgUrl?: string }>`
  background-image: url(${(props) => props.bgUrl});
  height: 275px;
  width: 185px;
  @media (max-width: 768px) {
    height: 185px;
    width: 125px;
  }
  background-size: cover;
  border-radius: 4px;
`;

const Rating = styled.span`
  bottom: 10px;
  right: 5px;
  position: absolute;
  opacity: 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;
interface IPoster {
  id: number;
  imageUrl: string;
  title: string;
  rating?: number;
  year?: string;
  isMovie?: boolean;
  hasSub?: boolean;
  sub_id?: number;
}

const Poster = ({
  id,
  imageUrl,
  title,
  year,
  isMovie = false,
  hasSub = false,
  sub_id,
}: IPoster) => {
  return (
    <StyledLink
      to={
        hasSub
          ? `/show/${id}/season/${sub_id}`
          : isMovie
          ? `/movie/${id}`
          : `/show/${id}`
      }
    >
      <Container>
        <ImageContainer>
          <Image
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : require("../../lib/assets/noPosterSmall.png")
            }
          />
        </ImageContainer>
        <Title>
          {title.length > 11 ? `${title.substring(0, 11)}...` : title}
        </Title>
        {year && <Year>{year}</Year>}
      </Container>
    </StyledLink>
  );
};

export default React.memo(Poster);
