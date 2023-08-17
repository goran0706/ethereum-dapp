import { render } from '@testing-library/react';

import Circle from './circle';

describe('Circle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Circle />);
    expect(baseElement).toBeTruthy();
  });
});
