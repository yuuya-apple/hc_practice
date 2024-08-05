import { memo } from "react";
import { useRecoilValue } from "recoil";
import { todoListState } from "../store/todoListState";
import { TodoItem } from "./TodoItem";

export const TodoList = memo(() => {
  const todoList = useRecoilValue(todoListState);

  const todoListView = todoList.map((item) => (
    <li key={item.id}>
      <TodoItem item={item} />
    </li>
  ));

  return <ul>{todoListView}</ul>;
});
