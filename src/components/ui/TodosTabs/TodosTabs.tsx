import { FC, memo, useMemo } from 'react';
import { Filters, selectTodosFilter } from '../../../store/todosSlice';
import { useAppSelector } from '../../../hooks/store-hooks';
import Button from '../../shared/Button/Button';
import './TodosTabs.scss';

export const TODOS_TABS = 'todos-tabs';

const TodosTabs: FC = () => {
  const filter = useAppSelector(selectTodosFilter);

  const tabs = useMemo(
    () =>
      Object.values(Filters).map((filterValue) => {
        const selected = filter === filterValue;
        return (
          <Button key={filterValue} capitalized selected={selected}>
            {filterValue}
          </Button>
        );
      }),
    [filter]
  );

  return <div className={TODOS_TABS}>{tabs}</div>;
};

export default memo(TodosTabs);
