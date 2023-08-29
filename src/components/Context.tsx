import React from "react";
import { styled } from "styled-components";
interface ContextData {
  data: { label: string; x: number; y: number };
}
const Context: React.FC<ContextData> = ({ data }) => {
  const { label, x, y } = data;
  return (
    <StyledContext
      style={{
        left: x,
        top: y,
      }}
    >
      <div>{label}</div>
      <button onClick={() => alert("폴더생성")}>폴더생성</button>
      <button onClick={() => alert("이름변경")}>이름변경</button>
      {/* <button onClick={}>할당</button> */}
    </StyledContext>
  );
};

const StyledContext = styled.div`
  position: absolute;
  width: 130px;
  background: white;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    padding: 4px 8px;
    text-align: center;
  }
  & * {
    border-bottom: 1px solid #aaa;
    width: 100%;
    &:last-child {
      border-bottom: none;
    }
  }
`;

export default Context;
