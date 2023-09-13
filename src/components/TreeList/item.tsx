import React, { useMemo, useState, useContext, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { styled } from "styled-components";
import { typeIcon } from "@/src/util/functions";
import { FilesContext, TypeContext } from "@src/context/Context";
import { ListProps, TreeProps, ItemProps } from "@/src/interfaces";
import { useFiles } from "@/src/api/dashboard";
import { codePresenter } from "@/src/util/functions";

type payload = {
  id: number | undefined;
  option: { storageType: string; sort: string; order: string };
};

const List = React.memo(({ folderArray, isActiveItem }: ListProps) => {
  const { sortOption } = useContext(TypeContext);
  const { setFileList, setSelectDir } = useContext(FilesContext);

  const initialActiveListId = useMemo(() => {
    if (folderArray && folderArray.length > 0) {
      return folderArray[0].id;
    }
    return 1; // Default to undefined when folderArray is null or empty
  }, [folderArray]);

  const [activeListId, setActiveItemId] = useState<number | undefined>(
    initialActiveListId
  );

  const [queryParam, setQueryParam] = useState<payload>({
    id: activeListId, // Initially set to initialActiveListId
    option: sortOption,
  });
  const { data } = useFiles(queryParam);

  const handleFileList = (id: number | undefined) => {
    setActiveItemId(id); // Update activeListId when a different item is clicked
    setQueryParam({ id, option: sortOption });
  };
  useEffect(() => {
    if (folderArray && folderArray.length > 0) {
      // Set initialActiveListId to the ID of the first item in folderArray
      const newInitialActiveListId = folderArray[0].id;
      setActiveItemId(newInitialActiveListId);
    }
  }, [folderArray]);
  useEffect(() => {
    if (isActiveItem && activeListId !== undefined) {
      setSelectDir(activeListId);
      setQueryParam({ id: activeListId, option: sortOption });
    } else {
      console.log("응?" + activeListId + isActiveItem);
    }
  }, [activeListId, isActiveItem, sortOption]);

  useEffect(() => {
    if (data) {
      if (data?.code !== "") {
        codePresenter(data?.code);
      } else {
        if (isActiveItem !== undefined) {
          setFileList(data.response);
        }
      }
    }
  }, [data]);

  return (
    <>
      {folderArray &&
        folderArray.map((folder) => (
          <StyledList
            key={`${folder.name}_${folder.id}`}
            className={`${activeListId === folder.id && "active"}`}
            onClick={() => handleFileList(folder.id)}
          >
            <img src={typeIcon("dir")} alt="" style={{ width: "24px" }} />
            <div>{folder.name}</div>
          </StyledList>
        ))}
    </>
  );
});

const TreeItem = React.memo(
  ({ item, activeId, handleActive, folderArray }: TreeProps) => {
    const isActiveItem = activeId === item.id && folderArray !== undefined;
    const memoizedList = useMemo(() => {
      return <List folderArray={folderArray} isActiveItem={isActiveItem} />;
    }, [folderArray]);

    const handleItem = (item: ItemProps) => {
      if (activeId === item.id) {
        return;
      }
      handleActive(item);
    };

    return (
      <div key={item.id}>
        <div>
          <StyledWrapper
            onClick={() => handleItem(item)}
            className={`list-item ${activeId === item.id && "active"}`}
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
