import React, { useState } from "react";
import useFakeLogin from "@src/hooks/useFakeLogin";
import { styled } from "styled-components";

export default function Toolbar() {
  const { logout } = useFakeLogin();
  const [openDownload, setDownload] = useState(false);
  const [openUpload, setUpload] = useState(false);
  const [openFileInfo, setFileInfo] = useState(false);
  const [openUserInfo, setUserInfo] = useState(false);
  const handleLogout = () => {
    logout(); // 페이크 로그인 시도 (useFakeLogin 훅 사용)
  };
  const handleModal = (type: string) => {
    switch (type) {
      case "down":
        setDownload(true);
        return;
      case "upload":
        setUpload(true);
        return;
      case "file":
        setFileInfo(true);
        return;
      case "user":
        setUserInfo(true);
        return;
      default:
        break;
    }
  };
  const buttonArr = [
    {
      name: "파일다운로드",
      type: "download",
    },
    {
      name: "파일업로드",
      type: "upload",
    },
    {
      name: "파일정보",
      type: "file",
    },
    {
      name: "유저정보",
      type: "user",
    },
  ];
  return (
    <StyledToolbar>
      {buttonArr.map((item) => (
        <button key={item.type} onClick={() => handleModal(item.type)}>
          {item.name}
        </button>
      ))}
      <button onClick={handleLogout}>로그아웃</button>
    </StyledToolbar>
  );
}
const StyledToolbar = styled.section`
  display: inline-flex;
  justify-content: center;
`;
