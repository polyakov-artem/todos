import Todos from './components/ui/Todos/Todos';
import './scss/index.scss';

export const PAGE = 'page';
export const PAGE_WRAP = `${PAGE}__wrap`;
export const PAGE_TITLE = `${PAGE}__title`;

function App() {
  return (
    <main className={PAGE}>
      <div className={PAGE_WRAP}>
        <h1 className={PAGE_TITLE}>Todos</h1>
        <Todos />
      </div>
    </main>
  );
}

export default App;
