'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AntiAgingSpaceWrapper() {
  const router = useRouter()
  const url = 'https://nhgasocm.manus.space'
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
            >
              Tillbaka
            </button>
            <button
              onClick={() => { if (typeof window !== 'undefined') window.location.href = '/' }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Till startsidan
            </button>
            <span className="text-gray-600 hidden sm:inline">Anti-Aging Space</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/wellness"
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Kropp & själ i harmoni
            </Link>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Öppna i ny flik →
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="mb-4 text-sm text-gray-600">
            Om förhandsvisningen inte visas kan sidan vara blockerad för inbäddning. Använd knappen ovan.
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src={url}
              title="Anti-Aging Space"
              className="w-full h-[80vh]"
              sandbox="allow-scripts allow-forms allow-popups"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
