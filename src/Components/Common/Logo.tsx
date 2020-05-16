import React from "react";
import styled from "styled-components";

const Image = styled.img`
  height: 30px;
  background-size: cover;
  border-radius: 4px;
  :not(:last-child) {
    margin-right: 5px;
  }
`;

const LogoContainer = styled.div`
  padding: 10px;
  border-radius: 0 0 3px 3px;
  display:flex;
  flex-direction:column;
  opacity: 0.8;
  background-color: white;
`;

const Item = styled.div`
  display:flex;
  align-items:center;
  color: black;
  font-size: 16px;
  :not(:last-child) {
    margin-bottom: 5px;
  } 
  opacity: 0.7;
`;

const LogoTitle = styled.span`
  width:100px;
  border-radius: 3px 3px 0 0;
  border: solid black 2px;
  padding: 5px;
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  background-color: white;
`;

interface ILogo{
  data?:Array<{ logo_path:String | null,
    name:String }>
  group:string,
}

const Logo = ({ data }:ILogo) => {
  return <>
    <LogoTitle>Production</LogoTitle>
    <LogoContainer>
      {data && data.length > 1 ? (
        data.map((img,index) => <Item key={index}><Image src={require("../../lib/assets/film-icon.png")}/>{img.name}</Item>)) : (
        <Item>"{data&&data[0].name}"</Item>
      )}
    </LogoContainer>
    </>
};

export default Logo;