import React from "react";
import Horizon from './Horizon';

interface ICast{
  data:Array<{cast_id:number,
    character:string,
    credit_id:string,
    gender:number,
    id:number,
    name:string,
    order:number,
    profile_path:string}> | null
}

const Cast = ({ data }:ICast) => {
  return (
    <Horizon>
        {data && <span>{data[0].name}</span>}
    </Horizon>
  );
};

export default Cast;