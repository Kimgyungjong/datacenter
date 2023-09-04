import React from "react";
import { ComponentProps } from "@src/interfaces";

const TreeComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((i) => (
        <div key={i.id}>
          <p>{i.name}</p>
          <p className="path">{i.path}</p>
          <p>{i.createUser}</p>
          <p>{i.createDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TreeComponent;
