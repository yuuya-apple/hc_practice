import { memo, useCallback, useState } from "react";

import { useRecoilValue } from "recoil";
import { todoListState } from "../store/todoListState";

export const TodoItem = (props) => {
  const { item, index, setTodoList } = props;

  const [todoTxt, setTodoTxt] = useState(item.todoName);
  const todoList = useRecoilValue(todoListState);
  console.log(index);

  const deleteItem = () => {
    if (!window.confirm("本当によろしいですか？")) {
      return;
    }
    setTodoList((prepTodoList) => prepTodoList.filter((item, i) => index != i));
  };

  const onChangeCheckbox = useCallback(() => {
    const newTodoList = [...todoList];
    newTodoList[index] = { ...todoList[index] };
    newTodoList[index].isChecked = !todoList[index].isChecked;
    setTodoList(newTodoList);
  });

  const onChangeEdit = useCallback(() => {
    const newTodoList = [...todoList];
    newTodoList[index] = { ...todoList[index] };
    newTodoList[index].isEdit = !todoList[index].isEdit;

    if (newTodoList[index].isEdit) {
      setTodoTxt(newTodoList[index].todoName);
    } else {
      newTodoList[index].todoName = todoTxt;
    }

    setTodoList(newTodoList);
  });

  const onChangeTxt = useCallback((event) => {
    setTodoTxt(event.target.value);
  });

  const normalView = (
    <div id={index}>
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={onChangeCheckbox}
      />
      {item.todoName}
      <button onClick={onChangeEdit}>編集</button>
      <button onClick={deleteItem}>削除</button>
    </div>
  );

  const editView = (
    <div id={index}>
      <input type="text" value={todoTxt} onChange={onChangeTxt} />
      <button onClick={onChangeEdit}>保存</button>
    </div>
  );

  return item.isEdit ? editView : normalView;
};
