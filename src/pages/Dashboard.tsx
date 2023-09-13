import React, { useContext, Suspense, lazy, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

import api from "@src/api/api";
import { logout } from "@src/api/login";
import { TypeContext, UserContext, FilesContext } from "@src/context/Context";
import { DashboardProps, DataProps } from "@/src/interfaces";
import { useDirectories, useFiles, uploadFiles } from "@/src/api/dashboard";

import Header from "@src/components/Header";
import Search from "@src/components/Search";
import Toolbar from "@src/components/Toolbar";

import DropZone from "@src/hooks/useDropzone";
import { codePresenter } from "../util/functions";
type payload = {
  id: number | undefined;
  option: { storageType: string; sort: string; order: string };
};

// 컴포넌트를 동적으로 로드
const ListComponent = lazy(() => import("@src/components/ListComponent"));
const ThumbnailComponent = lazy(
  () => import("@src/components/ThumbnailComponent")
);
const ImageComponent = lazy(() => import("@src/components/ImageComponent"));

function Dashboard({ setAuthenticated }: DashboardProps) {
  // 콘텍스트에서 글로벌 변수 가져오기
  const { type, sortOption } = useContext(TypeContext);
  const { setUser, user } = useContext(UserContext);
  const { fileDir, files, setFileList } = useContext(FilesContext);
  // 업로드시 사용되는 변수

  const [isDragActive, setIsDragActive] = useState(false);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("userInfo");

  // 초기 디렉토리 데이터 가져오기
  const [directoryId, setDirectoryId] = useState<number>(0);
  const [param] = useState<payload>({
    id: fileDir, // Initially set to initialActiveListId
    option: sortOption,
  });

  const { data: directories, status: dirStatus } = useDirectories(param);
  const { data: passedfiles, status: fileStatus } = useFiles({
    id: directoryId,
    option: sortOption,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation((file: File) => uploadFiles(directoryId, file), {
    onMutate: () => {
      // You can perform actions before the mutation here
    },
    onError: (error) => {
      // Handle error if the mutation fails
      console.error("Mutation failed:", error);
    },
    onSuccess: (success) => {
      if (success) {
        console.log("File upload succeeded");
        queryClient.invalidateQueries("files");
        //setFileList([...files, data]);
      } else {
        console.error("File upload failed");
      }
    },
  });
  useEffect(() => {
    if (typeof localUser === "string") {
      setUser(JSON.parse(localUser));
    }
  }, []);

  // 대시보드 초기에 디렉토리데이터를 호출한다.
  useEffect(() => {
    if (directories !== undefined) {
      if (directories.code !== "") {
        codePresenter(directories.code);
        logout(user.id);
      } else {
        setDirectoryId(directories.response[0].id);
      }
    }
    if (passedfiles !== null) {
      setFileList(passedfiles?.response);
    }
  }, [directories, passedfiles]);

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
    if (!file || Object.keys(file).length === 0) {
      // Handle the case where 'file' is null or an empty object
      setIsDragActive(false);
      return false; // Return false to indicate that no file was uploaded
    }

    setIsDragActive(false);

    if (directoryId !== undefined) {
      try {
        // Call the mutation here to upload the file
        await mutation.mutateAsync(file);
        return true; // Return true to indicate that the upload was successful
      } catch (error) {
        console.error("File upload failed:", error);
        return false; // Return false to indicate that the upload failed
      }
    } else {
      console.error("directoryId is undefined");
      return false; // Return false to indicate that the directoryId is undefined
    }
    // console.log(file);
    // setIsDragActive(false);
    // await api
    //   .post(`api/file/${directoryId}/upload`, extractPath(file), {
    //     headers: { "Content-Type": "multipart/form-data" },
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     onUploadProgress: (e: any) => {
    //       //setPercent(Math.round((100 * e.loaded) / e.total));
    //       console.log(e);
    //     },
    //   })
    //   .then((res) => {
    //     queryClient.invalidateQueries("list");
    //     //setFileList([...files, res.data.response]);
    //     return true;
    //   })
    //   .catch(() => {
    //     return false;
    //   });
    // return false;
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true); // 드래그 중이므로 isDragActive를 true로 설정
  };
  const handleDragLeave = () => {
    setIsDragActive(false); // 드래그를 끝냈으므로 isDragActive를 false로 설정
  };
  const handleDoubleClick = (item: DataProps) => {
    event?.preventDefault();
    api
      .delete(
        `/api/file/${item.id}?storageType=${sortOption.storageType}&type=${item.type}`
      )
      .then((res) => console.log(res))
      .catch(() => console.log("err"));
  };
  const handleDirectoryId = (value: { id: React.SetStateAction<number> }) => {
    console.log(value);
    setDirectoryId(value.id);
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
          {/* <TreeList option={option} /> */}
          <div>
            {dirStatus === "loading" ? (
              <div>Loading...</div>
            ) : (
              // 트리데이터가 들어가야한다.
              directories?.response.map((i: { id: number; name?: string }) => (
                <div
                  key={`${i.id}_${i.name}`}
                  onClick={() => handleDirectoryId(i)}
                >
                  {i.name}
                </div>
              ))
            )}
          </div>
          <StyledRight
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {directoryId}
            {isDragActive && <DropZone onFilesUploaded={handleFilesUploaded} />}
            <Suspense
              fallback={fileStatus === "loading" && <div>Loading...</div>}
            >
              <DynamicComponent data={files} doubleClick={handleDoubleClick} />
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
  padding: 10px;
`;
export default Dashboard;
