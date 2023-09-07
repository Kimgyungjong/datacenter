import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "styled-components";
interface DropZoneProps {
  onFilesUploaded: (file: File, id: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesUploaded }) => {
  const [dragActive, setDragActive] = useState(false); // 드래그 상태를 관리하는 상태

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file, idx) => {
        const directoryId = idx;
        onFilesUploaded(file, directoryId);
      });
    },
    [onFilesUploaded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true), // 드래그가 시작될 때
    onDragLeave: () => setDragActive(false), // 드래그가 종료될 때
  });

  return (
    <StyledContainer {...getRootProps()} className={dragActive ? "" : ""}>
      <p style={{ pointerEvents: "none" }}>
        파일을 드래그하거나 파일 업로드 버튼을 클릭하세요.
      </p>
      <div className="h-[100px]" style={{ paddingTop: "10px" }}>
        <StyledButton {...getRootProps()}>
          FilUpload
          <input {...getInputProps()} />
        </StyledButton>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-48%);
  top: 50%;
  display: flex;
  flex-direction: column;
  border: 2px dashed #aaa;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  width: calc(100vw - 300px);
  height: calc(100vh - 130px);
  padding: 40px;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #693ce1;
  color: #fff;
  border-radius: 10px;
  padding: 9px 14px;
  width: 120px;
  height: 34px;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #f0a050;
  }
  &:active {
    width: 102px;
    height: 30px;
  }
  cursor: pointer;
`;
export default DropZone;
