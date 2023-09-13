import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";
import { typeIcon } from "@src/util/functions";

const ThumbnailComponent: React.FC<ComponentProps> = ({
  data,
  doubleClick,
}) => {
  return (
    <StyledWrapper>
      <Image>
        {data.map((i, idx) => (
          <StyledItem
            key={`${i.name}_${idx}`}
            onDoubleClick={() => doubleClick(i)}
          >
            <div className="wrapper">
              {i.ext.startsWith("image/") ? (
                <img src={i.url} alt="" />
              ) : (
                <img src={typeIcon(i.ext)} alt="" />
              )}
            </div>
            <p>{i.name}</p>
          </StyledItem>
        ))}
      </Image>
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
  justify-content: flex-start;
  align-items: center;
  height: 250px;
  width: 100%;
  padding-top: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  & .wrapper {
    padding: 8px;
    height: 180px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      pointer-events: none;
      height: 180px;
      min-width: 100px;
      max-width: 100%;
    }
  }
  & p {
    padding: 4px 6px;
    margin-top: 8px;
    height: 30px;
    font-size: 14px;
    word-break: break-all;
  }
`;
const Image = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 8px;
`;
export default ThumbnailComponent;
