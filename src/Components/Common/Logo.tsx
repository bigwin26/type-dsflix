import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  border-radius: 3px;
  color: white;
`;

const Image = styled.img`
  height: 30px;
  background-size: cover;
  border-radius: 4px;
  margin-right: 5px;
`;

const ItemContainer = styled.ul`
  padding: 10px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  :not(:last-child) {
    margin-bottom: 5px;
  }
  opacity: 0.8;
`;

const LogoTitle = styled.h2`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
`;

interface ILogo {
  data?: Array<{ logo_path: String | null; name: String }>;
  group: string;
}

const Logo = ({ data }: ILogo) => {
  return (
    <LogoContainer>
      <LogoTitle>Production</LogoTitle>
      <ItemContainer>
        {data && data.length > 1 ? (
          data.map((img, index) => (
            <Item key={index}>
              <Image
                src={
                  img.logo_path
                    ? `https://image.tmdb.org/t/p/w300${img.logo_path}`
                    : require("../../lib/assets/film-icon.png")
                }
              />
              {img.name}
            </Item>
          ))
        ) : (
          <Item>"{data && data[0].name}"</Item>
        )}
      </ItemContainer>
    </LogoContainer>
  );
};

export default React.memo(Logo);
