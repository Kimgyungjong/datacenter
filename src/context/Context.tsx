import React, { createContext, useState, useEffect, ReactNode } from "react";
interface ContextType {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultValue: ContextType = {
  files: [],
  setFiles: () => {},
  type: "list",
  setType: () => {},
  user: { id: "", username: "" },
  setUser: () => {},
};
interface File {
  id: number;
  file: File;
}
interface User {
  id: string;
  username: string;
}
interface FilesContextType {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

interface TypeContextType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
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
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    // Your logic to fetch files
  }, []);

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      {children}
    </FilesContext.Provider>
  );
};
export const TypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<string>("list");

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ id: "", username: "" });

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
