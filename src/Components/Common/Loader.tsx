import React from "react";
import styled from "styled-components";
import Loading from "../../lib/assets/loading.gif";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
`;

const Loader = () => {
  return (
    <Container>
      <span role="img" aria-label="Loading">
        <img src={Loading} alt="loading-icon" />
      </span>
    </Container>
  );
};

export default Loader;
