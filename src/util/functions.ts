export const typeIcon = (type: string) => {
  switch (type) {
    case "image/jpeg":
    case "image/jpg":
    case "image/png":
    case "image/svg":
      return "src/assets/images/type-img.svg";
    case "zip":
      return "src/assets/images/type-package.svg";
    case "dir":
      return "src/assets/images/type-folder.svg";
    default:
      return "src/assets/images/type-unknown.svg";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractPath = (file: any) => {
  const formData = new FormData();
  formData.append("storageType", "S3");
  formData.append("filePath", file.path);
  formData.append("file", file);
  return formData;
};
