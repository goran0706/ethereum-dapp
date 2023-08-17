import { render } from '@testing-library/react';

import Checklist from './checklist';

describe('Checklist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Checklist />);
    expect(baseElement).toBeTruthy();
  });
});
