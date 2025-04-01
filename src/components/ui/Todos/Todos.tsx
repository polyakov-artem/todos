import { FC } from 'react';
import TodosHeader from '../TodosHeader/TodosHeader';
import TodosList from '../TodosList/TodosList';
import './Todos.scss';

export const TODOS = 'todos';
export const TODOS_INPUT = `${TODOS}__input`;
export const TODOS_LIST = `${TODOS}__list`;
export const TODOS_ITEM = `${TODOS}__item`;

const Todos: FC = () => {
  return (
    <div className={TODOS}>
      <TodosHeader />
      <TodosList />
    </div>
  );
};

export default Todos;
