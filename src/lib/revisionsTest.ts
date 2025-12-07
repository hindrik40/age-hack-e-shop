// TEST FÖR REVISIONSHANTERINGSSYSTEM
// Verifierar att alla komponenter fungerar korrekt

import { backupService } from '@/lib/backupService'
import { restoreManager } from '@/lib/restoreManager'
import { revisionManager } from '@/lib/revisionManager'
import { traeIntegration } from '@/lib/traeIntegration'
import { contentProtection } from '@/lib/contentProtection'

interface TestResult {
  test: string
  passed: boolean
  message: string
  error?: string
  duration: number
}

export class RevisionsSystemTest {
  private results: TestResult[] = []
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  // Kör alla tester
  async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Startar tester för Revisionshanteringssystem...')
    
    this.results = []
    
    // Kör individuella test
    await this.testBackupService()
    await this.testRestoreManager()
    await this.testRevisionManager()
    await this.testTraeIntegration()
    await this.testContentProtection()
    await this.testIntegration()
    
    const totalDuration = Date.now() - this.startTime
    const passedTests = this.results.filter(r => r.passed).length
    const failedTests = this.results.filter(r => !r.passed).length
    
    console.log(`\n📊 Testresultat:`)
    console.log(`   ✅ Godkända: ${passedTests}`)
    console.log(`   ❌ Underkända: ${failedTests}`)
    console.log(`   ⏱️  Total tid: ${totalDuration}ms`)
    
    return this.results
  }

  // Testa backup service
  private async testBackupService(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar Backup Service...')
      
      // Testa skapning av backup
      const backup = await backupService.createFullBackup(
        'Test backup',
        'test'
      )
      
      if (!backup.id || !backup.timestamp) {
        throw new Error('Backup saknar ID eller tidsstämpel')
      }
      
      // Testa hämtning av backuper
      const backups = backupService.getAllBackups()
      const foundBackup = backups.find(b => b.id === backup.id)
      
      if (!foundBackup) {
        throw new Error('Kunde inte hitta skapad backup')
      }
      
      // Testa backup-metadata
      const metadata = backupService.getBackupMetadata(backup.id)
      if (!metadata) {
        throw new Error('Kunde inte hämta backup-metadata')
      }
      
      this.addResult('Backup Service', true, 'Alla backup-funktioner fungerar korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('Backup Service', false, 'Backup Service test misslyckades', testStart, message)
    }
  }

  // Testa restore manager
  private async testRestoreManager(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar Restore Manager...')
      
      // Testa hämtning av restore points
      const restorePoints = await restoreManager.getAvailableRestorePoints()
      
      if (!Array.isArray(restorePoints)) {
        throw new Error('Restore points är inte en array')
      }
      
      // Testa skapande av restore point
      const testPoint = await restoreManager.createRestorePoint(
        'Test restore point',
        'Test restore point för systemtest'
      )
      
      if (!testPoint.id || !testPoint.timestamp) {
        throw new Error('Restore point saknar ID eller tidsstämpel')
      }
      
      // Testa förberedelse av restore
      const preparation = await restoreManager.prepareRestore(testPoint.id, {
        createBackupBeforeRestore: false,
        dryRun: true
      })
      
      if (!preparation.success) {
        throw new Error('Förberedelse av restore misslyckades')
      }
      
      this.addResult('Restore Manager', true, 'Alla restore-funktioner fungerar korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('Restore Manager', false, 'Restore Manager test misslyckades', testStart, message)
    }
  }

  // Testa revision manager
  private async testRevisionManager(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar Revision Manager...')
      
      // Testa initialisering
      await revisionManager.initialize()
      
      // Testa filbevakning
      const testFile = 'test-file.txt'
      const key = `file_${testFile}`
      localStorage.setItem(key, 'Innehåll A')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: 'Innehåll A' }))
      }
      localStorage.setItem(key, 'Innehåll B')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: 'Innehåll B' }))
      }
      await new Promise(r => setTimeout(r, 50))
      
      // Testa versionshantering
      const versions = revisionManager.getFileHistory(testFile)
      if (!Array.isArray(versions)) {
        throw new Error('Filversioner är inte en array')
      }
      if (versions.length < 2) {
        throw new Error('Filversioner skapades inte korrekt')
      }
      
      const protectedFile = 'package.json'
      const protectedKey = `file_${protectedFile}`
      localStorage.setItem(protectedKey, 'x')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new StorageEvent('storage', { key: protectedKey, newValue: 'x' }))
      }
      await new Promise(r => setTimeout(r, 50))
      
      // Testa varningar
      const warnings = revisionManager.getAllWarnings()
      if (!Array.isArray(warnings)) {
        throw new Error('Varningar är inte en array')
      }
      const hasProtectedWarning = warnings.some(w => w.filePath.includes(protectedFile))
      if (!hasProtectedWarning) {
        throw new Error('Skyddad fil varning saknas')
      }
      
      this.addResult('Revision Manager', true, 'Alla revisionsfunktioner fungerar korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('Revision Manager', false, 'Revision Manager test misslyckades', testStart, message)
    }
  }

  // Testa Trae integration
  private async testTraeIntegration(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar Trae Integration...')
      
      // Testa konfiguration
      const config = {
        autoRestoreOnStartup: true,
        createBackupOnExit: false, // Inaktivera för test
        warnBeforeExit: false, // Inaktivera för test
        saveWorkspaceState: true,
        restoreLastPosition: true,
        enableAutoSave: true,
        enableRevisionTracking: true
      }
      
      traeIntegration.updateConfig(config)
      
      // Testa workspace state
      const state = traeIntegration.getWorkspaceState()
      
      if (!state || typeof state !== 'object') {
        throw new Error('Workspace state är ogiltig')
      }
      
      // Testa systemhälsa
      const health = traeIntegration.isSystemHealthy()
      
      if (typeof health !== 'boolean') {
        throw new Error('Systemhälsa är inte en boolean')
      }
      
      // Testa systemstatus
      const status = traeIntegration.getSystemStatus()
      
      if (!status || typeof status !== 'object') {
        throw new Error('Systemstatus är ogiltig')
      }
      
      this.addResult('Trae Integration', true, 'Alla Trae-integrationsfunktioner fungerar korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('Trae Integration', false, 'Trae Integration test misslyckades', testStart, message)
    }
  }

  // Testa content protection
  private async testContentProtection(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar Content Protection...')
      
      // Testa innehållsskydd
      const protection = await contentProtection.checkContentProtection(
        'course',
        'test-course-123',
        'Viktig testkurs',
        'delete'
      )
      
      if (!protection || typeof protection.allowed !== 'boolean') {
        throw new Error('Innehållsskydd returnerade ogiltigt resultat')
      }
      
      // Testa skyddsregler
      const rules = contentProtection.getProtectionRules()
      
      if (!Array.isArray(rules)) {
        throw new Error('Skyddsregler är inte en array')
      }
      
      // Testa statistik
      const stats = contentProtection.getStatistics()
      
      if (!stats || typeof stats !== 'object') {
        throw new Error('Statistik är ogiltig')
      }
      
      this.addResult('Content Protection', true, 'Alla innehållsskyddsfunktioner fungerar korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('Content Protection', false, 'Content Protection test misslyckades', testStart, message)
    }
  }

  // Testa integration mellan komponenter
  private async testIntegration(): Promise<void> {
    const testStart = Date.now()
    
    try {
      console.log('🔄 Testar systemintegration...')
      
      // Testa att alla komponenter kan kommunicera
      const backup = await backupService.createFullBackup(
        'Integration test backup',
        'integration-test'
      )
      
      // Testa att restore manager kan se backupen
      const restorePoints = await restoreManager.getAvailableRestorePoints()
      const foundBackup = restorePoints.find(rp => rp.id === backup.id)
      
      if (!foundBackup) {
        throw new Error('Restore manager kan inte se backup från backup service')
      }
      
      // Testa att revision manager spårar ändringar
      await revisionManager.createVersionPoint('Integration test version')
      
      // Testa att Trae integration kan se alla komponenter
      const traeStatus = traeIntegration.getSystemStatus()
      
      if (!traeStatus.initialized) {
        throw new Error('Trae integration är inte korrekt initierad')
      }
      
      this.addResult('System Integration', true, 'Alla komponenter integreras korrekt', testStart)
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.addResult('System Integration', false, 'Systemintegration test misslyckades', testStart, message)
    }
  }

  // Hjälpmetod för att lägga till testresultat
  private addResult(test: string, passed: boolean, message: string, testStart: number, error?: string): void {
    const duration = Date.now() - testStart
    
    this.results.push({
      test,
      passed,
      message,
      error,
      duration
    })
    
    const status = passed ? '✅' : '❌'
    console.log(`${status} ${test}: ${message} (${duration}ms)`)
    
    if (error) {
      console.log(`   Fel: ${error}`)
    }
  }

  // Hämta testresultat
  getResults(): TestResult[] {
    return [...this.results]
  }

  // Hämta sammanfattning
  getSummary() {
    const total = this.results.length
    const passed = this.results.filter(r => r.passed).length
    const failed = this.results.filter(r => !r.passed).length
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0)
    
    return {
      total,
      passed,
      failed,
      successRate: total > 0 ? (passed / total) * 100 : 0,
      totalDuration,
      allPassed: failed === 0,
      timestamp: new Date().toISOString()
    }
  }
}

// Skapa global test-instans
export const revisionsTest = new RevisionsSystemTest()

// Funktion för att köra test från konsolen
export async function runRevisionsTest(): Promise<void> {
  console.log('🚀 Startar Revisionshanteringssystem test...')
  
  try {
    const results = await revisionsTest.runAllTests()
    const summary = revisionsTest.getSummary()
    
    console.log('\n' + '='.repeat(50))
    console.log('📋 SLUTLIG SAMMANFATTNING')
    console.log('='.repeat(50))
    console.log(`Totalt antal test: ${summary.total}`)
    console.log(`Godkända: ${summary.passed} (${summary.successRate.toFixed(1)}%)`)
    console.log(`Underkända: ${summary.failed}`)
    console.log(`Total tid: ${summary.totalDuration}ms`)
    console.log(`Status: ${summary.allPassed ? '✅ ALLA TEST GODKÄNDA' : '❌ NÅGRA TEST UNDERKÄNDA'}`)
    console.log('='.repeat(50))
    
    if (!summary.allPassed) {
      console.log('\n📝 Underkända test:')
      results.filter(r => !r.passed).forEach(r => {
        console.log(`  ❌ ${r.test}: ${r.message}`)
        if (r.error) {
          console.log(`     Fel: ${r.error}`)
        }
      })
    }
    
  } catch (error) {
    console.error('❌ Testkörning misslyckades:', error)
  }
}

// React Hook för att använda test i komponenter
import { useState } from 'react'

export function useRevisionsTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [summary, setSummary] = useState<any>(null)

  const runTest = async () => {
    setIsRunning(true)
    setResults([])
    setSummary(null)
    
    try {
      const testResults = await revisionsTest.runAllTests()
      const testSummary = revisionsTest.getSummary()
      
      setResults(testResults)
      setSummary(testSummary)
      
    } catch (error) {
      console.error('Test misslyckades:', error)
    } finally {
      setIsRunning(false)
    }
  }

  return {
    runTest,
    isRunning,
    results,
    summary,
    revisionsTest
  }
}

// Auto-kör test vid import (endast i utvecklingsmiljö)
if (process.env.NODE_ENV === 'development') {
  console.log('🧪 Revisionshanteringssystem testmodul laddad')
  
  // Gör testfunktionen tillgänglig globalt för enkel åtkomst
  if (typeof window !== 'undefined') {
    (window as any).runRevisionsTest = runRevisionsTest
    console.log('💡 Skriv "runRevisionsTest()" i konsolen för att köra test')
  }
}

export default revisionsTest