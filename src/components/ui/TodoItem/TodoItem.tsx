import { FC, memo, useCallback } from 'react';
import { Todo } from '../../../store/todosSlice';
import classNames from 'classnames';
import './TodoItem.scss';

export const TODO_ITEM = 'todo-item';
export const TODO_ITEM_COMPLETED = `${TODO_ITEM}_completed`;
export const TODO_ITEM_ICON = `${TODO_ITEM}__icon`;
export const TODO_ITEM_TEXT = `${TODO_ITEM}__text`;

export type TodoItemProps = {
  todo: Todo;
  onClick: (code: number) => void;
};

const TodoItem: FC<TodoItemProps> = ({ todo, onClick }) => {
  const { task, code, completed } = todo;
  const classes = classNames(TODO_ITEM, { [TODO_ITEM_COMPLETED]: completed });

  const handleClick = useCallback(() => {
    onClick(code);
  }, [onClick, code]);

  return (
    <li className={classes} onClick={handleClick}>
      <span className={TODO_ITEM_ICON} />
      <span className={TODO_ITEM_TEXT}>{task}</span>
    </li>
  );
};

export default memo(TodoItem);
