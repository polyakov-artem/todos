import { render, RenderOptions, screen } from '@testing-library/react';
import { AppStore, createStore, preloadedState, RootState } from '../../../store/store';
import { Provider } from 'react-redux';
import { FC, PropsWithChildren, ReactNode } from 'react';
import Todos from './Todos';
import { describe } from 'vitest';
import { PLACEHOLDER } from '../TodosHeader/TodosHeader';
import { TODOS_LIST } from '../TodosList/TodosList';
import { TODO_ITEM, TODO_ITEM_COMPLETED } from '../TodoItem/TodoItem';
import { Filters, getNextId, Todo } from '../../../store/todosSlice';
import { BTN_SELECTED } from '../../shared/Button/Button';
import userEvent from '@testing-library/user-event';
import { TODOS_FOOTER_COUNTER_TEXT } from '../TodosFooter/TodosFooter';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: RootState;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactNode,
  {
    preloadedState,
    store = createStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

const getInput = () => screen.getByPlaceholderText<HTMLInputElement>(PLACEHOLDER);
const getList = () => screen.getByTestId(TODOS_LIST);
const queryTodoItems = () => screen.queryAllByTestId(TODO_ITEM);
const getCounterText = () => screen.getByTestId(TODOS_FOOTER_COUNTER_TEXT);
const getShowAllBtn = () => screen.getByRole<HTMLButtonElement>('button', { name: /all/i });
const getShowActiveBtn = () => screen.getByRole<HTMLButtonElement>('button', { name: /active/i });
const getShowCompletedBtn = () =>
  screen.getByRole<HTMLButtonElement>('button', { name: /^completed$/ });
const getClearBtn = () =>
  screen.getByRole<HTMLButtonElement>('button', { name: /clear completed/i });

const validateListRender = (todos: Todo[]) => {
  expect(getList()).toBeInTheDocument();
  const todoItems = queryTodoItems();
  expect(todoItems.length).toEqual(todos.length);

  todos.forEach((todo) => {
    const todoItem = todoItems.find((todoItem) => {
      const textContent = todoItem.textContent;
      if (!textContent) return false;

      return new RegExp(todo.task, 'i').test(textContent);
    });

    if (!todoItem) {
      throw new Error('Todo item was not found');
    }

    const hasClassCompleted = todoItem.classList.contains(TODO_ITEM_COMPLETED);

    if (todo.completed) {
      expect(hasClassCompleted).toBe(true);
    } else {
      expect(hasClassCompleted).toBe(false);
    }
  });
};

const validateTabsButtonsRender = (filter: Filters) => {
  const selectedBtnForFilter = {
    [Filters.all]: getShowAllBtn(),
    [Filters.completed]: getShowCompletedBtn(),
    [Filters.active]: getShowActiveBtn(),
  };

  const buttons = Object.values(selectedBtnForFilter);
  const expectedSelectedBtn = selectedBtnForFilter[filter];

  buttons.forEach((button) => {
    const hasClassSelected = button.classList.contains(BTN_SELECTED);

    if (expectedSelectedBtn === button) {
      expect(hasClassSelected).toBe(true);
    } else {
      expect(hasClassSelected).toBe(false);
    }
  });
};

const renderTodos = (preloadedState?: RootState) => {
  return {
    user: userEvent.setup(),
    ...renderWithProviders(<Todos />, { preloadedState }),
  };
};

describe('Todos', () => {
  describe('when rendered with preloaded state', () => {
    test('should render all components with correct classes', () => {
      renderTodos(preloadedState);

      const { todos, filter } = preloadedState.todos;
      expect(getInput()).toBeInTheDocument();
      expect(() => validateListRender(todos)).not.toThrow();
      expect(() => validateTabsButtonsRender(filter)).not.toThrow();
      expect(getCounterText()).toHaveTextContent('2 items left');
      expect(getClearBtn()).toBeInTheDocument();
    });
  });

  describe('when the user types the text ', () => {
    test('should display typed text in the input field', async () => {
      const { user } = renderTodos();
      const input = getInput();
      const newTask = 'Sleep well';

      await user.type(input, newTask);
      expect(input).toHaveValue(newTask);
    });
  });

  describe('when the user typed the text and pressed the enter key', () => {
    test('should add new task to the list, clear the input field, change the number of remaining tasks', async () => {
      const { user } = renderTodos();
      const input = getInput();
      const newTask = 'Sleep well';
      const expectedTodos = [{ task: newTask, completed: false, code: getNextId() }];

      await user.type(input, `${newTask}{enter}`);

      expect(input).toHaveValue('');
      expect(() => validateListRender(expectedTodos)).not.toThrow();
      expect(getCounterText().textContent).toBe('1 item left');
    });
  });

  describe('when the user clicks on an active task', () => {
    test('should make the task completed and change the number of remaining tasks', async () => {
      const todo = { task: 'Sleep well', completed: false, code: getNextId() };
      const preloadedState = {
        todos: {
          filter: Filters.all,
          todos: [todo],
        },
      };
      const expectedTodos = [{ ...todo, completed: true }];
      const { user } = renderTodos(preloadedState);

      await user.click(queryTodoItems()[0]);

      expect(() => validateListRender(expectedTodos)).not.toThrow();
      expect(getCounterText()).toHaveTextContent('All done');
    });
  });

  describe('when the user clicks on a completed task', () => {
    test('should make the task active and change the number of remaining tasks', async () => {
      const todo = { task: 'Sleep well', completed: true, code: getNextId() };
      const preloadedState = {
        todos: {
          filter: Filters.all,
          todos: [todo],
        },
      };
      const expectedTodos = [{ ...todo, completed: false }];
      const { user } = renderTodos(preloadedState);

      await user.click(queryTodoItems()[0]);

      expect(() => validateListRender(expectedTodos)).not.toThrow();
      expect(getCounterText()).toHaveTextContent('1 item left');
    });
  });

  describe('when the user clicks on the clear button', () => {
    test('should remove completed tasks and change the number of remaining tasks', async () => {
      const expectedTodos = preloadedState.todos.todos.filter((todo) => !todo.completed);
      const { user } = renderTodos(preloadedState);

      await user.click(getClearBtn());

      expect(() => validateListRender(expectedTodos)).not.toThrow();
      expect(getCounterText()).toHaveTextContent('2 items left');
    });
  });

  describe('when the user clicks on tabs buttons', () => {
    test('should change selected tab button and render list of task according to the selected tab', async () => {
      const expectedTodosOnTabAll = preloadedState.todos.todos;
      const expectedTodosOnTabActive = expectedTodosOnTabAll.filter((todo) => !todo.completed);
      const expectedTodosOnTabCompleted = expectedTodosOnTabAll.filter((todo) => todo.completed);
      const { user } = renderTodos(preloadedState);

      await user.click(getShowActiveBtn());
      expect(() => validateListRender(expectedTodosOnTabActive)).not.toThrow();
      expect(() => validateTabsButtonsRender(Filters.active)).not.toThrow();

      await user.click(getShowCompletedBtn());
      expect(() => validateListRender(expectedTodosOnTabCompleted)).not.toThrow();
      expect(() => validateTabsButtonsRender(Filters.completed)).not.toThrow();

      await user.click(getShowAllBtn());
      expect(() => validateListRender(expectedTodosOnTabAll)).not.toThrow();
      expect(() => validateTabsButtonsRender(Filters.all)).not.toThrow();
    });
  });
});
