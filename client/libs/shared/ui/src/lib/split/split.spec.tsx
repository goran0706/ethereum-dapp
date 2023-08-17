import { render } from '@testing-library/react';

import Split from './split';

describe('Split', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Split />);
    expect(baseElement).toBeTruthy();
  });
});
