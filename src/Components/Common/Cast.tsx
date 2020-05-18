import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.ul`
  font-size: 12px;
  color: white;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  :first-child {
    margin-left: 10px;
  }
  :not(:last-child) {
    margin-right: 10px;
  }
`;

const Image = styled.div<{ bgUrl?: string }>`
  background-image: url(${(props) => props.bgUrl});
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 4px;
`;

const ImageContainer = styled.li`
  margin-bottom: 5px;
  &:hover {
    ${Image} {
      opacity: 0.5;
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

interface ICast {
  data: Array<{
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
  }> | null;
}

const Cast = ({ data }: ICast) => {
  return (
    <Container>
      {data &&
        data.map((actor, index) => (
          <StyledLink to="" key={index}>
            <ImageContainer>
              <Image
                bgUrl={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : require("../../lib/assets/noPosterSmall.png")
                }
              />
            </ImageContainer>
            <Title>{actor.name}</Title>
            <Year>{actor.character}</Year>
          </StyledLink>
        ))}
    </Container>
  );
};

export default Cast;
