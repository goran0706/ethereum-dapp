import { Account } from '@libs/account'
import { Dashboard } from '@libs/dashboard'
import { LimitOrders } from '@libs/limit'
import { LockForm, Locking, UnlockForm } from '@libs/locking'
import { PageNotFound } from '@libs/page-not-found'
import {
  AddAndStakeForm,
  RemoveAndUnstake,
  StakeForm,
  Staking,
  UnstakeForm
} from '@libs/staking'
import { Swap } from '@libs/swap'
import { AppLayout, ProtectedRoute } from '@shared/ui'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDarkMode } from 'usehooks-ts'
import { WagmiConfig, createConfig } from 'wagmi'
import {
  arbitrum,
  localhost,
  mainnet,
  optimism,
  polygon,
  sepolia
} from 'wagmi/chains'

const alchemyId = import.meta.env.VITE_ALCHEMY_ID
const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const chains = [mainnet, polygon, optimism, arbitrum, sepolia, localhost]

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId,
    walletConnectProjectId,
    chains,
    // Required
    appName: 'Ethereum DApp',
    // Optional
    appDescription: 'Web3 Ethereum DApp',
    appUrl: 'https://family.co', // your app's url TODO:
    appIcon: 'https://family.co/logo.png' // your app's icon, no bigger than 1024x1024px (max. 1MB) TODO:
  })
)

const connectKitTheme = {
  '--ck-body-background': 'var(--color-black-0)',
  '--ck-border-radius': 'var(--border-radius-lg)',
  '--ck-overlay-background': 'transparent',
  '--ck-overlay-backdrop-filter': 'blur(2px)',
  '--ck-modal-box-shadow': 'var(--shadow-md)',
  '--ck-primary-button-background': 'var(--color-black-50)',
  '--ck-primary-button-hover-background': 'var(--color-black-100)',
  '--ck-secondary-button-background': 'var(--color-black-50)',
  '--ck-secondary-button-hover-color': 'var(--color-black-100)'
}

const App = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme='auto'
        mode={isDarkMode ? 'dark' : 'light'}
        customTheme={connectKitTheme}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='locking' element={<Locking />}>
                <Route
                  index
                  element={<Navigate to='/locking/lock' replace />}
                />
                <Route path='lock' element={<LockForm />} />
                <Route path='unlock' element={<UnlockForm />} />
              </Route>
              <Route path='staking' element={<Staking />}>
                <Route
                  index
                  element={<Navigate to='/staking/stake' replace />}
                />
                <Route path='stake' element={<StakeForm />} />
                <Route path='unstake' element={<UnstakeForm />} />
                <Route path='add-stake' element={<AddAndStakeForm />} />
                <Route path='remove-unstake' element={<RemoveAndUnstake />} />
              </Route>
              <Route path='swap' element={<Swap />} />
              <Route path='limit-orders' element={<LimitOrders />} />
              <Route
                path='account'
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
