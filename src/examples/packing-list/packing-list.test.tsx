import { fireEvent, render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByLabelText('New Item Name');

  expect(input).toHaveValue('');
  expect(addButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText('New Item Name');
  await user.type(input, 'test');
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  expect(addButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const addButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(input, 'test');
  await user.click(addButton);

  const newItem = screen.getByLabelText('test');
  expect(newItem).not.toBeChecked();
});

it('verifies that the input field is empty after adding a new item', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText('New Item Name');
  await user.type(input, 'test');
  const addButton = screen.getByRole('button', { name: 'Add New Item' });
  await user.click(addButton);
  expect(input).toHaveValue('');
});

it('can clear the input value', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText('New Item Name');
  await user.type(input, 'test');
  await user.clear(input);
  expect(input).toHaveValue('');
});
