// AVANCERAD VERSIONSHANTERING & FILÖVERVAKNING
// Övervakar filändringar och skapar automatiskt versioner

import { backupService } from './backupService'
import { versionControl, ContentVersion } from '@/data/versionControl'

export interface FileVersion {
  id: string
  filePath: string
  content: string
  timestamp: string
  author: string
  changeType: 'created' | 'modified' | 'deleted'
  checksum: string
  size: number
  previousVersion?: string
}

export interface WorkspaceState {
  sessionId: string
  lastActivity: string
  openFiles: string[]
  currentProject: string
  backupPoints: string[]
  autoSaveEnabled: boolean
  protectedFiles: string[]
}

export interface RevisionWarning {
  id: string
  filePath: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  actionRequired: boolean
  protectedContent: boolean
}

class RevisionManager {
  private fileVersions: Map<string, FileVersion[]> = new Map()
  private workspaceState: WorkspaceState | null = null
  private warnings: RevisionWarning[] = []
  private changeQueue: FileVersion[] = []
  private isProcessing = false
  private readonly PROTECTED_FILE_PATTERNS = [
    'src/data/protectedCourses.ts',
    'src/data/protectedArticles.ts',
    'src/data/enhancedProducts.ts',
    'src/data/articles.ts',
    'src/data/antiAgingEducation.ts',
    'src/store/cartStore.ts',
    'src/lib/orderService.ts',
    'src/data/personalDevelopment.ts',
    'package.json',
    'tsconfig.json',
    'next.config.ts'
  ]

  // Lagringsgränser
  private readonly MAX_VERSION_SIZE_BYTES = 100 * 1024 // 100KB per version
  private readonly MAX_VERSIONS_PER_FILE = 5
  private readonly MAX_FILES_TOTAL = 50
  private memoryCacheEnabled = false
  private memoryFileVersionsCache: Map<string, FileVersion[]> = new Map()

  constructor() {
    this.initializeRevisionSystem()
    this.startFileMonitoring()
  }

  // PUBLIK INITIALISERINGSMETOD
  async initialize(): Promise<void> {
    try {
      await this.loadWorkspaceState()
      await this.loadFileVersions()
      await this.loadWarnings()
      
      // Skapa initial backup om ingen finns
      const hasBackups = backupService.getAllBackups().length > 0
      if (!hasBackups) {
        console.log('Inga backuper hittades, skapar initial backup...')
        await backupService.createFullBackup('Initial systembackup', 'system')
      }
      
      // Skapa workspace-state
      await this.createWorkspaceSession()
      
      console.log('RevisionManager initialiserad framgångsrikt')
      
    } catch (error) {
      console.error('Fel vid initiering av RevisionManager:', error)
      this.addWarning('system', 'Kunde inte initiera RevisionManager', 'critical', true)
      throw error
    }
  }

  // INITIALISERA REVISIONSSYSTEMET
  private async initializeRevisionSystem(): Promise<void> {
    try {
      await this.loadWorkspaceState()
      await this.loadFileVersions()
      await this.loadWarnings()
      
      // Skapa initial backup om ingen finns
      const hasBackups = backupService.getAllBackups().length > 0
      if (!hasBackups) {
        console.log('Inga backuper hittades, skapar initial backup...')
        await backupService.createFullBackup('Initial systembackup', 'system')
      }
      
      // Skapa workspace-state
      await this.createWorkspaceSession()
      
      console.log('Revisionssystem initialiserat framgångsrikt')
      
    } catch (error) {
      console.error('Fel vid initiering av revisionssystem:', error)
      this.addWarning('system', 'Kunde inte initiera revisionssystem', 'critical', true)
    }
  }

  // FILÖVERVAKNING
  private startFileMonitoring(): void {
    // Övervaka localStorage för ändringar
    setInterval(() => {
      this.checkForFileChanges()
    }, 10000) // Kolla var 10:e sekund
    
    // Övervaka session storage
    window.addEventListener('storage', (event) => {
      if (event.key?.startsWith('file_') || event.key?.startsWith('content_')) {
        this.handleStorageChange(event)
      }
    })
    
    // Spara workspace-state regelbundet
    setInterval(() => {
      this.saveWorkspaceState()
    }, 30000) // Var 30:e sekund
  }

  private async checkForFileChanges(): Promise<void> {
    const currentFiles = this.getMonitoredFiles()
    
    for (const filePath of currentFiles) {
      try {
        const currentContent = await this.getFileContent(filePath)
        const lastVersion = this.getLatestFileVersion(filePath)
        
        if (!lastVersion) {
          // Ny fil upptäckt
          await this.createFileVersion(filePath, currentContent, 'created')
        } else if (lastVersion.content !== currentContent) {
          // Fil ändrad
          await this.createFileVersion(filePath, currentContent, 'modified', lastVersion.id)
        }
      } catch (error) {
        // Fil kanske raderad
        const lastVersion = this.getLatestFileVersion(filePath)
        if (lastVersion && lastVersion.changeType !== 'deleted') {
          await this.createFileVersion(filePath, '', 'deleted', lastVersion.id)
        }
      }
    }
  }

  private getMonitoredFiles(): string[] {
    // Hämta lista över filer som ska övervakas
    const files = new Set<string>(this.PROTECTED_FILE_PATTERNS)
    
    // Lägg till filer från localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('file_') || key?.startsWith('content_')) {
        files.add(key.replace('file_', '').replace('content_', ''))
      }
    }
    
    return Array.from(files)
  }

  // VERSIONSHANTERING FÖR FILER
  private async createFileVersion(
    filePath: string, 
    content: string, 
    changeType: 'created' | 'modified' | 'deleted',
    previousVersion?: string
  ): Promise<FileVersion> {
    const versionId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Komprimera/stubba stora versioner
    const compressed = this.compressContentForStorage(versionId, content)

    const version: FileVersion = {
      id: versionId,
      filePath,
      content: compressed.inlineContent,
      timestamp: new Date().toISOString(),
      author: await this.getCurrentAuthor(),
      changeType,
      checksum: await this.generateChecksum(compressed.originalContentHashBase ?? content),
      size: compressed.sizeBytes,
      previousVersion
    }
    
    // Lägg till i filens versionshistorik
    if (!this.fileVersions.has(filePath)) {
      this.fileVersions.set(filePath, [])
    }
    
    const fileVersions = this.fileVersions.get(filePath)!
    fileVersions.push(version)
    
    // Begränsa antal versioner per fil (senaste MAX_VERSIONS_PER_FILE)
    if (fileVersions.length > this.MAX_VERSIONS_PER_FILE) {
      this.fileVersions.set(filePath, fileVersions.slice(-this.MAX_VERSIONS_PER_FILE))
    }
    
    // Kontrollera total filgräns
    this.pruneFilesToTotalLimit()
    
    // Kontrollera om filen är skyddad
    if (this.isProtectedFile(filePath)) {
      this.addWarning(
        filePath,
        `Skyddad fil ${changeType}: ${filePath}`,
        changeType === 'deleted' ? 'critical' : 'high',
        true
      )
    }
    
    // Skapa backup om kritisk fil ändrats
    if (this.isCriticalFile(filePath) && changeType === 'modified') {
      await this.createEmergencyBackup(filePath, version)
    }
    
    await this.saveFileVersions()
    
    console.log(`Filversion skapad: ${filePath} (${changeType})`)
    return version
  }

  private getLatestFileVersion(filePath: string): FileVersion | undefined {
    const versions = this.fileVersions.get(filePath)
    return versions?.[versions.length - 1]
  }

  private async getFileContent(filePath: string): Promise<string> {
    // Försök hämta från localStorage först
    const storageKey = `file_${filePath}`
    const content = localStorage.getItem(storageKey)
    
    if (content !== null) {
      return content
    }
    
    // Försök hämta från content storage
    const contentKey = `content_${filePath}`
    const contentData = localStorage.getItem(contentKey)
    
    return contentData || ''
  }

  // SKYDD OCH VARNINGAR
  private isProtectedFile(filePath: string): boolean {
    return this.PROTECTED_FILE_PATTERNS.some(pattern => 
      filePath.includes(pattern) || pattern.includes(filePath)
    )
  }

  private isCriticalFile(filePath: string): boolean {
    const criticalPatterns = [
      'src/data/protected',
      'src/data/articles',
      'src/data/enhancedProducts',
      'package.json'
    ]
    
    return criticalPatterns.some(pattern => filePath.includes(pattern))
  }

  private pruneFilesToTotalLimit(): void {
    const totalFiles = this.fileVersions.size
    if (totalFiles <= this.MAX_FILES_TOTAL) return

    // Beräkna senaste ändringstid per fil
    const entries: Array<{ filePath: string; latest: number }> = []
    for (const [filePath, versions] of this.fileVersions) {
      const latestTs = versions.length > 0
        ? new Date(versions[versions.length - 1].timestamp).getTime()
        : 0
      entries.push({ filePath, latest: latestTs })
    }

    // Sortera äldst först och ta bort tills vi når gränsen
    entries.sort((a, b) => a.latest - b.latest)
    const removeCount = totalFiles - this.MAX_FILES_TOTAL

    let removed = 0
    for (const entry of entries) {
      if (removed >= removeCount) break
      this.fileVersions.delete(entry.filePath)
      removed++
    }
  }

  private isQuotaExceeded(err: unknown): boolean {
    const e: any = err as any
    const name = e?.name ?? ''
    const code = e?.code ?? ''
    const message = String(e?.message ?? e ?? '')
    return (
      name === 'QuotaExceededError' ||
      name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      code === 22 ||
      /quota|exceeded|storage/i.test(message)
    )
  }

  private pruneAllFilesAndVersions(): void {
    // Behåll endast de två senaste versionerna per fil
    for (const [filePath, versions] of this.fileVersions) {
      if (versions.length > 2) {
        this.fileVersions.set(filePath, versions.slice(-2))
      }
    }
    // Säkerställ att totalfilgränsen hålls
    this.pruneFilesToTotalLimit()
  }

  private addWarning(filePath: string, message: string, severity: 'low' | 'medium' | 'high' | 'critical', actionRequired: boolean): void {
    const warning: RevisionWarning = {
      id: `warning-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filePath,
      message,
      severity,
      timestamp: new Date().toISOString(),
      actionRequired,
      protectedContent: this.isProtectedFile(filePath)
    }
    
    this.warnings.push(warning)
    
    // Begränsa antal varningar
    if (this.warnings.length > 100) {
      this.warnings = this.warnings.slice(-100)
    }
    
    // Visa kritiska varningar omedelbart
    if (severity === 'critical') {
      this.showCriticalWarning(warning)
    }
    
    this.saveWarnings()
  }

  private showCriticalWarning(warning: RevisionWarning): void {
    if (typeof window !== 'undefined') {
      window.alert(`KRITISK VARNING: ${warning.message}\n\nFil: ${warning.filePath}\nTid: ${new Date(warning.timestamp).toLocaleString('sv-SE')}`)
    }
  }

  // EMERGENCY BACKUP
  private async createEmergencyBackup(filePath: string, version: FileVersion): Promise<void> {
    try {
      const description = `Nödbackup pga ändring av kritisk fil: ${filePath}`
      await backupService.createIncrementalBackup(description, 'emergency-system')
      
      console.log(`Nödbackup skapad för: ${filePath}`)
    } catch (error) {
      console.error('Fel vid skapande av nödbackup:', error)
    }
  }

  // WORKSPACE STATE HANTERING
  private async createWorkspaceSession(): Promise<void> {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    this.workspaceState = {
      sessionId,
      lastActivity: new Date().toISOString(),
      openFiles: this.getMonitoredFiles(),
      currentProject: 'e-shop',
      backupPoints: [],
      autoSaveEnabled: true,
      protectedFiles: this.PROTECTED_FILE_PATTERNS
    }
    
    await this.saveWorkspaceState()
  }

  private async saveWorkspaceState(): Promise<void> {
    if (!this.workspaceState) return
    
    this.workspaceState.lastActivity = new Date().toISOString()
    this.workspaceState.openFiles = this.getMonitoredFiles()
    
    try {
      localStorage.setItem('workspace_state', JSON.stringify(this.workspaceState))
      
      // Spara även till Trae workspace
      await backupService.saveWorkspaceState()
      
    } catch (error) {
      console.error('Fel vid sparning av workspace-state:', error)
    }
  }

  private async loadWorkspaceState(): Promise<void> {
    try {
      const saved = localStorage.getItem('workspace_state')
      if (saved) {
        this.workspaceState = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Fel vid laddning av workspace-state:', error)
    }
  }

  // HJÄLPMETODER
  private async getCurrentAuthor(): Promise<string> {
    // Försök hämta från auth state
    try {
      const authData = localStorage.getItem('auth_user')
      if (authData) {
        const user = JSON.parse(authData)
        return user.email || user.name || 'Anonym'
      }
    } catch (error) {
      console.error('Fel vid hämtning av användarinformation:', error)
    }
    
    return 'System'
  }

  private async generateChecksum(content: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(content)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Lagringshjälpare för stort innehåll
  private compressContentForStorage(versionId: string, content: string): { inlineContent: string; originalContentHashBase?: string; sizeBytes: number } {
    try {
      if (!content) {
        return { inlineContent: '', sizeBytes: 0 }
      }
      // Enkel heuristik: om innehållet är större än MAX_VERSION_SIZE_BYTES, lagra som Base64 och stub
      const rawBytes = new TextEncoder().encode(content).length
      if (rawBytes <= this.MAX_VERSION_SIZE_BYTES) {
        return { inlineContent: content, sizeBytes: rawBytes }
      }
      // Komprimera via Base64 (inte verklig komprimering men säker serialisering) och skapa stub
      const b64 = typeof window !== 'undefined'
        ? btoa(unescape(encodeURIComponent(content)))
        : Buffer.from(content, 'utf-8').toString('base64')
      const stub = `__COMPRESSED__:${versionId}`
      // Spara komprimerat innehåll separat i sessionStorage för kvotbalans
      try {
        sessionStorage.setItem(`fv_${versionId}`, b64)
      } catch {
        // Om sessionStorage misslyckas, försök localStorage
        try { localStorage.setItem(`fv_${versionId}`, b64) } catch {}
      }
      return { inlineContent: stub, originalContentHashBase: content, sizeBytes: stub.length }
    } catch (error) {
      console.warn('Fel vid komprimering, lagrar råtext:', error)
      return { inlineContent: content, sizeBytes: content.length }
    }
  }

  private decompressContentForStorage(versionId: string, inlineContent: string): string {
    try {
      if (!inlineContent || !inlineContent.startsWith('__COMPRESSED__:')) {
        return inlineContent || ''
      }
      const id = inlineContent.split(':')[1]
      const key = `fv_${id}`
      let b64 = null
      try { b64 = sessionStorage.getItem(key) } catch {}
      if (!b64) {
        try { b64 = localStorage.getItem(key) } catch {}
      }
      if (!b64) return ''
      const decoded = typeof window !== 'undefined'
        ? decodeURIComponent(escape(atob(b64)))
        : Buffer.from(b64, 'base64').toString('utf-8')
      return decoded
    } catch (error) {
      console.warn('Fel vid dekomprimering, returnerar inline content:', error)
      return inlineContent || ''
    }
  }

  private resolveStoredContent(version: FileVersion): string {
    const inline = version.content || ''
    if (inline.startsWith('__COMPRESSED__:')) {
      return this.decompressContentForStorage(version.id, inline)
    }
    return inline
  }

  private async saveFileVersions(): Promise<void> {
    try {
      const versionsDataObj = Object.fromEntries(this.fileVersions)
      const dataStr = JSON.stringify(versionsDataObj)
      localStorage.setItem('file_versions', dataStr)
    } catch (error) {
      // Försök rensa och spara igen vid kvotfel
      if (this.isQuotaExceeded(error)) {
        console.warn('localStorage kvot nådd – rensar gamla versioner och försöker igen...')
        this.pruneAllFilesAndVersions()
        try {
          const versionsDataObj = Object.fromEntries(this.fileVersions)
          const dataStr = JSON.stringify(versionsDataObj)
          localStorage.setItem('file_versions', dataStr)
        } catch (err2) {
          // Fallback till sessionStorage
          try {
            const versionsDataObj = Object.fromEntries(this.fileVersions)
            const dataStr = JSON.stringify(versionsDataObj)
            sessionStorage.setItem('file_versions', dataStr)
            this.memoryCacheEnabled = false
            console.warn('Sparade till sessionStorage pga kvotbegränsning i localStorage')
          } catch (err3) {
            // Sista fallback: minnescache
            this.memoryCacheEnabled = true
            this.memoryFileVersionsCache = new Map(this.fileVersions)
            this.addWarning('system', 'Lagringskvoten för filversioner överskreds. Vissa äldre versioner rensades och data hålls temporärt i minnet.', 'medium', false)
            console.error('Kunde inte spara filversioner varken i localStorage eller sessionStorage – använder minnescache.')
          }
        }
      } else {
        console.error('Fel vid sparning av filversioner:', error)
      }
    }
  }

  private async loadFileVersions(): Promise<void> {
    try {
      const savedLocal = localStorage.getItem('file_versions')
      const savedSession = savedLocal ? null : sessionStorage.getItem('file_versions')
      const saved = savedLocal || savedSession
      if (saved) {
        const versionsData = JSON.parse(saved)
        this.fileVersions = new Map(Object.entries(versionsData))
        this.memoryCacheEnabled = false
        return
      }
      // Om minnescache aktiverad, använd den
      if (this.memoryCacheEnabled && this.memoryFileVersionsCache.size > 0) {
        this.fileVersions = new Map(this.memoryFileVersionsCache)
      }
    } catch (error) {
      console.error('Fel vid laddning av filversioner:', error)
    }
  }

  private async saveWarnings(): Promise<void> {
    try {
      localStorage.setItem('revision_warnings', JSON.stringify(this.warnings))
    } catch (error) {
      console.error('Fel vid sparning av varningar:', error)
    }
  }

  private async loadWarnings(): Promise<void> {
    try {
      const saved = localStorage.getItem('revision_warnings')
      if (saved) {
        this.warnings = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Fel vid laddning av varningar:', error)
    }
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key && event.newValue) {
      const filePath = event.key.replace('file_', '').replace('content_', '')
      this.createFileVersion(filePath, event.newValue, 'modified')
    }
  }

  // PUBLIKA METODER
  getFileHistory(filePath: string): FileVersion[] {
    return this.fileVersions.get(filePath) || []
  }

  async createVersionPoint(description: string): Promise<FileVersion> {
    const filePath = 'integration-test.txt'
    const content = `Integration version point: ${description} @ ${new Date().toISOString()}`
    return await this.createFileVersion(filePath, content, 'modified')
  }

  getAllWarnings(): RevisionWarning[] {
    return [...this.warnings].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  getCriticalWarnings(): RevisionWarning[] {
    return this.warnings.filter(w => w.severity === 'critical' && w.actionRequired)
  }

  getWorkspaceState(): WorkspaceState | null {
    return this.workspaceState
  }

  // Hämta de senast modifierade filerna (endast filvägar)
  getRecentlyModifiedFiles(limit: number = 10): string[] {
    const latestVersions: { filePath: string; timestamp: string; changeType: 'created' | 'modified' | 'deleted' }[] = []

    for (const [filePath, versions] of this.fileVersions) {
      if (versions && versions.length > 0) {
        const latest = versions[versions.length - 1]
        latestVersions.push({ filePath, timestamp: latest.timestamp, changeType: latest.changeType })
      }
    }

    return latestVersions
      .filter(v => v.changeType !== 'deleted')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
      .map(v => v.filePath)
  }

  // Hämta detaljer för de senast ändrade filerna
  getRecentlyModifiedFileDetails(limit: number = 10): Array<{ filePath: string; versionId: string; timestamp: string; changeType: 'created' | 'modified' | 'deleted' }> {
    const details: Array<{ filePath: string; versionId: string; timestamp: string; changeType: 'created' | 'modified' | 'deleted' }> = []

    for (const [filePath, versions] of this.fileVersions) {
      if (versions && versions.length > 0) {
        const latest = versions[versions.length - 1]
        details.push({ filePath, versionId: latest.id, timestamp: latest.timestamp, changeType: latest.changeType })
      }
    }

    return details
      .filter(d => d.changeType !== 'deleted')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  // Indikera om osparade ändringar finns jämfört med senaste backup
  hasUnsavedChanges(): boolean {
    try {
      let latestModification = 0
      for (const [, versions] of this.fileVersions) {
        if (versions && versions.length > 0) {
          const t = new Date(versions[versions.length - 1].timestamp).getTime()
          if (t > latestModification) latestModification = t
        }
      }

      const lastBackup = backupService.getLastSuccessfulBackup()
      const lastBackupTime = lastBackup ? new Date(lastBackup.timestamp).getTime() : 0

      const hasCriticalWarnings = this.warnings.some(w => w.severity === 'critical' && w.actionRequired)

      return latestModification > lastBackupTime || hasCriticalWarnings
    } catch (e) {
      return false
    }
  }

  async restoreFileVersion(filePath: string, versionId: string): Promise<boolean> {
    try {
      const versions = this.fileVersions.get(filePath)
      const version = versions?.find(v => v.id === versionId)
      
      if (!version) {
        console.error(`Version ${versionId} hittades inte för fil ${filePath}`)
        return false
      }
      
      // Kontrollera om filen är skyddad
      if (this.isProtectedFile(filePath)) {
        const confirmed = confirm(`Varning: ${filePath} är en skyddad fil. Är du säker på att du vill återställa till en tidigare version?`)
        if (!confirmed) {
          return false
        }
      }
      
      // Återställ innehåll (lös upp sessionStorage-pekare om nödvändigt)
      const resolvedContent = this.resolveStoredContent(version)
      localStorage.setItem(`file_${filePath}`, resolvedContent)
      
      // Skapa ny version för återställningen
      await this.createFileVersion(filePath, resolvedContent, 'modified')
      
      console.log(`Fil återställd: ${filePath} till version ${versionId}`)
      return true
      
    } catch (error) {
      console.error('Fel vid återställning av filversion:', error)
      return false
    }
  }

  dismissWarning(warningId: string): void {
    this.warnings = this.warnings.filter(w => w.id !== warningId)
    this.saveWarnings()
  }

  // TRAE INTEGRATION
  async getTraeResumeData(): Promise<any> {
    const state = this.getWorkspaceState()
    const lastBackup = backupService.getLastSuccessfulBackup()
    const criticalWarnings = this.getCriticalWarnings()
    
    return {
      sessionId: state?.sessionId,
      lastActivity: state?.lastActivity,
      lastBackup: lastBackup?.timestamp,
      openFiles: state?.openFiles || [],
      criticalWarnings: criticalWarnings.length,
      autoSaveEnabled: state?.autoSaveEnabled || false,
      canResume: true,
      resumeInstructions: 'Ditt arbete är automatiskt sparat. Klicka för att återgå till där du slutade.'
    }
  }

  // RENSNING OCH UNDERHÅLL
  cleanupOldData(): void {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 90) // 90 dagar
    
    // Rensa gamla varningar
    this.warnings = this.warnings.filter(w => 
      new Date(w.timestamp) >= cutoffDate || w.severity === 'critical'
    )
    
    // Rensa gamla filversioner (behåll senaste 10 per fil)
    for (const [filePath, versions] of this.fileVersions) {
      if (versions.length > 10) {
        this.fileVersions.set(filePath, versions.slice(-10))
      }
    }
    
    this.saveWarnings()
    this.saveFileVersions()
    
    console.log('Gammal data rensad')
  }
}

// GLOBAL INSTANS
export const revisionManager = new RevisionManager()

// API-HANDLERS FÖR REVISIONER
export async function handleRevisionRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  try {
    switch (action) {
      case 'file-history':
        const filePath = searchParams.get('filePath')
        if (!filePath) {
          return new Response(JSON.stringify({ error: 'filePath krävs' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        const history = revisionManager.getFileHistory(filePath)
        return new Response(JSON.stringify({ history }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'warnings':
        const warnings = revisionManager.getAllWarnings()
        return new Response(JSON.stringify({ warnings }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'critical-warnings':
        const criticalWarnings = revisionManager.getCriticalWarnings()
        return new Response(JSON.stringify({ warnings: criticalWarnings }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'workspace-state':
        const state = revisionManager.getWorkspaceState()
        return new Response(JSON.stringify({ state }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'trae-resume':
        const resumeData = await revisionManager.getTraeResumeData()
        return new Response(JSON.stringify(resumeData), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'restore-file':
        const restoreFilePath = searchParams.get('filePath')
        const versionId = searchParams.get('versionId')
        
        if (!restoreFilePath || !versionId) {
          return new Response(JSON.stringify({ error: 'filePath och versionId krävs' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        const success = await revisionManager.restoreFileVersion(restoreFilePath, versionId)
        return new Response(JSON.stringify({ success }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'dismiss-warning':
        const warningId = searchParams.get('warningId')
        if (!warningId) {
          return new Response(JSON.stringify({ error: 'warningId krävs' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        revisionManager.dismissWarning(warningId)
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      default:
        return new Response(JSON.stringify({ error: 'Ogiltig action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export default revisionManager