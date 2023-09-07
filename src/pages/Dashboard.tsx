import React, { useContext, Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 리디렉션을 위해 추가
import styled from "styled-components";

import Header from "../components/Header";
import Search from "../components/Search";
import Toolbar from "../components/Toolbar";

import { logout } from "../util/authUtils";
import { TypeContext, UserContext, FilesContext } from "@src/context/Context";

import DropZone from "../hooks/useDropzone";
import { DashboardProps } from "@/src/interfaces";
import TreeList from "../components/TreeList";
import api from "../api/api";
import { extractPath } from "../util/functions";
import { getFileList } from "../api/dashboard";
// 컴포넌트를 동적으로 로드합니다.
const ListComponent = lazy(() => import("@src/components/ListComponent"));
const ThumbnailComponent = lazy(
  () => import("@src/components/ThumbnailComponent")
);
const ImageComponent = lazy(() => import("@src/components/ImageComponent"));

function Dashboard({ setAuthenticated }: DashboardProps) {
  const navigate = useNavigate();
  const { type } = useContext(TypeContext);
  const { setUser } = useContext(UserContext);
  const { fileDir, files, setFilList } = useContext(FilesContext);
  const [data, setData] = useState(files);
  const [isDragActive, setIsDragActive] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    console.log(files);
    const localUser = localStorage.getItem("userInfo");
    if (typeof localUser === "string") {
      setUser(JSON.parse(localUser));
    }
  }, [files]);

  const handleLogout = (id: number) => {
    logout(id);
    setAuthenticated(false);
    navigate("/login"); // 로그아웃 시 /login 페이지로 리디렉션
  };
  // type 값에 따라 컴포넌트를 동적으로 로드합니다.

  let DynamicComponent;

  switch (type) {
    case "list":
      DynamicComponent = ListComponent;
      break;
    case "image":
      DynamicComponent = ImageComponent;
      break;
    case "thumbnail":
      DynamicComponent = ThumbnailComponent;
      break;
    default:
      DynamicComponent = ListComponent;
  }
  // DropZone에서 전달된 파일 데이터를 처리하는 함수
  const handleFilesUploaded = async (file: File) => {
    // 추후 스토리지 타입 생성시에 사용
    // Split the path using '/'
    extractPath(file);
    // 파일에서 경로를 읽어서 부여
    setIsDragActive(false);
    try {
      const data = extractPath(file);
      await api.post(`api/file/${fileDir}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUploadProgress: (e: any) => {
          console.log(e.loaded);
          setPercent(Math.round((100 * e.loaded) / e.total));
        },
      });
      // 업로드 된 파일들을 계속 불러온다.
      getFileList(fileDir).then((res) => setFilList(res.data.response));
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
      <DashboardContainer>
        <TreeList />
        <StyledRight onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
          {isDragActive && <DropZone onFilesUploaded={handleFilesUploaded} />}
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicComponent data={files} />
          </Suspense>
        </StyledRight>
      </DashboardContainer>
    </>
  );
}

const DashboardContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 9fr;
  gap: 0;
  height: calc(100vh - 50px);
  margin: 0 auto;
`;
const StyledRight = styled.div`
  position: relative;
`;
export default Dashboard;
