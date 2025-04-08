import { screen, fireEvent } from '@testing-library/react';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  const button = screen.getByRole('button', { name: '  Increment' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('1');
  fireEvent.click(button);
  expect(currentCount).toHaveTextContent('2');
});

test('it should get current initial count from props', () => {
  render(<Counter initialCount={0} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});
