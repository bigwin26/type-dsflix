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
`;

const StyledSpan = styled.span`
  color: white;
  font-size: 16px;
  :not(:last-child) {
    margin-right: 10px;
  }
  opacity: 0.7;
`;

interface ILogo{
  data?:Array<{ logo_path:String | null,
    name:String }>
  group:string,
}

const Logo = ({ data }:ILogo) => {
  return <LogoContainer>
      {data && data.length > 1 ? (
        data.map((img,index) =>
          img.logo_path !== null ?  (
            <Image key={index} src={`https://image.tmdb.org/t/p/w200${img.logo_path}`} />
          ) 
           : (
            <StyledSpan key={index}>"{img.name}"</StyledSpan>
          ),
        )
      ) : data&&data[0].logo_path !== null ? (
        <Image src={`https://image.tmdb.org/t/p/w200${data[0].logo_path}`} />
      ) : (
        <StyledSpan>"{data&&data[0].name}"</StyledSpan>
      )}
    </LogoContainer>
};

export default Logo;