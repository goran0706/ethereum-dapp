import { render } from '@testing-library/react';

import Stat from './stat';

describe('Stat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stat />);
    expect(baseElement).toBeTruthy();
  });
});
