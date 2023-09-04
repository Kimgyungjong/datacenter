import React, { useContext, Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 리디렉션을 위해 추가
import styled from "styled-components";

import Header from "../components/Header";
import Search from "../components/Search";
import Toolbar from "../components/Toolbar";

import { logout } from "../util/authUtils";
import { TypeContext, UserContext } from "@src/context/Context";

import DropZone from "../hooks/useDropzone";
import { DataProps, DashboardProps } from "@/src/interfaces";
import axios from "axios";
// 컴포넌트를 동적으로 로드합니다.
const ListComponent = lazy(() => import("@src/components/ListComponent"));
const ThumbnailComponent = lazy(
  () => import("@src/components/ThumbnailComponent")
);
const TreeComponent = lazy(() => import("@src/components/TreeComponent"));

function Dashboard({ setAuthenticated }: DashboardProps) {
  const navigate = useNavigate();
  const { type } = useContext(TypeContext);
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState<DataProps[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const localUser = localStorage.getItem("userInfo");
    setUser(JSON.parse(localUser));
    setData([
      {
        id: 1,
        name: "aaa_a.zip",
        path: "aws/aaa/vcc/qqq",
        ext: "zip",
        size: "1mb",
        createUser: "홍박사",
        createDate: "2023-09-04 15:23",
        updateUser: "",
        updateDate: "",
      },
      {
        id: 2,
        name: "aaa_a.png",
        path: "aws/aaa/vcc/qqq",
        ext: "png",
        size: "1mb",
        createUser: "홍박사",
        createDate: "2023-09-04 15:23",
        updateUser: "",
        updateDate: "",
      },
      {
        id: 3,
        name: "aaa_a",
        path: "aws/aaa/vcc/qqq",
        ext: "dir",
        size: "1mb",
        createUser: "조주봉",
        createDate: "2023-09-04 15:23",
        updateUser: "",
        updateDate: "",
      },
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
  // DropZone에서 전달된 파일 데이터를 처리하는 함수
  const handleFilesUploaded = async (file: File, id: number) => {
    console.log("File uploaded:", file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(percent);
    setIsDragActive(false);
    try {
      const res = await axios.post(`/file/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUploadProgress: (e: any) => {
          if (e.lengthComputable) {
            setPercent(Math.round((100 * e.loaded) / e.total));
          }
        },
      });
      setTimeout(() => {
        console.log("test");
      }, 3000);
    } catch (error) {
      console.error("fail");
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 동작 방지
    setIsDragActive(true); // 드래그 중이므로 isDragActive를 true로 설정
  };

  // DragLeave 이벤트 핸들러: 파일 드래그를 취소하거나 컴포넌트를 떠날 때 호출
  const handleDragLeave = () => {
    setIsDragActive(false); // 드래그를 끝냈으므로 isDragActive를 false로 설정
  };

  return (
    <>
      <Header>
        <Search />
        <Toolbar handleLogout={handleLogout} />
      </Header>
      <DashboardContainer
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isDragActive && <DropZone onFilesUploaded={handleFilesUploaded} />}
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent data={data} />
        </Suspense>
      </DashboardContainer>
    </>
  );
}

const DashboardContainer = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 5fr; */
  gap: 0;
  height: calc(100vh - 50px);
  margin: 0 auto;
`;

export default Dashboard;
