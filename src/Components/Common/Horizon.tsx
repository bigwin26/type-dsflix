import React from "react";
import styled from "styled-components";

const LogoTitle = styled.span`
  width:100px;
  border-radius: 3px 3px 0 0;
  border: solid black 2px;
  padding: 5px;
  text-transform: uppercase;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  background-color: white;
  :not(:first-child){
    margin-top:10px;
  }
`;

const HorizonContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  iframe {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    -ms-overflow-style: none;
  }
`;

interface IHorizon{
    children:React.ReactNode;
}

export default ({children}:IHorizon) => {
return (<><LogoTitle>Title</LogoTitle><HorizonContainer>{children}</HorizonContainer></>)
}