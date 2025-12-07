"use client"

import React, { useEffect, useState } from 'react'
import { runRevisionsTest } from '@/lib/revisionsTest'
import { seedPersonalDevelopmentInvitation } from '@/data/personalDevelopment'

export default function RevisionsTestPage() {
  const [testRunning, setTestRunning] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  useEffect(() => {
    // Auto-seeda personlig utveckling vid sidladdning
    try {
      const seeded = seedPersonalDevelopmentInvitation()
      console.log(`📦 Personlig utveckling seedad: ${seeded.addedDocuments} dokument, ${seeded.addedCourses} kurser`)
    } catch (e) {
      console.error('Fel vid seeding av personlig utveckling:', e)
    }

    // Fånga konsolmeddelanden
    const originalLog = console.log
    const originalError = console.error

    console.log = (...args) => {
      setConsoleOutput(prev => [...prev, args.join(' ')])
      originalLog.apply(console, args)
    }

    console.error = (...args) => {
      setConsoleOutput(prev => [...prev, `ERROR: ${args.join(' ')}`])
      originalError.apply(console, args)
    }

    return () => {
      console.log = originalLog
      console.error = originalError
    }
  }, [])

  const runTest = async () => {
    setTestRunning(true)
    setConsoleOutput([])
    setTestResults(null)

    try {
      console.log('🚀 Startar komplett systemtest...')
      
      // Kör testet
      await runRevisionsTest()
      
      console.log('✅ Systemtest slutfört!')
      setTestResults({ completed: true, timestamp: new Date().toISOString() })
      
    } catch (error) {
      console.error('❌ Test misslyckades:', error)
      setTestResults({ completed: false, error: error instanceof Error ? error.message : String(error), timestamp: new Date().toISOString() })
    } finally {
      setTestRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🧪 Revisionshanteringssystem - Systemtest
            </h1>
            <p className="text-gray-600">
              Detta test verifierar att alla komponenter i revisionshanteringssystemet fungerar korrekt.
            </p>
          </div>

          <div className="mb-8 text-center">
            <button
              onClick={runTest}
              disabled={testRunning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
            >
              {testRunning ? '🔄 Test pågår...' : '🚀 Starta systemtest'}
            </button>
          </div>

          {testRunning && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-blue-800 font-medium">
                  Test pågår... Detta kan ta upp till 30 sekunder.
                </p>
              </div>
            </div>
          )}

          {testResults && (
            <div className={`mb-8 p-6 rounded-lg border ${
              testResults.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <h2 className={`text-xl font-bold mb-2 ${
                testResults.completed ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResults.completed ? '✅ Test slutfört!' : '❌ Test misslyckades'}
              </h2>
              <p className="text-gray-600 mb-2">
                Tidpunkt: {new Date(testResults.timestamp).toLocaleString()}
              </p>
              {testResults.error && (
                <p className="text-red-600 font-medium">
                  Fel: {testResults.error}
                </p>
              )}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Konsollogg</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {consoleOutput.length === 0 ? (
                <p className="text-gray-400">Inga meddelanden ännu...</p>
              ) : (
                consoleOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line.startsWith('ERROR:') ? (
                      <span className="text-red-400">{line}</span>
                    ) : line.includes('✅') ? (
                      <span className="text-green-400">{line}</span>
                    ) : line.includes('❌') ? (
                      <span className="text-red-400">{line}</span>
                    ) : line.includes('🚀') || line.includes('🔄') ? (
                      <span className="text-blue-400">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">🛠️ Testade komponenter</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Backup Service - Skapar och hanterar backuper
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Restore Manager - Återställer från backuper
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Revision Manager - Spårar filändringar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Trae Integration - Workspace-hantering
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Content Protection - Skyddar viktigt innehåll
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">⚡ Förväntade resultat</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Alla komponenter initieras korrekt
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Backup och restore fungerar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Filversioner spåras automatiskt
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Trae integration fungerar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Innehållsskydd aktiverat
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Användning efter test</h4>
            <p className="text-sm text-yellow-700">
              När testet är klart kan du använda revisionshanteringssystemet genom:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Dashboard-komponenten för att se systemstatus</li>
              <li>• Automatiska backuper sparas regelbundet</li>
              <li>• Återställning kan göras från valfri tidpunkt</li>
              <li>• Systemet startar automatiskt där du slutade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}