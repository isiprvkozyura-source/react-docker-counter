import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Счётчик кликов</h1>
        <p className="App-counter" data-testid="counter-value">
          {count}
        </p>
        <div className="App-buttons">
          <button
            type="button"
            className="App-button App-button--decrement"
            onClick={decrement}
            aria-label="Уменьшить"
          >
            −
          </button>
          <button
            type="button"
            className="App-button App-button--reset"
            onClick={reset}
            aria-label="Сбросить"
          >
            Сброс
          </button>
          <button
            type="button"
            className="App-button App-button--increment"
            onClick={increment}
            aria-label="Увеличить"
          >
            +
          </button>
        </div>
        <p className="App-hint">
          Нажимайте кнопки, чтобы изменять значение счётчика.
        </p>
      </header>
    </div>
  );
}

export default App;
