import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";
import { typeIcon } from "@src/util/functions";

const ThumbnailComponent: React.FC<ComponentProps> = ({ data }) => {
  const truncateTextSplitHalf = (text: string) => {
    const maxLength = 25; // The desired maximum length
    if (text.length > maxLength) {
      const firstPart = text.slice(0, 10); // Get the first 10 characters
      const extension = text.slice(-7); // Get the last 7 characters including the extension
      const truncatedText = `${firstPart}...${extension}`;

      return truncatedText;
    } else {
      return text; // Return the text as-is if it's shorter than the desired maximum length
    }
  };

  return (
    <StyledThumbWrapper>
      {data.map((i, idx) => (
        <StyledItem key={`${i.name}_${idx}`} title={i.name}>
          <img src={typeIcon(i.ext)} alt="" />
          <p>{truncateTextSplitHalf(i.name)}</p>
        </StyledItem>
      ))}
    </StyledThumbWrapper>
  );
};
const StyledThumbWrapper = styled.section`
  display: inline-grid;
  grid-template-columns: repeat(20, 1fr);
  grid-gap: 4px;
`;
const StyledItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  & img {
    pointer-events: none;
    width: 80px;
    height: 80px;
    min-width: 80px;
    max-height: 80px;
    overflow: hidden;
  }
  & p {
    font-size: 12px;
    word-break: break-all;
  }
`;
export default ThumbnailComponent;
