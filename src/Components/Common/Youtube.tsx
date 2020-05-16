import React from "react";
import Horizon from './Horizon';

interface IYoutube{
  data:Array<{key:string, src:string, title:string, name:string}>
}

const Youtube = ({ data }:IYoutube) => {
  return (
    <Horizon>
      {data.map((video, index) => (
      <iframe
        key={index}
        width="inherit"
        height="inherit"
        src={`https://www.youtube.com/embed/${video.key}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.name}
      ></iframe>
    ))}
    </Horizon>
  );
};

export default Youtube;