import React from "react";

interface IYoutube {
  data: Array<{ key: string; src: string; title: string; name: string }>;
}

const Youtube = ({ data }: IYoutube) => {
  return (
    <>
      {data.map((video, index) => (
        <iframe
          key={index}
          width="400"
          height="200"
          src={`https://www.youtube.com/embed/${video.key}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        ></iframe>
      ))}
    </>
  );
};

export default Youtube;
