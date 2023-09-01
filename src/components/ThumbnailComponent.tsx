import React from "react";
interface ComponentProps {
  data: { id: string; name: string }[];
}

const ThumbnailComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((i) => (
        <>
          <img src={i.name} key={i.id} />
          <span>{i.name}</span>
        </>
      ))}
    </div>
  );
};
export default ThumbnailComponent;
