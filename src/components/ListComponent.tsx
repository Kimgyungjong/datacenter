import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";
import { typeIcon } from "@src/util/functions";
const ListComponent: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      {/* 테이블 헤더 */}
      <StyledTH>
        <span style={{ display: "flex", flex: 3 }}>이름</span>
        <span style={{ display: "flex", flex: 2 }}>경로</span>
        <span style={{ display: "flex", flex: 1 }}>생성자</span>
        <span style={{ display: "flex", flex: 1 }}>생성일</span>
      </StyledTH>
      {data.map((i) => (
        <StyledItem key={i.id}>
          <div>
            <img src={typeIcon(i.ext)} alt="" />
            <p>{i.name}</p>
          </div>
          <p className="path">{i.path}</p>
          <p>{i.createUser}</p>
          <p>{i.createDate}</p>
        </StyledItem>
      ))}
    </div>
  );
};
const StyledTH = styled.div`
  display: inline-flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;
const StyledItem = styled.div`
  display: flex;
  height: 40px;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #a1e0ff;
    cursor: pointer;
  }
  &:last-child {
    border-bottom: none;
  }
  & div {
    flex: 3;
    display: flex;
    img {
      pointer-events: none;
      width: 24px;
      margin-right: 4px;
    }
  }
  & p {
    &.path {
      flex: 2;
    }
    flex: 1;
  }
`;
export default ListComponent;
