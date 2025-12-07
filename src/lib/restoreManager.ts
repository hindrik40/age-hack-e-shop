// KOMPLETT RESTORE & ÅTERSTÄLLNINGSSYSTEM
// Ger användare full kontroll över återställning av innehåll och filer

import { useState, useEffect } from 'react'
import { backupService, BackupMetadata, AutoSavePoint } from '@/lib/backupService'
import { revisionManager, FileVersion, RevisionWarning } from '@/lib/revisionManager'
import { versionControl, ContentVersion } from '@/data/versionControl'

export interface RestorePoint {
  id: string
  type: 'backup' | 'autosave' | 'file-version' | 'content-version'
  timestamp: string
  title: string
  description: string
  content: any
  metadata: any
  size: number
  checksum: string
  protected: boolean
  restoreable: boolean
}

export interface RestoreOptions {
  includeUserData: boolean
  includeSettings: boolean
  includeContent: boolean
  includeFiles: boolean
  dryRun: boolean
  createBackupBeforeRestore: boolean
}

export class RestoreManager {
  private restoreHistory: RestorePoint[] = []
  private readonly MAX_RESTORE_HISTORY = 50

  constructor() {
    this.loadRestoreHistory()
  }

  // HÄMTA ALLA TILLGÄNGLIGA ÅTERSTÄLLNINGSPUNKTER
  async getAvailableRestorePoints(): Promise<RestorePoint[]> {
    const restorePoints: RestorePoint[] = []

    try {
      // Hämta backuper
      const backups = backupService.getAllBackups()
      backups.forEach(backup => {
        restorePoints.push({
          id: backup.id,
          type: 'backup',
          timestamp: backup.timestamp,
          title: `Backup: ${backup.description}`,
          description: `${backup.type} backup med ${backup.itemCount} objekt`,
          content: null, // Ladda vid behov
          metadata: backup,
          size: backup.fileSize,
          checksum: backup.checksum,
          protected: true,
          restoreable: backup.status === 'completed'
        })
      })

      // Hämta auto-save punkter
      const autoSavePoints = backupService.getAutoSavePoints()
      autoSavePoints.forEach(savePoint => {
        restorePoints.push({
          id: savePoint.id,
          type: 'autosave',
          timestamp: savePoint.timestamp,
          title: `Auto-save: ${savePoint.description}`,
          description: `Automatiskt sparad punkt från ${new Date(savePoint.timestamp).toLocaleString('sv-SE')}`,
          content: savePoint.content,
          metadata: savePoint,
          size: JSON.stringify(savePoint.content).length,
          checksum: '',
          protected: false,
          restoreable: true
        })
      })

      // Inkludera manuellt skapade restore-punkter från historiken
      if (this.restoreHistory && this.restoreHistory.length > 0) {
        for (const rp of this.restoreHistory) {
          restorePoints.push(rp)
        }
      }

      // Hämta filversioner från revision manager
      const monitoredFiles = revisionManager.getAllWarnings().map(w => w.filePath)
      for (const filePath of monitoredFiles) {
        const fileVersions = revisionManager.getFileHistory(filePath)
        fileVersions.forEach(version => {
          restorePoints.push({
            id: version.id,
            type: 'file-version',
            timestamp: version.timestamp,
            title: `Fil: ${filePath}`,
            description: `Version från ${new Date(version.timestamp).toLocaleString('sv-SE')} (${version.changeType})`,
            content: version.content,
            metadata: version,
            size: version.size,
            checksum: version.checksum,
            protected: revisionManager.getAllWarnings().some(w => w.filePath === filePath && w.protectedContent),
            restoreable: version.changeType !== 'deleted'
          })
        })
      }

      // Hämta innehållsversioner
      const contentVersions = versionControl.getAllVersions('course', '') // Hämta alla typer
      contentVersions.forEach(version => {
        restorePoints.push({
          id: version.id,
          type: 'content-version',
          timestamp: version.timestamp,
          title: `${version.contentType}: ${version.title}`,
          description: `Version ${version.version} (rev ${version.revision}) - ${version.status}`,
          content: version.content,
          metadata: version,
          size: JSON.stringify(version.content).length,
          checksum: '',
          protected: true,
          restoreable: true
        })
      })

    } catch (error) {
      console.error('Fel vid hämtning av återställningspunkter:', error)
      throw error
    }

    // Sortera efter tid (nyaste först)
    return restorePoints.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  // FÖRBERED ÅTERSTÄLLNING
  async prepareRestore(restorePointId: string, options: Partial<RestoreOptions> = {}): Promise<{
    success: boolean
    restorePoint?: RestorePoint
    preview?: any
    warnings?: string[]
    estimatedTime?: number
  }> {
    try {
      const restorePoints = await this.getAvailableRestorePoints()
      const restorePoint = restorePoints.find(rp => rp.id === restorePointId)

      if (!restorePoint) {
        return { success: false, warnings: ['Återställningspunkt hittades inte'] }
      }

      // Ladda innehåll om det behövs
      if (!restorePoint.content && restorePoint.type === 'backup') {
        restorePoint.content = await this.loadBackupContent(restorePoint.id)
      }

      // Skapa förhandsvisning
      const preview = await this.createRestorePreview(restorePoint, options)

      // Generera varningar
      const warnings = await this.generateRestoreWarnings(restorePoint, options)

      // Uppskatta tid
      const estimatedTime = this.estimateRestoreTime(restorePoint, options)

      return {
        success: true,
        restorePoint,
        preview,
        warnings,
        estimatedTime
      }

    } catch (error: unknown) {
      console.error('Fel vid förberedelse av återställning:', error)
      const message = error instanceof Error ? error.message : String(error)
      return { 
        success: false, 
        warnings: [`Fel vid förberedelse: ${message}`] 
      }
    }
  }

  // UTFÖR ÅTERSTÄLLNING
  async performRestore(
    restorePointId: string, 
    options: Partial<RestoreOptions> = {}
  ): Promise<{
    success: boolean
    message?: string
    restoredItems?: string[]
    errors?: string[]
    backupCreated?: string
  }> {
    const startTime = Date.now()
    const errors: string[] = []
    const restoredItems: string[] = []

    try {
      // Hämta återställningspunkt
      const restorePoints = await this.getAvailableRestorePoints()
      const restorePoint = restorePoints.find(rp => rp.id === restorePointId)

      if (!restorePoint) {
        return { success: false, errors: ['Återställningspunkt hittades inte'] }
      }

      if (restorePoint.restoreable === false) {
        return { success: false, errors: ['Återställningspunkt är inte återställningsbar'] }
      }

      // Säkerställ att vi använder original-ID från metadata när det finns
      const originalId = typeof restorePoint.metadata?.id === 'string'
        ? restorePoint.metadata.id
        : restorePoint.id

      // Skapa backup innan återställning om begärt
      let backupCreated: string | undefined
      if (options.createBackupBeforeRestore !== false) {
        try {
          const preRestoreBackup = await backupService.createFullBackup(
            `Pre-restore backup före återställning av ${restorePoint.title}`,
            'restore-system'
          )
          backupCreated = preRestoreBackup.id
          restoredItems.push(`Försäkringsbackup skapad: ${preRestoreBackup.id}`)
        } catch (backupError: unknown) {
          const message = backupError instanceof Error ? backupError.message : String(backupError)
          errors.push(`Kunde inte skapa försäkringsbackup: ${message}`)
        }
      }

      // Utför själva återställningen baserat på typ
      let restoreSuccess = false

      switch (restorePoint.type) {
        case 'backup':
          restoreSuccess = await this.restoreFromBackup(originalId, options)
          if (restoreSuccess) restoredItems.push('Komplett systemåterställning utförd')
          break

        case 'autosave':
          restoreSuccess = await this.restoreFromAutoSave(originalId, options)
          if (restoreSuccess) restoredItems.push('Auto-save återställd')
          break

        case 'file-version':
          restoreSuccess = await this.restoreFileVersion(originalId, options)
          if (restoreSuccess) restoredItems.push(`Filversion återställd: ${restorePoint.metadata?.filePath || ''}`)
          break

        case 'content-version':
          restoreSuccess = await this.restoreContentVersion(originalId, options)
          if (restoreSuccess) restoredItems.push(`Innehållsversion återställd: ${restorePoint.title}`)
          break

        default:
          errors.push(`Okänd återställningstyp: ${restorePoint.type}`)
      }

      // Registrera återställning i historik
      if (restoreSuccess) {
        await this.recordRestore(restorePoint, options, Date.now() - startTime)
      }

      const duration = Date.now() - startTime
      const message = restoreSuccess 
        ? `Återställning slutförd på ${duration}ms`
        : `Återställning misslyckades efter ${duration}ms`

      return {
        success: restoreSuccess,
        message,
        restoredItems,
        errors,
        backupCreated
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Fel vid återställning:', message)
      errors.push(message)
      return { success: false, errors }
    }
  }

  // SPECIFIKA ÅTERSTÄLLNINGSMETODER
  private async restoreFromBackup(backupId: string, options: Partial<RestoreOptions>): Promise<boolean> {
    try {
      // Använd backup service för huvudsaklig återställning
      const success = await backupService.restoreFromBackup(backupId)
      
      if (success && !options.dryRun) {
        // Uppdatera UI och notifiera
        this.notifyRestoreComplete('backup', backupId)
      }
      
      return success
    } catch (error) {
      console.error('Fel vid backup-återställning:', error)
      return false
    }
  }

  private async restoreFromAutoSave(savePointId: string, options: Partial<RestoreOptions>): Promise<boolean> {
    try {
      const savePoints = backupService.getAutoSavePoints()
      const savePoint = savePoints.find(sp => sp.id === savePointId)
      
      if (!savePoint) {
        throw new Error(`Auto-save punkt ${savePointId} hittades inte`)
      }

      if (options.dryRun) {
        return true // Simulera framgång för torrkörning
      }

      // Återställ innehåll från auto-save
      const content = savePoint.content
      
      // Återställ kurser
      if (content.courses && options.includeContent !== false) {
        await this.restoreCourses(content.courses)
      }
      
      // Återställ artiklar
      if (content.articles && options.includeContent !== false) {
        await this.restoreArticles(content.articles)
      }
      
      // Återställ produkter
      if (content.products && options.includeContent !== false) {
        await this.restoreProducts(content.products)
      }
      
      // Återställ användardata
      if (content.userData && options.includeUserData !== false) {
        await this.restoreUserData(content.userData)
      }
      
      // Återställ inställningar
      if (content.settings && options.includeSettings !== false) {
        await this.restoreSettings(content.settings)
      }

      this.notifyRestoreComplete('autosave', savePointId)
      return true
      
    } catch (error) {
      console.error('Fel vid auto-save återställning:', error)
      return false
    }
  }

  private async restoreFileVersion(versionId: string, options: Partial<RestoreOptions>): Promise<boolean> {
    try {
      if (options.dryRun) {
        return true // Simulera framgång för torrkörning
      }

      // Använd revision manager för filåterställning
      const fileWarnings = revisionManager.getAllWarnings()
      const fileWarning = fileWarnings.find(w => w.id === versionId)
      
      if (fileWarning) {
        return await revisionManager.restoreFileVersion(fileWarning.filePath, versionId)
      }
      
      return false
    } catch (error) {
      console.error('Fel vid filversions-återställning:', error)
      return false
    }
  }

  private async restoreContentVersion(versionId: string, options: Partial<RestoreOptions>): Promise<boolean> {
    try {
      if (options.dryRun) {
        return true // Simulera framgång för torrkörning
      }

      // Använd version control för innehållsåterställning
      const restoredVersion = versionControl.restoreVersion(versionId)
      
      if (restoredVersion) {
        this.notifyRestoreComplete('content-version', versionId)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Fel vid innehållsversions-återställning:', error)
      return false
    }
  }

  // HJÄLPMETODER
  private async loadBackupContent(backupId: string): Promise<any> {
    // Detta är en placeholder - implementera baserat på din backup-struktur
    try {
      const backupData = localStorage.getItem(`backup_${backupId}`)
      return backupData ? JSON.parse(backupData) : null
    } catch (error) {
      console.error('Fel vid laddning av backup-innehåll:', error)
      return null
    }
  }

  private async createRestorePreview(restorePoint: RestorePoint, options: Partial<RestoreOptions>): Promise<any> {
    const preview = {
      title: restorePoint.title,
      timestamp: restorePoint.timestamp,
      type: restorePoint.type,
      protected: restorePoint.protected,
      estimatedItems: 0,
      warnings: [],
      conflicts: []
    }

    // Beräkna uppskattat antal objekt som kommer att påverkas
    if (restorePoint.content) {
      if (restorePoint.content.courses) preview.estimatedItems += restorePoint.content.courses.length
      if (restorePoint.content.articles) preview.estimatedItems += restorePoint.content.articles.length
      if (restorePoint.content.products) preview.estimatedItems += restorePoint.content.products.length
    }

    return preview
  }

  private async generateRestoreWarnings(restorePoint: RestorePoint, options: Partial<RestoreOptions>): Promise<string[]> {
    const warnings: string[] = []

    if (restorePoint.protected) {
      warnings.push('Detta är skyddat innehåll - återställning kräver extra försiktighet')
    }

    if (!options.createBackupBeforeRestore) {
      warnings.push('Ingen backup kommer att skapas före återställning - risk för dataförlust')
    }

    if (options.dryRun) {
      warnings.push('Detta är en torrkörning - inga faktiska ändringar kommer att göras')
    }

    return warnings
  }

  private estimateRestoreTime(restorePoint: RestorePoint, options: Partial<RestoreOptions>): number {
    let baseTime = 2000 // 2 sekunder bas
    
    if (restorePoint.type === 'backup') baseTime += 5000
    if (restorePoint.type === 'autosave') baseTime += 3000
    if (restorePoint.protected) baseTime += 2000
    if (options.createBackupBeforeRestore) baseTime += 4000
    
    return Math.min(baseTime, 30000) // Max 30 sekunder
  }

  private async recordRestore(restorePoint: RestorePoint, options: Partial<RestoreOptions>, duration: number): Promise<void> {
    const restoreRecord: RestorePoint = {
      ...restorePoint,
      id: `restore-${Date.now()}`,
      timestamp: new Date().toISOString(),
      description: `Återställd från: ${restorePoint.title} (${duration}ms)`
    }

    this.restoreHistory.push(restoreRecord)
    
    // Begränsa historik
    if (this.restoreHistory.length > this.MAX_RESTORE_HISTORY) {
      this.restoreHistory = this.restoreHistory.slice(-this.MAX_RESTORE_HISTORY)
    }

    await this.saveRestoreHistory()
  }

  private async saveRestoreHistory(): Promise<void> {
    try {
      localStorage.setItem('restore_history', JSON.stringify(this.restoreHistory))
    } catch (error) {
      console.error('Fel vid sparning av återställningshistorik:', error)
    }
  }

  private loadRestoreHistory(): void {
    try {
      const saved = localStorage.getItem('restore_history')
      if (saved) {
        this.restoreHistory = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Fel vid laddning av återställningshistorik:', error)
      this.restoreHistory = []
    }
  }

  private notifyRestoreComplete(type: string, id: string): void {
    console.log(`Återställning slutförd: ${type} ${id}`)
    
    // Notifiera användargränssnittet
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('restore-complete', {
        detail: { type, id, timestamp: new Date().toISOString() }
      }))
    }
  }

  // SPECIFIKA ÅTERSTÄLLNINGSHJÄLPMETODER
  private async restoreCourses(courses: any[]): Promise<void> {
    // Implementera kursåterställning baserat på din datastruktur
    console.log(`Återställer ${courses.length} kurser`)
    // Placeholder för faktisk implementering
  }

  private async restoreArticles(articles: any[]): Promise<void> {
    // Implementera artikelåterställning baserat på din datastruktur
    console.log(`Återställer ${articles.length} artiklar`)
    // Placeholder för faktisk implementering
  }

  private async restoreProducts(products: any[]): Promise<void> {
    // Implementera produktåterställning baserat på din datastruktur
    console.log(`Återställer ${products.length} produkter`)
    // Placeholder för faktisk implementering
  }

  private async restoreUserData(userData: any): Promise<void> {
    // Implementera användardataåterställning
    console.log('Återställer användardata')
    // Placeholder för faktisk implementering
  }

  private async restoreSettings(settings: any): Promise<void> {
    // Implementera inställningsåterställning
    console.log('Återställer inställningar')
    // Placeholder för faktisk implementering
  }

  // PUBLIKA METODER
  getRestoreHistory(): RestorePoint[] {
    return [...this.restoreHistory].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  getLastRestore(): RestorePoint | undefined {
    return this.restoreHistory[this.restoreHistory.length - 1]
  }

  // Skapa manuell restore-punkt
  async createRestorePoint(title: string, description: string, content?: any): Promise<RestorePoint> {
    const id = `manual-${Date.now()}`
    const timestamp = new Date().toISOString()

    const payload = content ?? null
    const size = payload ? JSON.stringify(payload).length : 0

    const restorePoint: RestorePoint = {
      id,
      type: 'autosave',
      timestamp,
      title,
      description,
      content: payload,
      metadata: { createdBy: 'manual' },
      size,
      checksum: Math.random().toString(36).slice(2),
      protected: false,
      restoreable: true
    }

    this.restoreHistory.push(restorePoint)

    // Begränsa historik
    if (this.restoreHistory.length > this.MAX_RESTORE_HISTORY) {
      this.restoreHistory = this.restoreHistory.slice(-this.MAX_RESTORE_HISTORY)
    }

    await this.saveRestoreHistory()

    // Notifiera UI om ny restore-punkt
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('restore-point-created', {
        detail: { id, timestamp }
      }))
    }

    return restorePoint
  }

  // Skapa autosave restore-punkt (för integrationer)
  async createAutosavePoint(description: string, content?: any): Promise<RestorePoint> {
    const title = `Auto-save: ${description}`
    return await this.createRestorePoint(title, description, content)
  }

  getLatestRestorePoint(): RestorePoint | undefined {
    try {
      // Försök med senaste restore-historik
      const lastFromHistory = this.getLastRestore()
      if (lastFromHistory) return lastFromHistory

      // Senaste autosave
      const latestAuto = backupService.getLatestAutoSavePoint()
      if (latestAuto) {
        return {
          id: latestAuto.id,
          type: 'autosave',
          timestamp: latestAuto.timestamp,
          title: `Auto-save: ${latestAuto.description}`,
          description: `Automatisk sparning från ${new Date(latestAuto.timestamp).toLocaleString('sv-SE')}`,
          content: latestAuto.content,
          metadata: latestAuto,
          size: JSON.stringify(latestAuto.content).length,
          checksum: '',
          protected: false,
          restoreable: true
        }
      }

      // Senaste backup
      const latestBackup = backupService.getLastSuccessfulBackup()
      if (latestBackup) {
        return {
          id: latestBackup.id,
          type: 'backup',
          timestamp: latestBackup.timestamp,
          title: `Backup: ${latestBackup.description}`,
          description: `${latestBackup.type} backup med ${latestBackup.itemCount} objekt`,
          content: null,
          metadata: latestBackup,
          size: latestBackup.fileSize,
          checksum: latestBackup.checksum,
          protected: true,
          restoreable: latestBackup.status === 'completed'
        }
      }

      return undefined
    } catch (error) {
      console.error('Fel vid hämtning av senaste restore point:', error)
      return undefined
    }
  }

  canUndoLastRestore(): boolean {
    return this.restoreHistory.length > 0
  }

  async undoLastRestore(): Promise<boolean> {
    const lastRestore = this.getLastRestore()
    if (!lastRestore) {
      return false
    }

    // Hitta motsvarande backup från före återställningen
    const backups = backupService.getAllBackups()
    const preRestoreBackup = backups.find(b => b.id === lastRestore.metadata?.backupCreated)
    
    if (preRestoreBackup) {
      return await backupService.restoreFromBackup(preRestoreBackup.id)
    }

    return false
  }
}

// GLOBAL INSTANS
export const restoreManager = new RestoreManager()

// HOOK FÖR REACT-KOMPONENTER
export function useRestoreManager() {
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRestorePoints = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const points = await restoreManager.getAvailableRestorePoints()
      setRestorePoints(points)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const prepareRestore = async (restorePointId: string, options?: Partial<RestoreOptions>) => {
    return await restoreManager.prepareRestore(restorePointId, options)
  }

  const performRestore = async (restorePointId: string, options?: Partial<RestoreOptions>) => {
    return await restoreManager.performRestore(restorePointId, options)
  }

  useEffect(() => {
    loadRestorePoints()
  }, [])

  return {
    restorePoints,
    isLoading,
    error,
    loadRestorePoints,
    prepareRestore,
    performRestore
  }
}

export default restoreManager
