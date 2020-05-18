import React from "react";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
  :first-child {
    margin-top: 15px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`;

const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 20px;
  text-align: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

interface ISection {
  title?: string;
  path?: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: ISection) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

export default Section;
