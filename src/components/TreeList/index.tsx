import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {} from "react-icons/fa";
import { getDirectoryList } from "@src/api/dashboard";
import TreeItem from "./item";
import { directoryProps } from "@/src/interfaces";
import { listdata } from "@/src/util/constants";
interface ListProps {
  id: number;
  name: string;
  type: string;
}

export default function TreeList() {
  const [root, setRoot] = useState< directoryProps | null | undefined>(null);
  const [list, setList] = useState<ListProps[] | []>([]);
  const [active, setActive] = useState<ListProps | null>(null);
  const handleActive = (item: ListProps) => {
    //root 초기화
    setRoot(null);
    setActive(item);
    getDirectoryList(item.id)
      .then((res) => {
        setRoot(res.data.response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setList(listdata);
  }, [root]);
  return (
    <StyledWrapper>
      {list.map((el) => (
        <TreeItem
          key={el.id}
          item={el}
          handleActive={handleActive}
          root={root}
          active={active}
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
