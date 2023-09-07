import React, { useMemo, useState, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { styled } from "styled-components";
import { typeIcon } from "@/src/util/functions";
import { getFileList } from "@src/api/dashboard";
import { FilesContext } from "@src/context/Context";
import { directoryProps } from "@/src/interfaces";

interface ItemProps {
  id: number;
  name: string;
  type: string;
}
interface DirectoryProps {
  item: ItemProps;
  active: ItemProps | null;
  handleActive: (item: ItemProps) => void;
  root: directoryProps | null| undefined;
}
interface ListProps {
  data: directoryProps | null| undefined;
}
const List = React.memo(({ data }: ListProps) => {
  const [select, setSelect] = useState(false);
  const { setFilList, setSelectDir } = useContext(FilesContext);
  const handleFileList = (id: number) => {
    setSelect(!select);
    if (!select === true) {
      console.log("call api");
      getFileList(id)
        .then((res) => {
          setFilList(res.data.response);
          setSelectDir(id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("reset");
      setFilList([]);
    }
    // 파일정보를 저장해서 콘텍스트로 넘긴다
  };
  return (
    <>
      {data && (
        <StyledList
          className={`${select && "active"}`}
          onClick={() => handleFileList(data.id)}
        >
          <img src={typeIcon("dir")} alt="" style={{ width: "24px" }} />
          <div>{data.name}</div>
        </StyledList>
      )}
    </>
  );
});

const TreeItem = React.memo(
  ({ item, active, handleActive, root }: DirectoryProps) => {
    const isActiveItem = active === item && root !== undefined;
    const memoizedList = useMemo(() => {
      return <List data={root} />;
    }, [root]);

    return (
      <div key={item.id}>
        <div>
          <StyledWrapper
            onClick={() => handleActive(item)}
            className={`list-item ${active === item && "active"}`}
          >
            <span className="ml-2">{item.name}</span>
            {isActiveItem ? <FaChevronDown /> : <FaChevronUp />}
          </StyledWrapper>
          {isActiveItem && memoizedList}
        </div>
      </div>
    );
  }
);

const StyledList = styled.div`
  display: flex;
  margin: 10px 12px;
  padding-left: 24px;
  &.active {
    background-color: #a1e0ff;
  }
  & img {
    margin-right: 10px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default TreeItem;
