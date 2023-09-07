import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";
import { typeIcon } from "@src/util/functions";

const ThumbnailComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <StyledWrapper>
      {data.map((i) => (
        <StyledItem key={i.id}>
          <div className="wrapper">
            <img src={i.url} alt="" />
          </div>
          <p>{i.name}</p>
        </StyledItem>
      ))}
    </StyledWrapper>
  );
};
const StyledWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const StyledItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 280px;
  & .wrapper {
    height: 180px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      pointer-events: none;
      height: auto;
      min-width: 100px;
      max-width: 100%;
    }
  }
`;
export default ThumbnailComponent;
