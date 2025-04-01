import { FC } from 'react';
import { useAppSelector } from '../../../hooks/store-hooks';
import { selectTodos } from '../../../store/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import './TodosList.scss';

export const TODOS_LIST = 'todos-list';

const TodosList: FC = () => {
  const todos = useAppSelector(selectTodos);

  return (
    <ul className={TODOS_LIST}>
      {todos.map((todo) => (
        <TodoItem key={todo.code} todo={todo} />
      ))}
    </ul>
  );
};

export default TodosList;
