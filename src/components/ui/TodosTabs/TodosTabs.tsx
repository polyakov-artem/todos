import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
import { Filters, selectTodosFilter, todosFilterChanged } from '../../../store/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import Button from '../../shared/Button/Button';
import './TodosTabs.scss';

export const TODOS_TABS = 'todos-tabs';

const TodosTabs: FC = () => {
  const filter = useAppSelector(selectTodosFilter);
  const dispatch = useAppDispatch();

  const handleBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const value = e.currentTarget.value as Filters;

      dispatch(todosFilterChanged(value));
    },
    [dispatch]
  );

  const tabs = useMemo(
    () =>
      Object.values(Filters).map((filterValue) => {
        const selected = filter === filterValue;
        return (
          <Button
            key={filterValue}
            capitalized
            selected={selected}
            value={filterValue}
            onClick={handleBtnClick}>
            {filterValue}
          </Button>
        );
      }),
    [filter]
  );

  return <div className={TODOS_TABS}>{tabs}</div>;
};

export default memo(TodosTabs);
