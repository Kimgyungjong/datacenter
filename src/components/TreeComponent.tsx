import React from "react";

interface ComponentProps {
  data: { id: string; name: string }[];
}

const TreeComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
};

export default TreeComponent;
