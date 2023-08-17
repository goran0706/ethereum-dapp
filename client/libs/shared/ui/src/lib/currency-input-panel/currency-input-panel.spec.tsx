import { render } from '@testing-library/react';

import CurrencyInputPanel from './currency-input-panel';

describe('CurrencyInputPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencyInputPanel />);
    expect(baseElement).toBeTruthy();
  });
});
