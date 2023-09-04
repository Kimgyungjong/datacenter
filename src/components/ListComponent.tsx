import React from "react";
import { styled } from "styled-components";
import { ComponentProps } from "@src/interfaces";

const ListComponent: React.FC<ComponentProps> = ({ data }) => {
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
      {/* 테이블 헤더 */}
      <div style={{ display: "inline-flex", width: "100%" }}>
        <span style={{ display: "flex", flex: 3 }}>이름</span>
        <span style={{ display: "flex", flex: 2 }}>경로</span>
        <span style={{ display: "flex", flex: 1 }}>생성자</span>
        <span style={{ display: "flex", flex: 1 }}>생성일</span>
      </div>
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
const StyledItem = styled.div`
  display: flex;
  & div {
    flex: 3;
    display: flex;
    img {
      pointer-events: none;
      width: 24px;
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
