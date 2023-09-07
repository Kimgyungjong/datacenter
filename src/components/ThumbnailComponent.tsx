import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";
import { typeIcon } from "@src/util/functions";

const ThumbnailComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((i) => (
        <StyledItem key={i.id}>
          <img src={i.url} alt="" />
          <p>{i.name}</p>
        </StyledItem>
      ))}
    </div>
  );
};
const StyledItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    pointer-events: none;
    width: 80px;
    min-width: 80px;
  }
`;
export default ThumbnailComponent;
