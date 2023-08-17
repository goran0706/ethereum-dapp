import { ErrorFallback } from '@shared/ui'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'

import App from './app/app'
import GlobalStyles from './global'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <GlobalStyles />
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
