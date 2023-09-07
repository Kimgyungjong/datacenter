import React, { useContext, Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

import api from "@src/api/api";
import { logout } from "@src/api/login";
import { getFileList } from "@src/api/dashboard";
import { TypeContext, UserContext, FilesContext } from "@src/context/Context";
import { DashboardProps } from "@/src/interfaces";

import Header from "@src/components/Header";
import Search from "@src/components/Search";
import Toolbar from "@src/components/Toolbar";
import TreeList from "../components/TreeList";


import DropZone from "@src/hooks/useDropzone";
import { extractPath } from "../util/functions";

// 컴포넌트를 동적으로 로드
const ListComponent = lazy(() => import("@src/components/ListComponent"));
const ThumbnailComponent = lazy(
  () => import("@src/components/ThumbnailComponent")
);
const ImageComponent = lazy(() => import("@src/components/ImageComponent"));

function Dashboard({ setAuthenticated }: DashboardProps) {
  const { type } = useContext(TypeContext);
  const { setUser } = useContext(UserContext);
  const { fileDir, files, setFilList } = useContext(FilesContext);
  const [fileArr, setFileArr] = useState<File[] | []>([]);
  const [percent, setPercent] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("userInfo");

  useEffect(() => {
    if (typeof localUser === "string") {
      setUser(JSON.parse(localUser));
    }
  }, [files]);

  const handleLogout = (id: number) => {
    logout(id);
    localUser && setAuthenticated(false);
    navigate("/login");
  };

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
    setIsDragActive(false);
    try {
      const data = extractPath(file);
      await api.post(`api/file/${fileDir}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUploadProgress: (e: any) => {
          setPercent(Math.round((100 * e.loaded) / e.total));
        },
      });
      // 업로드 된 파일들을 계속 불러온다.
      getFileList(fileDir).then((res) => setFilList(res.data.response));
    } catch (error) {
      console.error("fail");
    }
  };
  const handleFileArr = (fileArr:File[]) => {
    setFileArr(fileArr);
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true); // 드래그 중이므로 isDragActive를 true로 설정
  };
  const handleDragLeave = () => {
    setIsDragActive(false); // 드래그를 끝냈으므로 isDragActive를 false로 설정
  };

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>알체라 | 데이터센터</title>
      </Helmet>
      <Header>
        <Search />
        <Toolbar handleLogout={handleLogout} />
      </Header>
      <DashboardContainer>
        <TreeList />
        <StyledRight onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
          {(isDragActive || files.length === 0) && <DropZone onFilesUploaded={handleFilesUploaded} handleFileArr={handleFileArr}/>}
          <Suspense fallback={<div>Loading...</div>}>
          {fileArr.map((item)=>{return <div>{item.name}{percent}</div>})}
            <DynamicComponent data={files} />
          </Suspense>
        </StyledRight>
      </DashboardContainer>
    </HelmetProvider>
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
