import { render } from '@testing-library/react';

import TextButton from './text-button';

describe('TextButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextButton />);
    expect(baseElement).toBeTruthy();
  });
});
