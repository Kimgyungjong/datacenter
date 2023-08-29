import React, { useState } from "react";
import { CustomData, NodeModel } from "../types";

type Props = {
  tree: NodeModel[];
  open: boolean;
  onClose: () => void;
  onSubmit: (e: Omit<NodeModel<CustomData>, "id">) => void;
};

export const AddDialog: React.FC<Props> = (props) => {
  const [text, setText] = useState("");
  const [parent, setParent] = useState(0);
  const [droppable, setDroppable] = useState(false);
  const [fileType, setFileType] = useState("text");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeParent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(Number(e.target.value));
  };

  const handleChangeDroppable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDroppable(e.target.checked);
  };
  const handleChangeFileType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileType(e.target.value);
  };

  return props.open ? (
    <div>
      <p>Add New Node</p>
      <section>
        <div>
          <input name="Text" onChange={handleChangeText} value={text} />
        </div>
        <div>
          <form>
            <label htmlFor="Parent">Parent</label>
            <select id="Parent" onChange={handleChangeParent} value={parent}>
              <option value={0}>(root)</option>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.text}
                  </option>
                ))}
            </select>
          </form>
        </div>
        <div>
          <div>
            <input
              type="checkbox"
              checked={droppable}
              onChange={handleChangeDroppable}
            />
          </div>
          <select
            name="FileType"
            onChange={handleChangeFileType}
            value={fileType}
          >
            <option value="text">TEXT</option>
            <option value="csv">CSV</option>
            <option value="image">IMAGE</option>
          </select>
        </div>
      </section>
      <div>
        <button onClick={props.onClose}>Cancel</button>
        <button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable,
            })
          }
        >
          Submit
        </button>
      </div>
    </div>
  ) : null;
};
