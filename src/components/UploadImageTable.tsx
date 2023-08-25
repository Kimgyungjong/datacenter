import React from "react";
import styled from "styled-components";

interface UploadedImage {
  imageUrl: string;
  fileInfo: {
    name: string;
    size: number;
    date: string;
  };
}

interface UploadedImageTableProps {
  images: UploadedImage[];
  imagesPerRow?: number;
  mode: number; // 버튼 모드 값
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const UploadedImageTable: React.FC<UploadedImageTableProps> = ({
  images,
  imagesPerRow = 4,
  mode,
}) => {
  const imageRows = [];
  for (let i = 0; i < images.length; i += imagesPerRow) {
    const rowImages = images.slice(i, i + imagesPerRow);
    imageRows.push(rowImages);
  }

  return (
    <StyledTable row={imagesPerRow} mode={mode}>
      <thead>
        <tr>
          {mode === 3 && (
            <>
              <th>이미지</th>
              <th>파일명</th>
              <th>파일 정보</th>
              <th>업로드일자</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {mode !== 3
          ? imageRows.map((rowImages, rowIndex) => (
              <tr key={rowIndex}>
                {rowImages.map((imageInfo, imageIndex) => (
                  <td className="shadow-md" key={imageIndex}>
                    <ImageWrapper mode={mode}>
                      <StyledImage
                        src={imageInfo.imageUrl}
                        alt={`Uploaded ${rowIndex * imagesPerRow + imageIndex}`}
                      />
                      {mode === 1 || mode === 2 ? (
                        <ImageTextContainer>
                          <FileName>파일명: {imageInfo.fileInfo.name}</FileName>
                          <FileSize>
                            파일크기: {formatBytes(imageInfo.fileInfo.size)}
                          </FileSize>
                          <FileDate>{imageInfo.fileInfo.date}</FileDate>
                        </ImageTextContainer>
                      ) : null}
                    </ImageWrapper>
                  </td>
                ))}
              </tr>
            ))
          : images.map((imageInfo, imageIndex) => (
              <tr key={imageIndex}>
                <td>
                  <ImageWrapper mode={mode}>
                    <StyledImage
                      src={imageInfo.imageUrl}
                      alt={`Uploaded ${imageIndex}`}
                    />
                  </ImageWrapper>
                </td>
                <td>
                  <FileName>파일명: {imageInfo.fileInfo.name}</FileName>
                </td>
                <td>
                  <FileSize>
                    파일크기: {formatBytes(imageInfo.fileInfo.size)}
                  </FileSize>
                </td>
                <td>
                  <div>
                    <div>{imageInfo.fileInfo.date}</div>
                  </div>
                </td>
              </tr>
            ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table<{ row: number; mode: number }>`
  width: 100%;
  border-collapse: ${(props) => (props.mode === 3 ? "collapse" : "inherit")}; /*
  table-layout: ${(props) =>
    props.mode === 3 ? "auto" : "fixed"}; /* 조건부 스타일링 */
  border-spacing: ${(props) => (props.mode === 3 ? "0" : "12px")};
  th,
  td {
    &:first-child {
      border-left: none;
    }
    &:nth-child(${(props) => props.row}) {
      border-right: none;
    }
    padding: 10px;
    text-align: center;
    width: ${(props) =>
      props.mode === 3 ? "auto" : `calc(100% / ${props.row})`};
    height: ${(props) =>
      props.mode === 3
        ? "30px"
        : props.mode === 2
        ? "200px"
        : "350px"}; /* 조건부 스타일링 */
  }
  tr {
    &:first-child td {
      border-top: none;
    }
    &:last-child td {
      border-bottom: none;
    }
  }
  /* 갭을 만들기 위한 스타일 */
  tr + tr {
    margin-top: 12px; /* 갭의 크기 조절 */
  }
`;

const ImageWrapper = styled.div<{ mode: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: ${(props) =>
    props.mode === 3
      ? "30px"
      : props.mode === 2
      ? "150px"
      : "250px"}; /* 조건부 스타일링 */
`;
const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  text-align: center;
`;
const StyledImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const FileName = styled.p`
  font-size: 12px;
  color: #666666;
`;

const FileSize = styled.p`
  font-size: 12px;
  color: #666666;
`;
const FileDate = styled.p`
  font-size: 12px;
  color: #666666;
`;
export default UploadedImageTable;
