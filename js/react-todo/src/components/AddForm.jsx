import { useState, memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoListState";
import { v4 as uuid } from "uuid";

export const AddForm = memo(() => {
  const [todoTxt, setTodoTxt] = useState("");
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onChangeTxt = useCallback((event) => setTodoTxt(event.target.value));

  const addTask = useCallback(() => {
    setTodoList([
      ...todoList,
      {
        id: uuid(),
        isChecked: false,
        isEdit: false,
        todoName: todoTxt,
      },
    ]);
    setTodoTxt("");
  });

  return (
    <>
      <input value={todoTxt} onChange={onChangeTxt}></input>
      <button onClick={addTask}>保存</button>
    </>
  );
});
