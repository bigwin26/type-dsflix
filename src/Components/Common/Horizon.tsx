import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;
  border-radius: 3px;
`;

const Title = styled.h2`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  color: white;
  :not(:first-child) {
    margin-top: 10px;
  }
`;

const HorizonContainer = styled.div`
  overflow: auto;
  overflow-y: hidden;
  white-space: nowrap;
  iframe {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    -ms-overflow-style: none;
  }
`;

interface IHorizon {
  title?: string;
  children: React.ReactNode;
}

export default ({ children, title }: IHorizon) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <HorizonContainer>{children}</HorizonContainer>
    </Container>
  );
};
