import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { todoAdded } from '../../../store/todosSlice';
import './TodosHeader.scss';

interface CustomElements extends HTMLFormControlsCollection {
  task: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export const TODOS_HEADER = 'todos-header';
export const TODOS_HEADER_FORM = `${TODOS_HEADER}__form`;
export const TODOS_HEADER_INPUT = `${TODOS_HEADER}__input`;
export const TODOS_HEADER_INPUT_GROUP = `${TODOS_HEADER}__input-group`;
export const TODOS_HEADER_INPUT_ICON = `${TODOS_HEADER}__input-icon`;
const PLACEHOLDER = 'What needs to be done';

const TodosHeader: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<CustomForm>) => {
      e.preventDefault();
      const value = e.currentTarget.elements.task.value;
      dispatch(todoAdded(value));
      setInputValue('');
    },
    [dispatch]
  );

  return (
    <div className={TODOS_HEADER}>
      <form className={TODOS_HEADER_FORM} onSubmit={handleSubmit}>
        <div className={TODOS_HEADER_INPUT_GROUP}>
          <span className={TODOS_HEADER_INPUT_ICON} />
          <input
            className={TODOS_HEADER_INPUT}
            type="text"
            value={inputValue}
            name="task"
            onChange={handleInputChange}
            placeholder={PLACEHOLDER}
          />
        </div>
      </form>
    </div>
  );
};

export default TodosHeader;
