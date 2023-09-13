import React, { createContext, useState, useEffect, ReactNode } from "react";
import { DataProps, SortProps } from "../interfaces";
interface ContextType {
  files: DataProps[];
  setFileList: React.Dispatch<React.SetStateAction<DataProps[]>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  sortOption: SortProps;
  setSortOption: React.Dispatch<React.SetStateAction<SortProps>>;
  fileDir: number;
  setSelectDir: React.Dispatch<React.SetStateAction<number>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  selectedList: number;
  setSelectList: React.Dispatch<React.SetStateAction<number>>;
}

const defaultValue: ContextType = {
  files: [],
  setFileList: () => {},
  type: "list",
  setType: () => {},
  fileDir: 0,
  setSelectDir: () => {},
  user: {
    id: 1,
    name: "user",
    language: "ko_KR",
    role: "ADMIN",
    status: "ACTIVATE",
  },
  setUser: () => {},
  sortOption: {
    storageType: "S3",
    sort: "NAME",
    order: "ASC",
  },
  setSortOption: () => {},
  selectedList: 1,
  setSelectList: () => {},
};

interface User {
  id: number;
  name: string;
  language: string;
  role: string;
  status: string;
}
interface FilesContextType {
  files: DataProps[];
  setFileList: React.Dispatch<React.SetStateAction<DataProps[]>>;
  fileDir: number;
  setSelectDir: React.Dispatch<React.SetStateAction<number>>;
  selectedList: number;
  setSelectList: React.Dispatch<React.SetStateAction<number>>;
}

interface TypeContextType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  sortOption: { storageType: string; sort: string; order: string };
  setSortOption: React.Dispatch<React.SetStateAction<SortProps>>;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const FilesContext = createContext<FilesContextType>(defaultValue);
export const TypeContext = createContext<TypeContextType>(defaultValue);
export const UserContext = createContext<UserContextType>(defaultValue);

export const FilesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [files, setFileList] = useState<DataProps[]>([]);
  const [fileDir, setSelectDir] = useState<number>(0);
  const [selectedList, setSelectList] = useState(1);
  useEffect(() => {
    // Your logic to fetch files
  }, []);

  return (
    <FilesContext.Provider
      value={{
        files,
        setFileList,
        fileDir,
        setSelectDir,
        selectedList,
        setSelectList,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
export const TypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<string>("list");
  const [sortOption, setSortOption] = useState(defaultValue.sortOption);
  return (
    <TypeContext.Provider value={{ type, setType, sortOption, setSortOption }}>
      {children}
    </TypeContext.Provider>
  );
};
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
// 하나의 프로바이더로 묶기
export const MultiContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <UserProvider>
      <TypeProvider>
        <FilesProvider>{children}</FilesProvider>
      </TypeProvider>
    </UserProvider>
  );
};
