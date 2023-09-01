import React from "react";
interface ComponentProps {
  data: { id: string; name: string }[];
}

const ListComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <ul>
      {data.map((i) => (
        <ol key={i.id}>
          {i.id}
          {i.name}
        </ol>
      ))}
    </ul>
  );
};
export default ListComponent;
