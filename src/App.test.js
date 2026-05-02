import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('отображает заголовок счётчика', () => {
  render(<App />);
  expect(screen.getByText(/Счётчик кликов/i)).toBeInTheDocument();
});

test('начальное значение счётчика равно 0', () => {
  render(<App />);
  expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
});

test('кнопка "+" увеличивает счётчик', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Увеличить/i }));
  fireEvent.click(screen.getByRole('button', { name: /Увеличить/i }));
  expect(screen.getByTestId('counter-value')).toHaveTextContent('2');
});

test('кнопка "−" уменьшает счётчик', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Уменьшить/i }));
  expect(screen.getByTestId('counter-value')).toHaveTextContent('-1');
});

test('кнопка "Сброс" возвращает счётчик к 0', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Увеличить/i }));
  fireEvent.click(screen.getByRole('button', { name: /Увеличить/i }));
  fireEvent.click(screen.getByRole('button', { name: /Сбросить/i }));
  expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
});
