import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "./TodoInsert.css";

const TodoInsert = (props) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onInsertToggle = () => {
    props.setInsertToggle((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.onInsertTodo(value);
    setValue("");
    onInsertToggle();
  };
  useEffect(() => {
    if (props.selectedTodo) {
      setValue(props.selectedTodo.text);
    }
  }, [props.selectedTodo]);
  return (
    <div>
      <div className="background" onClick={props.onInsertToggle}></div>
      <form
        onSubmit={
          props.selectedTodo
            ? () => {
                props.onUpdate(props.selectedTodo.id, value);
              }
            : onSubmit
        }
      >
        <input
          placeholder="please type"
          value={value}
          onChange={onChange}
        ></input>
        {props.selectedTodo ? (
          <div className="rewrite">
            <FaPencilAlt
              onClick={() => {
                props.onUpdate(props.selectedTodo.id, value);
              }}
            />
            <FaTrashAlt
              onClick={() => {
                props.onRemove(props.selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit">
            <MdAddCircle />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInsert;
