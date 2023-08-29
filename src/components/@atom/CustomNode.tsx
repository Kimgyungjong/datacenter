import React, { useState } from "react";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { CustomData } from "../types";
import styles from "./CustomNode.module.css";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { id, text } = props.node;
  const [hover, setHover] = useState<boolean>(false);
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && <div onClick={handleToggle}>{">"}</div>}
      </div>
      <div className={styles.labelGridItem}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.textField}
              ${styles.nodeInput}`}
              value={labelText}
              onChange={handleChangeText}
            />
            <button
              className={styles.editButton}
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              {"check"}
            </button>
            <button className={styles.editButton} onClick={handleCancel}>
              {"close"}
            </button>
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <span className={styles.nodeLabel}>{props.node.text}</span>
            <button className={styles.editButton} onClick={handleShowInput}>
              {"edit"}
            </button>
          </div>
        )}
      </div>
      {hover && (
        <>
          <div className={styles.actionButton}>
            <button onClick={() => props.onDelete(id)}>{"delete"}</button>
          </div>
        </>
      )}
    </div>
  );
};
