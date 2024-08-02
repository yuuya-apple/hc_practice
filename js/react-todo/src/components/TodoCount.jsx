import { memo } from "react";
import { useRecoilValue } from "recoil";
import { todoListState } from "../store/todoListState";

export const TodoCount = memo(() => {
  const todoList = useRecoilValue(todoListState);
  const compTodoCount=todoList.filter((item)=>(item.isChecked)).length

  return (
    <>
      <p>
        {`全てのタスク：${todoList.length} 完了済み：${compTodoCount} 未完了：${
          todoList.length - compTodoCount
        }のようにタスクの数を表示する`}
      </p>
    </>
  );
});
