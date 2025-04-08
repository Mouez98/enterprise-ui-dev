import {
  render as renderComponent,
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  const result = renderComponent(ui, options);
  const user = userEvent.setup();
  return {
    ...result,
    user,
  };
};
