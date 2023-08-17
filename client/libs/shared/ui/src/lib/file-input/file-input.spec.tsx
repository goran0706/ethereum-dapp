import { render } from '@testing-library/react';

import FileInput from './file-input';

describe('FileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileInput />);
    expect(baseElement).toBeTruthy();
  });
});
