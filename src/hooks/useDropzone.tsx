import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "styled-components";
interface DropZoneProps {
  onFilesUploaded: (file: File) => Promise<boolean>;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesUploaded }) => {
  const [dragActive, setDragActive] = useState(false); // 드래그상태를 관리하는 상태

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onFilesUploaded(acceptedFiles[0]);
      return;
    }
    for (let idx = 0; idx < acceptedFiles.length; idx++) {
      const file = acceptedFiles[idx];
      try {
        const success = await onFilesUploaded(file);

        // While onFilesUploaded returns true, call it again for the next file
        while (success) {
          idx++; // Move to the next file
          if (idx >= acceptedFiles.length) {
            // All files are uploaded, exit the loop
            break;
          }
          const nextFile = acceptedFiles[idx];
          const nextSuccess = await onFilesUploaded(nextFile);
          if (!nextSuccess) {
            break; // If the next upload fails, exit the loop
          }
        }
        // Display an alert when a file upload is completed
        alert("File upload completed successfully!");
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    }
  }, []);
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
