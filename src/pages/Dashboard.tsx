import React, { useContext, Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 리디렉션을 위해 추가
import styled from "styled-components";

import Header from "../components/Header";
import Search from "../components/Search";
import Toolbar from "../components/Toolbar";

import { logout } from "../util/authUtils";
import { TypeContext } from "@src/context/Context";

// 컴포넌트를 동적으로 로드합니다.
const ListComponent = lazy(() => import("@src/components/ListComponent"));
const ThumbnailComponent = lazy(
  () => import("@src/components/ThumbnailComponent")
);
const TreeComponent = lazy(() => import("@src/components/TreeComponent"));

interface DashboardProps {
  setAuthenticated: (authenticated: boolean) => void;
}

function Dashboard({ setAuthenticated }: DashboardProps) {
  const navigate = useNavigate();
  const { type } = useContext(TypeContext);
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    setData([
      { id: "1", name: "aa" },
      { id: "2", name: "aac" },
    ]);
    // 데이터를 비동기적으로 가져오는 로직
    // fetchData().then((result) => {
    //   setData(result);
    // });
  }, []);
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate("/login"); // 로그아웃 시 /login 페이지로 리디렉션
  };
  // type 값에 따라 컴포넌트를 동적으로 로드합니다.

  let DynamicComponent;

  switch (type) {
    case "list":
      DynamicComponent = ListComponent;
      break;
    case "thumbnail":
      DynamicComponent = ThumbnailComponent;
      break;
    case "tree":
      DynamicComponent = TreeComponent;
      break;
    default:
      DynamicComponent = ListComponent;
  }

  return (
    <>
      <Header>
        <Search />
        <Toolbar handleLogout={handleLogout} />
      </Header>
      <DashboardContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent data={data} />
        </Suspense>
      </DashboardContainer>
    </>
  );
}

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 0;
  height: calc(100vh - 50px);
`;

export default Dashboard;
