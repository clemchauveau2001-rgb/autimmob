'use client'

import IntroScreen from './IntroScreen'
import ComingSoon from './ComingSoon'

export default function ClientShell({ children }) {
  return (
    <>
      <ComingSoon />
      <IntroScreen />
      {children}
    </>
  )
}
