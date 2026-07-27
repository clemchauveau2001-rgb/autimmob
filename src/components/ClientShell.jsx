'use client'

import IntroScreen from './IntroScreen'

export default function ClientShell({ children }) {
  return (
    <>
      <IntroScreen />
      {children}
    </>
  )
}
