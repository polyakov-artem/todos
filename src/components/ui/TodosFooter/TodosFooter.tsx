import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { completedTodosDeleted, selectTodos } from '../../../store/todosSlice';
import TodosTabs from '../TodosTabs/TodosTabs';
import Button from '../../shared/Button/Button';
import './TodosFooter.scss';

export const TODOS_FOOTER = 'todos-footer';
export const TODOS_FOOTER_COUNTER_TEXT = `${TODOS_FOOTER}__counter-text`;
export const TODOS_FOOTER_BTN = `${TODOS_FOOTER}__btn`;

const getCounterText = (count: number): string => {
  const COUNTER_TEXT = 'item left';
  const COUNTER_TEXT_PLURAL = 'items left';
  const COUNTER_TEXT_DEFAULT = 'All done';

  return count === 0
    ? COUNTER_TEXT_DEFAULT
    : count === 1
      ? `${count} ${COUNTER_TEXT}`
      : `${count} ${COUNTER_TEXT_PLURAL}`;
};

const TodosFooter: FC = () => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const count = todos.filter((todo) => !todo.completed).length;
  const counterText = getCounterText(count);

  const handleClearBtnClick = useCallback(() => {
    dispatch(completedTodosDeleted());
  }, [dispatch]);

  return (
    <div className={TODOS_FOOTER}>
      <span className={TODOS_FOOTER_COUNTER_TEXT} data-testid={TODOS_FOOTER_COUNTER_TEXT}>
        {counterText}
      </span>
      <TodosTabs />
      <Button className={TODOS_FOOTER_BTN} onClick={handleClearBtnClick}>
        Clear completed
      </Button>
    </div>
  );
};

export default TodosFooter;
