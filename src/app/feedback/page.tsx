'use client'

import Link from 'next/link'

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ge synpunkter</h1>
        <p className="text-gray-700 mb-6">Dela gärna dina idéer, förbättringsförslag och buggrapporter. Vi läser allt och återkopplar vid behov.</p>
        <div className="space-y-4">
          <Link href="mailto:feedback@age-hack.se" className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Skicka e‑post</Link>
          <Link href="/" className="inline-block px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200">Till startsidan</Link>
        </div>
      </div>
    </div>
  )
}