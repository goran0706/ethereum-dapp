import { render } from '@testing-library/react';

import FormRow from './form-row';

describe('FormRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormRow />);
    expect(baseElement).toBeTruthy();
  });
});
