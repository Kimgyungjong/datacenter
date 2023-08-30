import { useState } from "react";
import { styled } from "styled-components";
interface ToolbarProps {
  handleLogout: () => void;
}
export default function Toolbar({ handleLogout }: ToolbarProps) {
  const [openDownload, setDownload] = useState(false);
  const [openUpload, setUpload] = useState(false);
  const [openFileInfo, setFileInfo] = useState(false);
  const [openUserInfo, setUserInfo] = useState(false);

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
  & button {
    border-radius: 4px;
    border: 1px solid #aaa;
    color: black;
    height: 2.2rem;
    padding: 4px 6px;
    margin-right: 4px;
    vertical-align: middle;
  }
`;
