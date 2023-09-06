import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";

const ThumbnailComponent: React.FC<ComponentProps> = ({ data }) => {
  const typeIcon = (type: string) => {
    switch (type) {
      case "jpeg":
      case "jpg":
      case "png":
      case "svg":
        return "src/assets/images/type-img.svg";
      case "zip":
        return "src/assets/images/type-package.svg";
      case "dir":
        return "src/assets/images/type-folder.svg";
      default:
        return "src/assets/images/type-unknown.svg";
    }
  };
  return (
    <div>
      {data.map((i) => (
        <StyledItem key={i.id}>
          <img src={typeIcon(i.ext)} alt="" />
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
    width: 140px;
  }
`;
export default ThumbnailComponent;
