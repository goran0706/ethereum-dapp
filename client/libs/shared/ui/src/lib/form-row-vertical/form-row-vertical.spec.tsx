import { render } from '@testing-library/react';

import FormRowVertical from './form-row-vertical';

describe('FormRowVertical', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormRowVertical />);
    expect(baseElement).toBeTruthy();
  });
});
