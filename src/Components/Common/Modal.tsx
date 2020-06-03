import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: black;
`;

const ContentWrap = styled.div`
  border-radius: 6px;
  width: 375px;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const StyledHeader = styled.header`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.1px;
  line-height: 22px;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  padding: 0px 16px;
  border-bottom: 1px solid rgb(227, 227, 227);
`;
const ButtonContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const CloseButton = styled.button`
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: url(${require("lib/assets/close.svg")});
  background-size: cover;
  padding: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  margin: 10px 0px;
`;

const StyledSpan = styled.span`
  display: inline-block;
  position: absolute;
  right: 0px;
  left: 0px;
  z-index: 1;
  text-align: center;
`;

const Content = styled.div`
  background: white;
  padding: 10px 20px;
  height: auto;
  position: relative;
`;

const StyledUL = styled.ul``;

const StyledLi = styled.li`
  text-align: left;
  box-sizing: border-box;
  min-height: 48px;
  cursor: pointer;
  color: rgb(0, 0, 0);
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  div {
    align-items: center;
    display: flex;
  }
`;

type IModal = {
  onClick: (event: React.MouseEvent) => void;
  onClose: () => void;
  language: string;
};

const Modal = ({ onClick, onClose, language }: IModal) => {
  return (
    <Container>
      <ContentWrap>
        <StyledHeader>
          <ButtonContainer>
            <CloseButton onClick={onClose} />
          </ButtonContainer>
          <StyledSpan>Language</StyledSpan>
        </StyledHeader>
        <Content>
          <StyledUL>
            <StyledLi id="korea" onClick={onClick}>
              <div>
                <img src={require("../../lib/assets/ko.png")} alt="flag-icon" />
                한국어
              </div>
              {language === "ko" && (
                <img
                  src={require("../../lib/assets/check.svg")}
                  alt="check-icon"
                />
              )}
            </StyledLi>
            <StyledLi id="english" onClick={onClick}>
              <div>
                <img src={require("../../lib/assets/us.png")} alt="flag-icon" />
                English
              </div>
              {language === "en-US" && (
                <img
                  src={require("../../lib/assets/check.svg")}
                  alt="check-icon"
                />
              )}
            </StyledLi>
          </StyledUL>
        </Content>
      </ContentWrap>
    </Container>
  );
};

export default Modal;
