'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Clock, Shield, Save, Settings, Eye, RotateCcw } from 'lucide-react'
import { VersionControlDashboard } from '@/components/VersionControlDashboard'

export default function AdminVersionsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'articles' | 'settings'>('overview')
  const [lastBackup, setLastBackup] = useState<Date>(new Date())
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle')

  const handleFullBackup = async () => {
    setBackupStatus('running')
    
    // Simulera backup-process
    setTimeout(() => {
      setBackupStatus('success')
      setLastBackup(new Date())
      setTimeout(() => setBackupStatus('idle'), 3000)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'running': return 'text-blue-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Versionshantering & Backup</h1>
        <p className="text-gray-600">
          Hantera alla versioner av kurser, artiklar och annat innehåll. Skydda mot oavsiktliga ändringar och återställ tidigare versioner.
        </p>
      </div>

      {/* Översikt och Snabbverktyg */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Shield className="h-5 w-5" />
                  Skyddat Innehåll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 mb-2">3 objekt</div>
                <p className="text-sm text-blue-700">Kurser och artiklar som är skyddade mot ändringar</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Kurser:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border">1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Artiklar:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Clock className="h-5 w-5" />
                  Versioner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 mb-2">6 versioner</div>
                <p className="text-sm text-green-700">Totalt antal sparade versioner</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Senaste:</span>
                    <span className="text-xs text-green-600">{lastBackup.toLocaleDateString('sv-SE')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktiv</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Save className="h-5 w-5" />
                  Backup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 mb-2">
                  {backupStatus === 'running' ? 'Pågår...' : backupStatus === 'success' ? 'Klar!' : 'Redo'}
                </div>
                <p className="text-sm text-purple-700">Senaste backup: {lastBackup.toLocaleString('sv-SE')}</p>
                <Button 
                  onClick={handleFullBackup} 
                  disabled={backupStatus === 'running'}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  {backupStatus === 'running' ? 'Skapar backup...' : 'Skapa Full Backup'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Snabbåtgärder */}
          <Card>
            <CardHeader>
              <CardTitle>Snabbåtgärder</CardTitle>
              <CardDescription>Vanliga åtgärder för versionshantering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start" onClick={() => setActiveTab('courses')}>
                  <Eye className="h-4 w-4 mr-2" />
                  Visa Kurser
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveTab('articles')}>
                  <Eye className="h-4 w-4 mr-2" />
                  Visa Artiklar
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveTab('settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Inställningar
                </Button>
                <Button variant="outline" className="justify-start">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Återställ Allt
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Komplett Versionskontroll Dashboard */}
          <VersionControlDashboard />
        </div>
      )}

      {/* Kurser Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kurser - Versionshantering</CardTitle>
              <CardDescription>Hantera versioner för alla kurser</CardDescription>
            </CardHeader>
            <CardContent>
              <VersionControlDashboard contentType="course" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Artiklar Tab */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Artiklar - Versionshantering</CardTitle>
              <CardDescription>Hantera versioner för alla artiklar</CardDescription>
            </CardHeader>
            <CardContent>
              <VersionControlDashboard contentType="article" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Inställningar Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Versionshantering Inställningar</CardTitle>
              <CardDescription>Konfigurera hur versionshantering fungerar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Automatisk Backup</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Auto-backup vid ändringar</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktiv</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Max antal versioner per objekt</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Versionshistorik (dagar)</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">365</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Skyddat Innehåll</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Kräv godkännande för ändringar</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Aktiv</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Notifikationer vid ändringar</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktiv</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Automatisk rensning</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">Efter 365 dagar</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-3">Avancerade Inställningar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Save className="h-4 w-4 mr-2" />
                      Exportera Alla Versioner
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Importera Versioner
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Rensa Gamla Versioner
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Återställ Inställningar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white rounded-lg shadow-lg border p-2 flex gap-2">
          <Button
            size="sm"
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
          >
            Översikt
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'courses' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('courses')}
          >
            Kurser
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'articles' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('articles')}
          >
            Artiklar
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
          >
            Inställningar
          </Button>
        </div>
      </div>
    </div>
  )
}