import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  background-color: rgba(133, 133, 133, 0.6);
  border: 1px solid;
  border-radius: 5px;
  padding: 2px;
  &:hover {
    background-color: grey;
  }
`;

const HorizonContainer = styled.div`
  overflow: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  iframe {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    -ms-overflow-style: none;
    overflow-x: scroll;
  }
  scroll-behavior: smooth;
`;

const ArrowContainer = styled.div`
  position: relative;
`;

const ArrowButtonBlock = styled.div<{ direction: string }>`
  display: flex;
  position: absolute;
  top: 0px;
  z-index: 1;
  ${(props) => (props.direction === "left" ? `left:10px;` : `right:10px;`)};
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
  opacity: 0;
  transition: all 300ms ease 0s;
`;

const ArrowButton = styled.div<{ direction: string }>`
  width: 34px;
  height: 34px;
  opacity: 0.9;
  cursor: pointer;
  background-image: url(${(props) =>
    props.direction === "left"
      ? require("../../lib/assets/left-arrow.png")
      : require("../../lib/assets/right-arrow.png")});
  background-repeat: no-repeat;
  background-size: cover;
`;
const Container = styled.div`
  margin: 10px 0;
  border-radius: 3px;
  &:hover {
    ${ArrowButtonBlock} {
      opacity: 0.9;
    }
  }
`;

interface IHorizon {
  title?: string;
  path?: string;
  children: React.ReactNode;
}

export default React.memo(({ children, path, title }: IHorizon) => {
  const language = localStorage.getItem("language");
  const card = useRef<HTMLDivElement>(null);
  const scroll = (e: React.MouseEvent) => {
    if (!card.current) {
      return;
    }
    const direction = e.currentTarget.getAttribute("direction");
    direction === "left"
      ? (card.current.scrollLeft -= 400)
      : (card.current.scrollLeft += 400);
  };

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {path && (
        <StyledLink to={path}>
          {language === "ko" ? `더보기` : `SeeMore`}
        </StyledLink>
      )}
      <ArrowContainer>
        <HorizonContainer ref={card}>{children}</HorizonContainer>
        <ArrowButtonBlock direction="left">
          <ArrowButton direction="left" onClick={scroll} />
        </ArrowButtonBlock>
        <ArrowButtonBlock direction="right">
          <ArrowButton direction="right" onClick={scroll} />
        </ArrowButtonBlock>
      </ArrowContainer>
    </Container>
  );
});
