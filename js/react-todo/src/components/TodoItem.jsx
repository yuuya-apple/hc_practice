import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoListState";

export const TodoItem = memo((props) => {
  const { item, index } = props;
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const deleteItem = useCallback(() => {
    if (!window.confirm("本当によろしいですか？")) {
      return;
    }
    setTodoList(todoList.filter((item, i) => index != i));
  });

  const onChangeCheckbox = useCallback(() => {
    const indexItem = todoList[index];

    setTodoList([
      ...todoList.slice(0, index),
      {
        isChecked: !indexItem.isChecked,
        isEdit: indexItem.isEdit,
        todoName: indexItem.todoName,
      },
      ...todoList.slice(index + 1),
    ]);
  });

  const onChangeEdit = useCallback(() => {
    const indexItem = todoList[index];

    setTodoList([
      ...todoList.slice(0, index),
      {
        isChecked: indexItem.isChecked,
        isEdit: !indexItem.isEdit,
        todoName: indexItem.todoName,
      },
      ...todoList.slice(index + 1),
    ]);
  });

  const onChangeTxt = useCallback((event) => {
    const indexItem = todoList[index];

    setTodoList([
      ...todoList.slice(0, index),
      {
        isChecked: indexItem.isChecked,
        isEdit: indexItem.isEdit,
        todoName: event.target.value,
      },
      ...todoList.slice(index + 1),
    ]);
  });

  const normalView = (
    <>
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={onChangeCheckbox}
      />
      {item.todoName}
      <button onClick={onChangeEdit}>編集</button>
      <button onClick={deleteItem}>削除</button>
    </>
  );

  const editView = (
    <>
      <input type="text" value={item.todoName} onChange={onChangeTxt} />
      <button onClick={onChangeEdit}>保存</button>
    </>
  );

  return item.isEdit ? editView : normalView;
});
