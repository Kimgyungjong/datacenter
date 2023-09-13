import { useState } from "react";
import { styled } from "styled-components";
import {} from "react-icons/fa";
import TreeItem from "./item";
import { directoryProps } from "@/src/interfaces";
import { listdata } from "@/src/util/constants";

interface ListProps {
  id: number;
  name: string;
  type: string;
}
interface OptionProps {
  option: { dirId: number };
}
export default function TreeList({ option }: OptionProps) {
  //const { user } = useContext(UserContext);
  const [folderArray, setFolderArray] = useState<
    directoryProps[] | null | undefined
  >(null);
  const [activeId, setActiveId] = useState<number | undefined>(0);

  // 활성화된 아이디가 있을 경우 파라미터를 넣어서 디렉토리 데이터를 불러온다.
  // useEffect(() => {
  //   if (activeId !== undefined) {
  //     setQueryParam({ id: activeId, option: sortOption });
  //     setFolderArray(data?.response);
  //   }
  // }, [activeId, sortOption]);

  // 데이터가 있을 경우 선택된 디렉토리에 활성화된 아이디를 넣는다.
  // 선택된 디렉토리의 데이터를 폴더배열에 넣는다.
  // useEffect(() => {
  //   if (data) {
  //     if (data?.code !== "") {
  //       codePresenter(data?.code);
  //     } else {
  //       if (activeId !== undefined) {
  //         // 디렉토리 선택 저장
  //         setSelectDir(activeId);
  //         // 선택된 디렉토리의 데이터 저장
  //         setFolderArray(data.response);
  //       }
  //     }
  //   }
  // }, [data]);

  const handleActive = (item: ListProps) => {
    setFolderArray(null);
    setActiveId(item.id);
  };
  if (status === "loading") {
    return <StyledWrapper>Loading...</StyledWrapper>;
  }
  if (status === "error") {
    return <StyledWrapper>Error!!</StyledWrapper>;
  }
  return (
    <StyledWrapper>
      <h1>폴더 루트 : {option.dirId}</h1>
      {listdata.map((el) => (
        <TreeItem
          key={el.id}
          item={el}
          handleActive={handleActive}
          folderArray={folderArray}
          activeId={activeId}
        />
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  border-right: 1px solid #eee;
  button {
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
  }
  & .list-item {
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: rgba(150, 150, 150, 0.1);
    margin: 4px 6px;
    cursor: pointer;
    &:hover {
      background-color: #a88ef1;
      color: #fff;
    }
    &.active {
      background-color: #693ce1;
      color: #fff;
    }
  }
`;
