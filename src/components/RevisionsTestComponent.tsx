import React from 'react'
import { useRevisionsTest } from '@/lib/revisionsTest'

export default function RevisionsTestComponent() {
  const { runTest, isRunning, results, summary } = useRevisionsTest()

  const handleRunTest = async () => {
    console.log('🚀 Startar revisionshanteringssystem test...')
    await runTest()
    console.log('✅ Test slutfört!')
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🧪 Testa Revisionshanteringssystem
      </h2>
      
      <div className="mb-6">
        <button
          onClick={handleRunTest}
          disabled={isRunning}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {isRunning ? '🔄 Kör test...' : '🚀 Kör test'}
        </button>
      </div>

      {isRunning && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">🔄 Test pågår... Detta kan ta några sekunder.</p>
        </div>
      )}

      {summary && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">📋 Testresultat</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Totalt antal test:</span> {summary.total}
            </div>
            <div>
              <span className="font-medium">Godkända:</span> {summary.passed}
            </div>
            <div>
              <span className="font-medium">Underkända:</span> {summary.failed}
            </div>
            <div>
              <span className="font-medium">Framgångsgrad:</span> {summary.successRate.toFixed(1)}%
            </div>
          </div>
          <div className="mt-2">
            <span className="font-medium">Total tid:</span> {summary.totalDuration}ms
          </div>
          <div className="mt-2">
            <span className={`font-bold ${summary.allPassed ? 'text-green-600' : 'text-red-600'}`}>
              {summary.allPassed ? '✅ ALLA TEST GODKÄNDA' : '❌ NÅGRA TEST UNDERKÄNDA'}
            </span>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">🔍 Detaljerade resultat</h3>
          {results.map((result, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              result.passed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${
                    result.passed ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.passed ? '✅' : '❌'} {result.test}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    result.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.message}
                  </p>
                  {result.error && (
                    <p className="text-xs text-red-500 mt-1">Fel: {result.error}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">{result.duration}ms</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">💡 Tips för användning:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Klicka på &quot;Kör test&quot; för att verifiera att alla komponenter fungerar korrekt</li>
          <li>• Testet kontrollerar backup, restore, revision manager och Trae integration</li>
          <li>• Alla test bör visas som gröna (godkända) för optimal funktionalitet</li>
          <li>• Om något test misslyckas, kontrollera konsolen för detaljerade felmeddelanden</li>
        </ul>
      </div>
    </div>
  )
}
