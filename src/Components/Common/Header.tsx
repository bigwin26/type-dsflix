import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  /*background-color: rgba(20, 20, 20, 0.6);*/
  background-color: black;
  z-index: 2;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li<{ current: boolean }>`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#c0392b" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <StyledLink to="/">Home</StyledLink>
      </Item>
      <Item current={pathname === "/show"}>
        <StyledLink to="/show">TV</StyledLink>
      </Item>
      <Item current={pathname === "/search"}>
        <StyledLink to="/search">Search</StyledLink>
      </Item>
    </List>
  </Header>
));
