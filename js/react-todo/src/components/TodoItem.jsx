import { memo, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todoListState";

export const TodoItem = memo((props) => {
  const { item } = props;
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoTxt, setTodoTxt] = useState(item.todoName);

  const deleteItem = useCallback(() => {
    if (!window.confirm("本当によろしいですか？")) {
      return;
    }
    setTodoList(todoList.filter((entity) => entity.id != item.id));
  });

  const onChangeCheckbox = useCallback(() =>
    setTodoList(
      todoList.map((entity) => {
        if (entity.id === item.id) {
          const newItem = { ...entity };
          newItem.isChecked = !newItem.isChecked;
          return newItem;
        } else {
          return entity;
        }
      })
    )
  );

  const onChangeEdit = useCallback(() =>
    setTodoList(
      todoList.map((entity) => {
        if (entity.id === item.id) {
          const newItem = { ...entity };
          newItem.isEdit = !newItem.isEdit;
          if (!newItem.isEdit) {
            newItem.todoName = todoTxt;
          }
          return newItem;
        } else {
          return entity;
        }
      })
    )
  );

  const onChangeTxt = useCallback((event) => {
    setTodoTxt(event.target.value);
  });

  const normalView = (
    <div>
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
    <div>
      <input type="text" value={todoTxt} onChange={onChangeTxt} />
      <button onClick={onChangeEdit}>保存</button>
    </div>
  );

  return item.isEdit ? editView : normalView;
});
