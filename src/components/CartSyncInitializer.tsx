'use client'

import { useEffect } from 'react'
import { initializeCartSync } from '@/lib/cartSync'

export function CartSyncInitializer() {
  useEffect(() => {
    initializeCartSync()
  }, [])

  return null
}