import { useContext, useState } from "react";
import { styled } from "styled-components";
import { TypeContext, UserContext } from "@src/context/Context";
interface ToolbarProps {
  handleLogout: () => void;
}
export default function Toolbar({ handleLogout }: ToolbarProps) {
  const { setType } = useContext(TypeContext);
  const { user, setUser } = useContext(UserContext);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const handleModal = (type: string) => {
    setType(type);
  };

  // 로그인으로 유저정보를 가져왔다고 가정함

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
    setUser({ id: "1", username: "aaa" });
  };

  const buttonArr = [
    {
      name: "리스트",
      type: "list",
    },
    {
      name: "썸네일",
      type: "thumbnail",
    },
    // {
    //   name: "계층",
    //   type: "tree",
    // },
  ];
  return (
    <StyledToolbar>
      {buttonArr.map((item) => (
        <button key={item.type} onClick={() => handleModal(item.type)}>
          {item.name}
        </button>
      ))}
      <UserButton onClick={toggleLogoutMenu}>사용자</UserButton>
      {showLogoutMenu && (
        <>
          <StyledWrapper onClick={toggleLogoutMenu} />
          <LogoutMenu>
            <div className="user">{user.username}</div>
            <button onClick={handleLogout}>로그아웃</button>
          </LogoutMenu>
        </>
      )}
    </StyledToolbar>
  );
}
const StyledToolbar = styled.section`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & button {
    width: 70px;
    border-radius: 4px;
    border: 1px solid #aaa;
    color: black;
    height: 2.2rem;
    padding: 4px 6px;
    margin-right: 4px;
    vertical-align: middle;
    text-align: center;
  }
`;

const UserButton = styled.button`
  border-radius: 4px;
  border: 1px solid #aaa;
  color: black;
  height: 2.2rem;
  padding: 4px 6px;
  margin-right: 4px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
`;

const LogoutMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 150px;
  height: 150px;
  & .user {
    text-align: center;
    height: 70px;
    border-radius: 50%;
    background: #aaa;
    width: 70px;
    align-items: center;
    display: flex;
    margin: 10px auto;
    justify-content: center;
  }
  & button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    color: black;
    border: none;
    background-color: transparent;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
`;
const StyledWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
