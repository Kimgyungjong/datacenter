import React, { useState } from "react";
import styled from "styled-components";
import UploadedImageTable from "@components/UploadImageTable"; // 경로는 실제 파일 위치에 맞게 수정
import BreadCrumb from "@components/BreadCrumb";
import SortContainer from "../components/SortContainer";
interface UploadedImage {
  imageUrl: string;
  fileInfo: {
    name: string;
    size: number;
    date: string;
  };
}

const Dashboard: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<Array<UploadedImage>>(
    []
  );
  const [tableMode, setTableMode] = useState<number>(1); // 1, 2, 3 중 하나의 값

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
    console.log("여기에서 S3 이미지 업로드 로직이 들어가야함");
    event.currentTarget.style.border = "none";
  };
  const handleMode = (mode: number) => {
    setTableMode(mode);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.style.border = "2px dashed #cccccc";
  };
  const parsingTime = (time: string | number | Date) => {
    const lastModifiedDate = new Date(time);
    const koreanDateTime = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Seoul",
    }).format(lastModifiedDate);
    return koreanDateTime;
  };
  const handleFiles = (files: File[]) => {
    const newImages = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        imageUrl: URL.createObjectURL(file),
        fileInfo: {
          name: file.name,
          size: file.size,
          date: parsingTime(new Date()),
        },
      }));
    console.log(files);
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <DashboardContainer>
      <AsideTree>어사이드 트리</AsideTree>
      <TableSection onDrop={handleDrop} onDragOver={handleDragOver}>
        {uploadedImages.length > 0 ? (
          <TableBoundary>
            <BreadCrumb />
            <SortContainer onModeChange={handleMode} />
            <UploadedImageTable
              images={uploadedImages}
              imagesPerRow={tableMode === 2 ? 8 : 4}
              mode={tableMode}
            />
          </TableBoundary>
        ) : (
          <NoImagesMessage>업로드된 이미지가 없습니다.</NoImagesMessage>
        )}
      </TableSection>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 0;
  height: calc(100vh - 50px);
`;

const AsideTree = styled.section`
  background-color: #f0f0f0;
  padding: 20px;
  overflow: auto;
`;

const TableSection = styled.section`
  background-color: #ffffff;
  padding: 20px;
  overflow: auto;
`;

const TableBoundary = styled.div`
  overflow: hidden; /* 오버플로우를 숨기기 위해 추가 */
`;

const NoImagesMessage = styled.div`
  height: 80vh;
  line-height: 80vh;
  text-align: center;
  font-size: 18px;
  color: #999999;
`;

export default Dashboard;
