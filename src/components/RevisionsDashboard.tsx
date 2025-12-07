// REVISIONS-DASHBOARD - KOMPLETT KONTROLLPANEL
// Användargränssnitt för att hantera allt revisionshanteringssystem

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  Shield, 
  RotateCcw, 
  Save, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  History, 
  Settings, 
  FileText, 
  Database, 
  Activity,
  Zap,
  Eye,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react'
import { restoreManager, RestorePoint, useRestoreManager } from '@/lib/restoreManager'
import { backupService } from '@/lib/backupService'
import { revisionManager } from '@/lib/revisionManager'

interface RevisionsDashboardProps {
  compact?: boolean
  showAutoSave?: boolean
  showProtectedContent?: boolean
}

export function RevisionsDashboard({ 
  compact = false, 
  showAutoSave = true, 
  showProtectedContent = true 
}: RevisionsDashboardProps) {
  const { restorePoints, isLoading, error, loadRestorePoints } = useRestoreManager()
  const [activeTab, setActiveTab] = useState<'overview' | 'backups' | 'versions' | 'autosave' | 'warnings'>('overview')
  const [selectedRestorePoint, setSelectedRestorePoint] = useState<RestorePoint | null>(null)
  const [isRestoring, setIsRestoring] = useState(false)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [systemStatus, setSystemStatus] = useState({
    autoSaveActive: true,
    backupEnabled: true,
    warningsCount: 0,
    lastBackup: null as string | null
  })

  // Uppdatera systemstatus
  useEffect(() => {
    const updateStatus = async () => {
      const warnings = revisionManager.getCriticalWarnings()
      const lastBackup = backupService.getLastSuccessfulBackup()
      
      setSystemStatus({
        autoSaveActive: true, // Alltid aktiv i detta system
        backupEnabled: true,
        warningsCount: warnings.length,
        lastBackup: lastBackup?.timestamp || null
      })
    }

    updateStatus()
    const interval = setInterval(updateStatus, 30000) // Uppdatera var 30:e sekund
    
    return () => clearInterval(interval)
  }, [])

  // Hantera återställning
  const handleRestore = async (restorePoint: RestorePoint) => {
    if (!confirm(`Är du säker på att du vill återställa till "${restorePoint.title}"?\n\nDetta kommer att ersätta nuvarande innehåll.`)) {
      return
    }

    setIsRestoring(true)
    setRestoreProgress(0)
    setSelectedRestorePoint(restorePoint)

    try {
      // Förbered återställning
      const preparation = await restoreManager.prepareRestore(restorePoint.id, {
        createBackupBeforeRestore: true,
        dryRun: false
      })

      if (!preparation.success) {
        alert(`Kunde inte förbereda återställning: ${preparation.warnings?.join(', ')}`)
        setIsRestoring(false)
        return
      }

      // Simulera progress
      const progressInterval = setInterval(() => {
        setRestoreProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      // Utför återställning
      const result = await restoreManager.performRestore(restorePoint.id, {
        createBackupBeforeRestore: true,
        dryRun: false
      })

      clearInterval(progressInterval)
      setRestoreProgress(100)

      if (result.success) {
        alert(`Återställning slutförd!\n\n${result.message}\n\nÅterställda objekt: ${result.restoredItems?.join(', ') || 'Inga'}`)
        // Ladda om sidan för att visa återställda data
        setTimeout(() => window.location.reload(), 2000)
      } else {
        alert(`Återställning misslyckades:\n${result.errors?.join('\n')}`)
      }

    } catch (error) {
      console.error('Fel vid återställning:', error)
      alert(`Fel vid återställning: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRestoring(false)
      setRestoreProgress(0)
      setSelectedRestorePoint(null)
      loadRestorePoints() // Ladda om listan
    }
  }

  // Skapa manuell backup
  const createManualBackup = async () => {
    if (!confirm('Vill du skapa en manuell backup av allt innehåll?')) {
      return
    }

    try {
      const backup = await backupService.createFullBackup(
        'Manuell backup skapad av användare',
        'user-manual'
      )
      
      alert(`Backup skapad framgångsrikt!\n\nID: ${backup.id}\nTid: ${new Date(backup.timestamp).toLocaleString('sv-SE')}\nObjekt: ${backup.itemCount}`)
      loadRestorePoints() // Ladda om listan
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      alert(`Kunde inte skapa backup: ${message}`)
    }
  }

  // Hämta statusfärg
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  // Hämta varningsfärg
  const getWarningColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Kompakt vy */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Revisionsstatus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Auto-save:</span>
                <Badge variant={systemStatus.autoSaveActive ? "default" : "destructive"} className="text-xs">
                  {systemStatus.autoSaveActive ? 'Aktiv' : 'Inaktiv'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Säkerhetskopior:</span>
                <span>{restorePoints.filter(rp => rp.type === 'backup').length} st</span>
              </div>
              {systemStatus.warningsCount > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Varningar:</span>
                  <span>{systemStatus.warningsCount} st</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Systemöversikt */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="h-6 w-6" />
            Revisionshanteringssystem
          </CardTitle>
          <CardDescription className="text-blue-700">
            Komplett skydd och återställning av allt ditt arbete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${systemStatus.autoSaveActive ? 'bg-green-100' : 'bg-red-100'}`}>
                  {systemStatus.autoSaveActive ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> : 
                    <XCircle className="h-5 w-5 text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-medium text-sm">Auto-save</p>
                  <p className="text-xs text-gray-600">
                    {systemStatus.autoSaveActive ? 'Sparar var 5:e minut' : 'Inaktiv'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Backuper</p>
                  <p className="text-xs text-gray-600">
                    {restorePoints.filter(rp => rp.type === 'backup').length} tillgängliga
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${systemStatus.warningsCount === 0 ? 'bg-green-100' : 'bg-orange-100'}`}>
                  {systemStatus.warningsCount === 0 ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> : 
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  }
                </div>
                <div>
                  <p className="font-medium text-sm">Varningar</p>
                  <p className="text-xs text-gray-600">
                    {systemStatus.warningsCount === 0 ? 'Inga varningar' : `${systemStatus.warningsCount} varningar`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Senaste backup</p>
                  <p className="text-xs text-gray-600">
                    {systemStatus.lastBackup ? 
                      new Date(systemStatus.lastBackup).toLocaleDateString('sv-SE') : 
                      'Ingen backup ännu'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kontrollpanel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Kontrollpanel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={createManualBackup} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Skapa Backup
            </Button>
            <Button onClick={loadRestorePoints} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Uppdatera
            </Button>
          </div>

          {/* Flikar */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Översikt', icon: Activity },
                { id: 'backups', label: 'Backuper', icon: Database },
                { id: 'versions', label: 'Versioner', icon: History },
                { id: 'autosave', label: 'Auto-save', icon: Zap },
                { id: 'warnings', label: 'Varningar', icon: AlertTriangle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Innehåll baserat på aktiv flik */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Senaste återställningspunkter</h3>
              {restorePoints.slice(0, 5).map(point => (
                <div key={point.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      point.type === 'backup' ? 'bg-blue-100' :
                      point.type === 'autosave' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      {point.type === 'backup' ? <Database className="h-4 w-4 text-blue-600" /> :
                       point.type === 'autosave' ? <Zap className="h-4 w-4 text-green-600" /> :
                       <FileText className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{point.title}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(point.timestamp).toLocaleString('sv-SE')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {point.protected && <Shield className="h-4 w-4 text-blue-600" />}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestore(point)}
                      disabled={isRestoring}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Återställ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'backups' && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Tillgängliga backuper</h3>
              {restorePoints.filter(rp => rp.type === 'backup').map(backup => (
                <Card key={backup.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{backup.title}</h4>
                          <Badge className={getStatusColor(backup.metadata?.status || 'unknown')}>
                            {backup.metadata?.status || 'unknown'}
                          </Badge>
                          {backup.protected && (
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Skyddad
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{backup.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Tidpunkt:</span> {new Date(backup.timestamp).toLocaleString('sv-SE')}
                          </div>
                          <div>
                            <span className="font-medium">Storlek:</span> {Math.round(backup.size / 1024)} KB
                          </div>
                          <div>
                            <span className="font-medium">Typ:</span> {backup.metadata?.type || 'unknown'}
                          </div>
                          <div>
                            <span className="font-medium">Objekt:</span> {backup.metadata?.itemCount || 0} st
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRestore(backup)}
                        disabled={isRestoring || !backup.restoreable}
                        className="ml-4"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Återställ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'autosave' && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Auto-save punkter</h3>
              <p className="text-sm text-gray-600">
                Dessa punkter skapas automatiskt var 5:e minut för att skydda ditt arbete.
              </p>
              {restorePoints.filter(rp => rp.type === 'autosave').map(autosave => (
                <div key={autosave.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">{autosave.title}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(autosave.timestamp).toLocaleString('sv-SE')}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestore(autosave)}
                    disabled={isRestoring}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Återställ
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Systemvarningar</h3>
              {systemStatus.warningsCount === 0 ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Inga varningar</AlertTitle>
                  <AlertDescription>
                    Allt system är stabilt och ditt arbete är säkert.
                  </AlertDescription>
                </Alert>
              ) : (
                revisionManager.getAllWarnings().map(warning => (
                  <Alert key={warning.id} className={getWarningColor(warning.severity)}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Varning: {warning.filePath}</AlertTitle>
                    <AlertDescription>
                      {warning.message}
                      <br />
                      <span className="text-xs opacity-75">
                        {new Date(warning.timestamp).toLocaleString('sv-SE')}
                      </span>
                    </AlertDescription>
                  </Alert>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Återställningsprogress */}
      {isRestoring && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <RotateCcw className="h-5 w-5 animate-spin" />
              Återställning pågår...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Återställer: {selectedRestorePoint?.title}</span>
                  <span>{restoreProgress}%</span>
                </div>
                <Progress value={restoreProgress} className="w-full" />
              </div>
              <p className="text-sm text-yellow-700">
                Vänligen vänta medan systemet återställer ditt innehåll. Detta kan ta några minuter.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Felmeddelande */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle>Fel vid hämtning av data</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// Kompakt komponent för att visa i sidopaneler
export function RevisionsMiniDashboard() {
  const [status, setStatus] = useState({
    lastBackup: null as string | null,
    autoSaveActive: true,
    warningsCount: 0
  })

  useEffect(() => {
    const updateStatus = () => {
      const lastBackup = backupService.getLastSuccessfulBackup()
      const warnings = revisionManager.getCriticalWarnings()
      
      setStatus({
        lastBackup: lastBackup?.timestamp || null,
        autoSaveActive: true,
        warningsCount: warnings.length
      })
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Uppdatera varje minut
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-sm text-blue-900">Revisionsstatus</span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Auto-save:</span>
          <Badge variant={status.autoSaveActive ? "default" : "destructive"} className="text-xs">
            {status.autoSaveActive ? 'Aktiv' : 'Inaktiv'}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Senaste backup:</span>
          <span className="text-gray-800">
            {status.lastBackup ? 
              new Date(status.lastBackup).toLocaleDateString('sv-SE') : 
              'Aldrig'
            }
          </span>
        </div>
        
        {status.warningsCount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-orange-600">Varningar:</span>
            <Badge variant="destructive" className="text-xs">
              {status.warningsCount}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="pt-2 border-t border-blue-200">
        <Button size="sm" variant="outline" className="w-full text-xs">
          <Eye className="h-3 w-3 mr-1" />
          Visa Dashboard
        </Button>
      </div>
    </div>
  )
}

export default RevisionsDashboard