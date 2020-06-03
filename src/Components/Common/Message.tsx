import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;

interface IMessage {
  text: String;
  color: string;
}

const Message = ({ text, color }: IMessage) => {
  return (
    <Container>
      <Text color={color}>{text}</Text>
    </Container>
  );
};

export default React.memo(Message);
