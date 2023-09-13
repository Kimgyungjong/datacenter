import { useContext, useState } from "react";
import { styled } from "styled-components";
import {
  FaListAlt,
  FaTh,
  FaThLarge,
  FaArrowAltCircleDown,
  FaAngleRight,
} from "react-icons/fa";
import { TypeContext, UserContext } from "@src/context/Context";
interface ToolbarProps {
  handleLogout: (id: number) => void;
}
export default function Toolbar({ handleLogout }: ToolbarProps) {
  const { type, setType, sortOption, setSortOption } = useContext(TypeContext);
  const { user } = useContext(UserContext);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [showContextMenu, setContextMenu] = useState(false);
  const [showSortingMenu, setSortingMenu] = useState(false); // State to control sorting menu visibility
  //const [order, setOrder] = useState(true);
  const handleModal = (type: string) => {
    setType(type);
  };

  // 로그인으로 유저정보를 가져왔다고 가정함
  const handleContext = () => {
    setContextMenu(!showContextMenu);
    setSortingMenu(false);
  };
  const handleSortingMenu = () => {
    setSortingMenu(!showSortingMenu);
  };
  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };
  const handleSort = (type: string) => {
    alert(type);
    setSortOption({ ...sortOption, sort: type });
    setSortingMenu(false);
    setContextMenu(false);
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
      <div className="inline-flex">
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
        <div className="ml-2">
          <ContextButton onClick={handleContext}>
            <FaArrowAltCircleDown />
          </ContextButton>
          {showContextMenu && (
            <>
              <StyledWrapper onClick={handleContext} bc={"transparent"} />
              <ContextMenu>
                <li
                  className="disable"
                  onClick={() => console.log("새로운폴더")}
                >
                  새로운 폴더 생성
                </li>
                <Divider />
                <li
                  className={showSortingMenu ? "active" : ""}
                  onClick={handleSortingMenu}
                >
                  정렬
                  <FaAngleRight />
                </li>
                {showSortingMenu && (
                  <SortingMenuContent>
                    <li onClick={() => handleSort("NAME")}>이름순</li>
                    <li onClick={() => handleSort("DATE")}>날짜순</li>
                  </SortingMenuContent>
                )}
              </ContextMenu>
            </>
          )}
        </div>
      </div>
      <UserButton onClick={toggleLogoutMenu}>{user.name} 님</UserButton>
      {showLogoutMenu && (
        <>
          <StyledWrapper onClick={toggleLogoutMenu} bc={"rgba(0,0,0,0.1)"} />
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
const ContextMenu = styled.div`
  position: absolute;
  top: 40px;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 150px;
  & li {
    display: flex;
    height: 40px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    cursor: default;
    padding: 0 10px;
    &.active {
      background-color: #d5ebff;
    }
    &:hover {
      background-color: #d5ebff;
    }
    &.disable {
      background-color: #eee;
      color: #aaa;
      cursor: not-allowed;
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  border-top: 1px solid #ccc;
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
const StyledWrapper = styled.div<{ bc?: string }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: ${(props) => props.bc};
  top: 0;
  top: 0;
  left: 0;
`;
const SortingMenuContent = styled.ul`
  position: absolute;
  top: 40px;
  left: 140px; /* Position it on the right side */
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  width: 150px;
  padding: 0; /* Remove padding to align with the parent menu */
  margin: 0; /* Remove margin to align with the parent menu */
  list-style: none;
`;
const ContextButton = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #999;
  cursor: context-menu;
  &:hover {
    color: #333;
  }
`;
