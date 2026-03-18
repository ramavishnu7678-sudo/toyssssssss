'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''

  return (
    <div>
      <h2>Products Page</h2>
      <p>Search Query: {q}</p>
      {/* TODO: Render products based on search query */}
    </div>
  )
}