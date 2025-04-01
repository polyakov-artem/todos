import { FC } from 'react';
import TodosHeader from '../TodosHeader/TodosHeader';
import TodosList from '../TodosList/TodosList';
import TodosFooter from '../TodosFooter/TodosFooter';
import './Todos.scss';

export const TODOS = 'todos';

const Todos: FC = () => {
  return (
    <div className={TODOS}>
      <TodosHeader />
      <TodosList />
      <TodosFooter />
    </div>
  );
};

export default Todos;
