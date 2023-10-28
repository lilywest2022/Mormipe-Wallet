import type { AppProps } from 'next/app'
import * as React from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonMumbai, mainnet } from 'wagmi/chains'
import {
  GoogleSocialWalletConnector,
  FacebookSocialWalletConnector,
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodev/wagmi'

import { publicProvider } from 'wagmi/providers/public'
import NextHead from 'next/head'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
)

function App({ Component, pageProps }: AppProps) {
  const [config] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const options = {
        chains,
        options: {
          projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
          shimDisconnect: true,
        },
      }
      return createConfig({
        autoConnect: true,
        connectors: [
          new GoogleSocialWalletConnector(options),
          new FacebookSocialWalletConnector(options),
          new GithubSocialWalletConnector(options),
          new DiscordSocialWalletConnector(options),
          new TwitchSocialWalletConnector(options),
          new TwitterSocialWalletConnector(options),
        ],
        publicClient,
        webSocketPublicClient,
      })
    }
  })
  //这里的mounted起到了挂载的作用
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (typeof window === 'undefined') return null

  return (
    <div>
      <WagmiConfig config={config!}>
        <NextHead>
          <title>lilywest_wallet</title>
        </NextHead>
        {mounted && <Component {...pageProps} />}
      </WagmiConfig>
    </div>
  )
}
