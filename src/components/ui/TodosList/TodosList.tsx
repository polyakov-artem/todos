import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { selectTodos, todoStateChanged } from '../../../store/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import './TodosList.scss';

export const TODOS_LIST = 'todos-list';

const TodosList: FC = () => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const handleItemClick = useCallback(
    (code: number) => {
      dispatch(todoStateChanged(code));
    },
    [dispatch]
  );

  return (
    <ul className={TODOS_LIST}>
      {todos.map((todo) => (
        <TodoItem key={todo.code} todo={todo} onClick={handleItemClick} />
      ))}
    </ul>
  );
};

export default TodosList;
