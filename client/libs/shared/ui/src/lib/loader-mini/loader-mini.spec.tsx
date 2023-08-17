import { render } from '@testing-library/react';

import LoaderMini from './loader-mini';

describe('LoaderMini', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoaderMini />);
    expect(baseElement).toBeTruthy();
  });
});
