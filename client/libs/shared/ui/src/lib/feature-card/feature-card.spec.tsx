import { render } from '@testing-library/react';

import FeatureCard from './feature-card';

describe('FeatureCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureCard />);
    expect(baseElement).toBeTruthy();
  });
});
