import { useState, memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoListState";

export const AddForm=memo(()=>{


  const [todoTxt,setTodoTxt]=useState("");
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onChangeTxt = useCallback((event) => setTodoTxt(event.target.value));

  const addTask = useCallback(() => {
    setTodoList([
      ...todoList,
      {
        isChecked: false,
        isEdit:false,
        todoName: todoTxt
      }
    ]);
  });


  return (
    <>
      <input onChange={onChangeTxt}></input>
      <button onClick={addTask}>保存</button>
    </>
  );
});