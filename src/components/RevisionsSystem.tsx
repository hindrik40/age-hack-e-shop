// REVISIONS-SYSTEM HUVUDKOMPONENT
// Initierar och hanterar alla revisionshanteringskomponenter

'use client'

import { useEffect, useState } from 'react'
import { traeIntegration, useTraeIntegration } from '@/lib/traeIntegration'
import { contentProtection, useContentProtection } from '@/lib/contentProtection'
import { RevisionsDashboard, RevisionsMiniDashboard } from '@/components/RevisionsDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Shield, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Save,
  RotateCcw,
  Eye,
  Zap
} from 'lucide-react'

interface RevisionsSystemProps {
  children: React.ReactNode
  showDashboard?: boolean
  showMiniStatus?: boolean
  autoInitialize?: boolean
  enableProtection?: boolean
}

export function RevisionsSystem({ 
  children, 
  showDashboard = true, 
  showMiniStatus = true,
  autoInitialize = true,
  enableProtection = true
}: RevisionsSystemProps) {
  const { 
    traeIntegration, 
    isInitialized, 
    systemStatus, 
    forceAutoSave, 
    forceBackup 
  } = useTraeIntegration()
  
  const { 
    contentProtection, 
    isEnabled: protectionEnabled, 
    statistics 
  } = useContentProtection()
  
  const [showFullDashboard, setShowFullDashboard] = useState(false)
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null)
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'error'>('healthy')
  const [initializationError, setInitializationError] = useState<string | null>(null)

  // Initiera systemet vid uppstart
  useEffect(() => {
    if (autoInitialize && !isInitialized) {
      const initializeSystem = async () => {
        try {
          console.log('🔄 Initialiserar Revisionshanteringssystem...')
          
          // Vänta på att Trae-integrationen ska initieras
          // useTraeIntegration-hooken hanterar detta automatiskt
          
          // Aktivera innehållsskydd om konfigurerat
          if (enableProtection) {
            contentProtection.setEnabled(true)
            console.log('✅ Innehållsskydd aktiverat')
          }
          
          console.log('✅ Revisionshanteringssystem initierat framgångsrikt!')
          
        } catch (error: unknown) {
          console.error('❌ Fel vid initiering av Revisionshanteringssystem:', error)
          const message = error instanceof Error ? error.message : String(error)
          setInitializationError(message)
          setSystemHealth('error')
        }
      }
      
      initializeSystem()
    }
  }, [autoInitialize, enableProtection])

  useEffect(() => {
    if (isInitialized) {
      traeIntegration.updateConfig({ warnBeforeExit: false })
    }
  }, [isInitialized])

  // Uppdatera systemhälsa baserat på status
  useEffect(() => {
    if (initializationError) {
      setSystemHealth('error')
    } else if (!isInitialized) {
      setSystemHealth('warning')
    } else if (statistics.totalWarnings > 0) {
      setSystemHealth('warning')
    } else {
      setSystemHealth('healthy')
    }
  }, [isInitialized, systemStatus, statistics, initializationError])

  // Uppdatera senaste auto-save tid
  useEffect(() => {
    const updateLastAutoSave = () => {
      const now = new Date()
      setLastAutoSave(now)
    }

    // Uppdatera varje gång auto-save körs
    const interval = setInterval(updateLastAutoSave, 5 * 60 * 1000) // Var 5:e minut
    updateLastAutoSave() // Initial uppdatering

    return () => clearInterval(interval)
  }, [])

  // Hantera manuell åtgärd
  const handleManualBackup = async () => {
    try {
      await forceBackup()
      alert('Manuell backup skapad framgångsrikt!')
    } catch (error: unknown) {
      alert(`Fel vid skapning av backup: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleManualSave = async () => {
    try {
      await forceAutoSave()
      setLastAutoSave(new Date())
      alert('Manuell sparning slutförd!')
    } catch (error: unknown) {
      alert(`Fel vid manuell sparning: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Hämta statusfärg och ikon
  const getStatusInfo = () => {
    switch (systemHealth) {
      case 'healthy':
        return {
          color: 'text-green-600 bg-green-50 border-green-200',
          icon: CheckCircle,
          text: 'Systemet är friskt och ditt arbete är skyddat'
        }
      case 'warning':
        return {
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          icon: AlertTriangle,
          text: 'Systemvarning - kontrollera dashboarden'
        }
      case 'error':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: AlertTriangle,
          text: 'Systemfel - kontrollera konfigurationen'
        }
      default:
        return {
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          icon: Activity,
          text: 'Systemstatus okänd'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  if (initializationError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Alert className="border-red-200 bg-red-50 max-w-4xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle>Initieringsfel</AlertTitle>
          <AlertDescription>
            Det uppstod ett fel vid initiering av revisionshanteringssystemet: {initializationError}
            <br />
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-3 bg-red-600 hover:bg-red-700"
            >
              Försök igen
            </Button>
          </AlertDescription>
        </Alert>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Systemstatus-banner */}
      <div className={`border-b ${statusInfo.color}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon className="h-5 w-5" />
              <div>
                <p className="font-medium text-sm">{statusInfo.text}</p>
                {lastAutoSave && (
                  <p className="text-xs opacity-75">
                    Senaste auto-save: {lastAutoSave.toLocaleTimeString('sv-SE')}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Snabbåtgärder */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleManualSave}
                className="text-xs"
                disabled={!isInitialized}
              >
                <Save className="h-3 w-3 mr-1" />
                Spara nu
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleManualBackup}
                className="text-xs"
                disabled={!isInitialized}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Backup
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFullDashboard(!showFullDashboard)}
                className="text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                {showFullDashboard ? 'Dölj' : 'Visa'} Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Huvudinnehåll */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidopanel med mini-dashboard */}
          {showMiniStatus && (
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <RevisionsMiniDashboard />
                
                {/* Snabbstatistik */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-blue-900">
                      <Activity className="h-4 w-4" />
                      Systemstatistik
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Backuper:</span>
                      <Badge variant="outline" className="text-xs">
                        {statistics.totalRules} regler
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Varningar:</span>
                      <Badge 
                        variant={statistics.totalWarnings === 0 ? "outline" : "destructive"}
                        className="text-xs"
                      >
                        {statistics.totalWarnings} st
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Session:</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(systemStatus.sessionDuration / 60)} min
                      </Badge>
                    </div>
                    
                    {systemStatus.lastActiveTime && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Senast aktiv:</span>
                        <span className="text-gray-800">
                          {new Date(systemStatus.lastActiveTime).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Huvudinnehållsarea */}
          <div className={showMiniStatus ? "lg:col-span-3" : "lg:col-span-4"}>
            {/* Full dashboard om vald */}
            {showFullDashboard && showDashboard && (
              <div className="mb-6">
                <RevisionsDashboard 
                  compact={false}
                  showAutoSave={true}
                  showProtectedContent={true}
                />
              </div>
            )}
            
            {/* Barnkomponenter (huvudapplikationen) */}
            <div className={showFullDashboard ? "" : "bg-white rounded-lg border border-gray-200"}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Initieringsoverlay */}
      {!isInitialized && !initializationError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                Initialiserar system...
              </CardTitle>
              <CardDescription>
                Revisionshanteringssystemet startar upp och säkerställer att ditt arbete är skyddat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Startar Trae-integration...</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Aktiverar innehållsskydd...</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Kontrollerar backup-status...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Hjälpkomponent för att visa systemstatus i header/navbar
export function RevisionsSystemStatus({ compact = false }: { compact?: boolean }) {
  const { systemStatus } = useTraeIntegration()
  const { statistics } = useContentProtection()

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${
          systemStatus.initialized ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className="text-gray-600">
          {systemStatus.initialized ? 'Skyddat' : 'Startar...'}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${
          systemStatus.initialized ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
        }`}></div>
        <span className="text-gray-600">
          {systemStatus.autoSaveActive ? (
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-green-500" />
              Auto-save aktiv
            </span>
          ) : (
            'Startar...'
          )}
        </span>
      </div>
      
      {statistics.totalWarnings > 0 && (
        <div className="flex items-center gap-1 text-orange-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          {statistics.totalWarnings} varningar
        </div>
      )}
    </div>
  )
}

export default RevisionsSystem
