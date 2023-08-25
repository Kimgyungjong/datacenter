import React from "react";
import styled from "styled-components";

interface SortContainerProps {
  onModeChange: (mode: number) => void;
}

const SortContainer: React.FC<SortContainerProps> = ({ onModeChange }) => {
  return (
    <SSortContainer>
      <Button onClick={() => onModeChange(1)}>큰썸네일</Button>
      <Button onClick={() => onModeChange(2)}>작은썸네일</Button>
      <Button onClick={() => onModeChange(3)}>리스트</Button>
    </SSortContainer>
  );
};

const SSortContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #cccccc;
  cursor: pointer;
`;
export default SortContainer;
