import React, { useState } from "react";
import styled from "styled-components";
import UploadedImageTable from "@components/UploadImageTable"; // 경로는 실제 파일 위치에 맞게 수정

const Dashboard: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ imageUrl: string; fileInfo: { name: string; size: number } }>
  >([]);
  const [tableMode, setTableMode] = useState<number>(1); // 1, 2, 3 중 하나의 값

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
        <ButtonContainer>
          <Button onClick={() => setTableMode(1)}>큰썸네일</Button>
          <Button onClick={() => setTableMode(2)}>작은썸네일</Button>
          <Button onClick={() => setTableMode(3)}>리스트</Button>
        </ButtonContainer>
        {uploadedImages.length > 0 ? (
          <TableBoundary>
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
  border: 2px dashed #cccccc;
  overflow: hidden; /* 오버플로우를 숨기기 위해 추가 */
`;

const NoImagesMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #999999;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #cccccc;
  cursor: pointer;
`;

export default Dashboard;
