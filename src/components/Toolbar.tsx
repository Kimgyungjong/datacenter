import { useContext, useState } from "react";
import { styled } from "styled-components";
import { FaListAlt, FaTh, FaThLarge } from "react-icons/fa";
import { TypeContext, UserContext } from "@src/context/Context";
interface ToolbarProps {
  handleLogout: (id: number) => void;
}
export default function Toolbar({ handleLogout }: ToolbarProps) {
  const { type, setType } = useContext(TypeContext);
  const { user } = useContext(UserContext);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const handleModal = (type: string) => {
    setType(type);
  };

  // 로그인으로 유저정보를 가져왔다고 가정함

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const buttonArr = [
    {
      name: "리스트",
      type: "list",
      component: <FaListAlt />,
    },
    {
      name: "이미지",
      type: "image",
      component: <FaThLarge />,
    },
    {
      name: "썸네일",
      type: "thumbnail",
      component: <FaTh />,
    },
    // {
    //   name: "계층",
    //   type: "tree",
    // },
  ];
  return (
    <StyledToolbar>
      <Wrapper>
        {buttonArr.map((item) => (
          <Button
            key={item.type}
            className={type === item.type ? "active" : ""}
            onClick={() => handleModal(item.type)}
          >
            {item.component}
          </Button>
        ))}
      </Wrapper>
      <UserButton onClick={toggleLogoutMenu}>{user.name} 님</UserButton>
      {showLogoutMenu && (
        <>
          <StyledWrapper onClick={toggleLogoutMenu} />
          <LogoutMenu>
            <div className="user">{user.name}</div>
            <button onClick={() => handleLogout(user.id)}>로그아웃</button>
          </LogoutMenu>
        </>
      )}
    </StyledToolbar>
  );
}
const StyledToolbar = styled.section`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex: 6;
  & div {
  }
`;
const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: #aaa;
  margin: 4px;
  margin-right: 8px;
  &:last-child {
    margin-right: 4px;
  }
  &.active {
    color: #333;
  }
  &:hover {
    color: #333;
  }
`;
const UserButton = styled.button`
  border-radius: 4px;
  border: none;
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
  background: rgba(100, 100, 100, 0.2);
  top: 0;
  top: 0;
  left: 0;
`;
