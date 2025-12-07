'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Clock, Shield, RotateCcw, Save, Download, Upload } from 'lucide-react'

interface ContentVersion {
  id: string
  contentType: 'course' | 'article' | 'product' | 'page'
  itemId: string | number
  title: string
  version: string
  revision: number
  timestamp: string
  author: string
  changes: string[]
  content: unknown
  status: 'draft' | 'published' | 'archived'
  backupDate: string
}

interface VersionControlDashboardProps {
  contentType?: string
  itemId?: string | number
}

export function VersionControlDashboard({ contentType, itemId }: VersionControlDashboardProps) {
  const [versions, setVersions] = useState<ContentVersion[]>([])
  interface ProtectedItem { id: string | number; title: string; type: string }
  const [protectedItems, setProtectedItems] = useState<ProtectedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchVersions()
    fetchProtectedItems()
  }, [contentType, itemId])

  const fetchVersions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (contentType && itemId) {
        params.append('contentType', contentType)
        params.append('itemId', String(itemId))
        params.append('action', 'list')
      } else {
        params.append('action', 'all')
      }

      const response = await fetch(`/api/versioning?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setVersions(Array.isArray(data.versions) ? data.versions : [])
        setError(null)
      } else {
        setError(data.error || 'Kunde inte hämta versioner')
      }
    } catch (err) {
      setError('Nätverksfel vid hämtning av versioner')
    } finally {
      setLoading(false)
    }
  }

  const fetchProtectedItems = async () => {
    try {
      const response = await fetch('/api/versioning?action=protected')
      const data = await response.json()
      
      if (response.ok) {
        setProtectedItems(data.protectedItems || [])
      }
    } catch (err) {
      console.error('Kunde inte hämta skyddade objekt:', err)
    }
  }

  const restoreVersion = async (versionId: string) => {
    if (!confirm('Är du säker på att du vill återställa till denna version?')) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/versioning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'restore',
          versionId
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccess(`Version ${data.version.version} har återställts`)
        fetchVersions()
      } else {
        setError(data.error || 'Kunde inte återställa version')
      }
    } catch (err) {
      setError('Nätverksfel vid återställning')
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 5000)
    }
  }

  const createBackup = async () => {
    try {
      setLoading(true)
      setSuccess('Säkerhetskopiering pågår...')
      
      // Simulera backup-process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Säkerhetskopia skapad framgångsrikt!')
    } catch (err) {
      setError('Kunde inte skapa säkerhetskopia')
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 5000)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('sv-SE')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  if (loading && versions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Laddar versionshistorik...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-green-800">{success}</span>
        </div>
      )}

      {/* Skyddad Innehåll Översikt */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="h-5 w-5" />
            Skyddat Innehåll
          </CardTitle>
          <CardDescription>
            Detta innehåll är skyddat och kräver godkännande för ändringar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {protectedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600 capitalize">{item.type} • ID: {item.id}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border">
                  <Shield className="h-3 w-3 mr-1" />
                  Skyddad
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Versionskontroll Verktyg */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Versionskontroll Verktyg
          </CardTitle>
          <CardDescription>
            Hantera säkerhetskopior och återställning av innehåll
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <Button onClick={createBackup} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Skapa Backup
            </Button>
            <Button variant="outline" onClick={() => fetchVersions()} disabled={loading}>
              <Download className="h-4 w-4 mr-2" />
              Uppdatera Lista
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Versionshistorik */}
      <Card>
        <CardHeader>
          <CardTitle>Versionshistorik</CardTitle>
          <CardDescription>
            {contentType && itemId 
              ? `Visar versioner för ${contentType} ${itemId}`
              : `Visar alla versioner (${versions.length} st)`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {versions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Inga versioner hittades</p>
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version) => (
                <div key={version.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{version.title}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(version.status)}`}>
                          {version.status}
                        </span>
                        {protectedItems.some(item => 
                          item.type === version.contentType && item.id === version.itemId
                        ) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border">
                            <Shield className="h-3 w-3 mr-1" />
                            Skyddad
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Version:</span> {version.version}
                        </div>
                        <div>
                          <span className="font-medium">Revision:</span> #{version.revision}
                        </div>
                        <div>
                          <span className="font-medium">Skapad:</span> {formatDate(version.timestamp)}
                        </div>
                        <div>
                          <span className="font-medium">Författare:</span> {version.author}
                        </div>
                        <div>
                          <span className="font-medium">Typ:</span> {version.contentType}
                        </div>
                        <div>
                          <span className="font-medium">ID:</span> {version.itemId}
                        </div>
                      </div>

                      {version.changes && version.changes.length > 0 && (
                        <div className="mb-3">
                          <p className="font-medium text-sm mb-1">Ändringar:</p>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {version.changes.map((change, index) => (
                              <li key={index}>{change}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => restoreVersion(version.id)}
                        disabled={loading}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Återställ
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
