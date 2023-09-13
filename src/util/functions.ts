export const typeIcon = (type: string) => {
  if (type === "" || type === "dir" || type === "DIRECTORY") {
    return "src/assets/images/type-folder.svg";
  } else if (type?.includes("image")) {
    return "src/assets/images/type-img.svg";
  } else if (type?.includes("application/pdf")) {
    return "src/assets/images/type-pdf.svg";
  } else if (type?.includes("application/zip")) {
    return "src/assets/images/type-package.svg";
  } else {
    return "src/assets/images/type-unknown.svg";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractPath = (file: any) => {
  const formData = new FormData();
  formData.append("storageType", "S3");
  formData.append("filePath", file.path);
  formData.append("file", file);

  for (const key of formData.keys()) {
    console.log(key, ":", formData.get(key));
  }
  return formData;
};

export const codePresenter = (code: string) => {
  switch (code) {
    case "TK0001":
      return alert("토큰이 유효하지 않습니다.");
    case "TK0002":
      return alert("TK0002");
    case "TK0003":
      return alert("중복로그인 입니다.");
    case "L0001":
      return alert("계정 정보가 없습니다.");
    case "L0002":
      return alert("비밀번호가 다릅니다.");
    case "D0001":
      return alert("디렉토리가 존재하지 않습니다");
    case "S0001":
      return alert("저장소 오류");
    case "S0002":
      return alert("저장소 파일 업로드 오류");
    case "S0003":
      return alert("저장소 파일 삭제 오류");
    default:
      return console.log(code + "알수 없는 오류");
  }
  alert(code);
};
