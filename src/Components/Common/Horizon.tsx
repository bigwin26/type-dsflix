import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;
  border-radius: 3px;
`;

const Title = styled.h2`
  display: inline-block;
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  :not(:first-child) {
    margin-top: 10px;
  }
`;

const StyledLink = styled(Link)`
  background-color: black;
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

const ArrowButtonBlock = styled.div`
  background-color: black;
  display: flex;
  position: absolute;
  top: 0px;
  z-index: 1;
  right: 10px;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
  opacity: 0;
  transition: all 300ms ease 0s;
`;

const ArrowButton = styled.div`
width: 34px;
    height: 34px;
    opacity: 0.9;
    cursor: pointer;
    background-color: black;
`

interface IHorizon {
  title?: string;
  path?: string;
  children: React.ReactNode;
}

export default ({ children, path, title }: IHorizon) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {path && <StyledLink to={path}>더보기</StyledLink>}
      <ArrowButtonBlock></ArrowButtonBlock>
      <HorizonContainer>{children}</HorizonContainer>
    </Container>
  );
};
