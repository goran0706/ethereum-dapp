import { render } from '@testing-library/react'

import TargetPriceInputPanel from './target-price-input-panel'

describe('TargetPriceInputPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TargetPriceInputPanel />)
    expect(baseElement).toBeTruthy()
  })
})
