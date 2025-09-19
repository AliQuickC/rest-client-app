import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from './route';
import { Provider } from 'react-redux';
import store from '../../redux/store';

test('Show modal Uncontrolled components Form', async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  expect(screen.getByTestId('home')).toBeInTheDocument();
});
