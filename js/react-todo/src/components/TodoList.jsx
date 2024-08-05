import { memo } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoListState";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  console.log(todoList);

  const todoListView = todoList.map((item, index) => (
    <li key={index}>
      <TodoItem item={item} index={index} setTodoList={setTodoList} />
    </li>
  ));

  return <ul>{todoListView}</ul>;
};
