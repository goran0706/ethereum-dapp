import { render } from '@testing-library/react';

import ColorModeSwitch from './color-mode-switch';

describe('ColorModeSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorModeSwitch />);
    expect(baseElement).toBeTruthy();
  });
});
