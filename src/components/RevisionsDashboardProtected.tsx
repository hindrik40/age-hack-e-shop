'use client'

import { useEffect, useState } from 'react'

export default function RevisionsDashboardProtected({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const expected = process.env.NEXT_PUBLIC_REVISIONS_PASSWORD || 'review'

  useEffect(() => {
    try {
      const ok = localStorage.getItem('rev_dash_auth') === '1'
      setAuthorized(ok)
    } catch {}
  }, [])

  const handleLogin = () => {
    if (password === expected) {
      try { localStorage.setItem('rev_dash_auth', '1') } catch {}
      setAuthorized(true)
      setError('')
    } else {
      setError('Fel lösenord')
    }
  }

  const handleLogout = () => {
    try { localStorage.removeItem('rev_dash_auth') } catch {}
    setAuthorized(false)
    setPassword('')
    setError('')
  }

  if (authorized) {
    return (
      <div>
        <div className="flex justify-end mb-4">
          <button onClick={handleLogout} className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Logga ut</button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Revisionshantering</h2>
      <p className="text-sm text-gray-600 mb-4">Ange lösenord för att fortsätta</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        className="w-full border rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
      />
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Logga in</button>
    </div>
  )
}