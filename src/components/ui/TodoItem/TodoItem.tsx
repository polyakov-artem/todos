import { FC } from 'react';
import { Todo } from '../../../store/todosSlice';
import classNames from 'classnames';
import './TodoItem.scss';

export const TODO_ITEM = 'todo-item';
export const TODO_ITEM_COMPLETED = `${TODO_ITEM}_completed`;
export const TODO_ITEM_ICON = `${TODO_ITEM}__icon`;
export const TODO_ITEM_TEXT = `${TODO_ITEM}__text`;

export type TodoItemProps = {
  todo: Todo;
};

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { task, completed } = todo;
  const classes = classNames(TODO_ITEM, { [TODO_ITEM_COMPLETED]: completed });

  return (
    <li className={classes}>
      <span className={TODO_ITEM_ICON} />
      <span className={TODO_ITEM_TEXT}>{task}</span>
    </li>
  );
};

export default TodoItem;
