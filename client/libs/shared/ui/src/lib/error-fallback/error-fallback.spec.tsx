import { render } from '@testing-library/react';

import ErrorFallback from './error-fallback';

describe('ErrorFallback', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorFallback />);
    expect(baseElement).toBeTruthy();
  });
});
