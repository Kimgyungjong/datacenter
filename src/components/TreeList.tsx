import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  DragLayerMonitorProps,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import sampleData from "@src/assets/initialData.json";
import { CustomNode } from "./@atom/CustomNode";
import { NodeModel, CustomData } from "./types";
import { CustomDragPreview } from "./@atom/CustomDragPreview";
import { AddDialog } from "./@atom/AddDialog";
import { styled } from "styled-components";
const getLastId = (treeData: NodeModel[]) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

export default function TreeList({ children }) {
  const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(sampleData);
  const handleDrop = (newTree: NodeModel<CustomData>[]) => setTreeData(newTree);
  // 폴더생성오픈
  const [open, setOpen] = useState<boolean>(false);
  // 폴더삭제
  const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };
  const handleSubmit = (newNode: Omit<NodeModel<CustomData>, "id">) => {
    const lastId = getLastId(treeData);
    let incrementedId: string | number;

    if (typeof lastId === "string") {
      incrementedId = parseInt(lastId, 10) + 1;
    } else {
      incrementedId = lastId;
    }

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: incrementedId,
      },
    ]);

    setOpen(false);
  };

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  return (
    <StyledWrapper>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        {children}
        {/* <Tree
          tree={treeData}
          rootId={0}
          render={(node: NodeModel<CustomData>, options) => (
            <CustomNode
              node={node}
              {...options}
              depth={options.depth}
              isOpen={options.isOpen}
              onToggle={options.onToggle}
              onDelete={handleDelete}
              onTextChange={handleTextChange}
            />
          )}
          dragPreviewRender={(
            monitorProps: DragLayerMonitorProps<CustomData>
          ) => <CustomDragPreview monitorProps={monitorProps} />}
          onDrop={handleDrop}
          sort={false}
        /> */}
      </DndProvider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
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
`;
