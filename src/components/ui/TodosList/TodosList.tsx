import { FC, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import {
  Filters,
  selectTodos,
  selectTodosFilter,
  Todo,
  todoStateChanged,
} from '../../../store/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import './TodosList.scss';

export const TODOS_LIST = 'todos-list';

const filterCases = {
  [Filters.active]: (todo: Todo) => !todo.completed,
  [Filters.completed]: (todo: Todo) => todo.completed,
};

const TodosList: FC = () => {
  const todos = useAppSelector(selectTodos);
  const filter = useAppSelector(selectTodosFilter);
  const dispatch = useAppDispatch();

  const handleItemClick = useCallback(
    (code: number) => {
      dispatch(todoStateChanged(code));
    },
    [dispatch]
  );

  const todoItems = useMemo(() => {
    const filteredTodos = filter === Filters.all ? todos : todos.filter(filterCases[filter]);

    return filteredTodos.map((todo) => (
      <TodoItem key={todo.code} todo={todo} onClick={handleItemClick} />
    ));
  }, [filter, todos, handleItemClick]);

  return (
    <ul className={TODOS_LIST} data-testid={TODOS_LIST}>
      {todoItems}
    </ul>
  );
};

export default TodosList;
