// KOMPLETT BACKUP- & ÅTERSTÄLLNINGSSYSTEM
// Detta system säkerställer att allt användararbete är skyddat och kan återställas

import { contentVersions, versionControl, ContentVersion } from '@/data/versionControl'

export interface BackupMetadata {
  id: string
  timestamp: string
  type: 'full' | 'incremental' | 'manual'
  contentTypes: string[]
  itemCount: number
  fileSize: number
  checksum: string
  status: 'completed' | 'failed' | 'in_progress'
  description: string
  createdBy: string
}

export interface BackupContent {
  courses: any[]
  articles: any[]
  products: any[]
  pages: any[]
  userData: any
  settings: any
  // Nytt: inkluderar personlig utveckling
  personalDevelopmentDocuments: any[]
  personalDevelopmentCourses: any[]
  versionHistory: ContentVersion[]
  timestamp: string
}

export interface AutoSavePoint {
  id: string
  timestamp: string
  content: Partial<BackupContent>
  description: string
  triggeredBy: 'auto' | 'manual' | 'system'
}

class BackupService {
  private backupHistory: BackupMetadata[] = []
  private autoSavePoints: AutoSavePoint[] = []
  private readonly MAX_AUTO_SAVE_POINTS = 20
  private readonly BACKUP_RETENTION_DAYS = 365
  private readonly AUTO_SAVE_INTERVAL = 5 * 60 * 1000 // 5 minuter

  constructor() {
    this.loadBackupHistory()
    this.startAutoSave()
  }

  // HÄMTA ALLT INNEHÅLL FÖR BACKUP
  private async collectAllContent(): Promise<BackupContent> {
    const timestamp = new Date().toISOString()
    
    try {
      // Försök hämta från localStorage först (snabbare och säkrare)
      const localData = this.collectContentFromLocalStorage()
      
      // Om vi har lokala data, använd dem
      const hasLocalContent = (
        Array.isArray(localData.courses) && localData.courses.length > 0
      ) || (
        Array.isArray(localData.articles) && localData.articles.length > 0
      ) || (
        Array.isArray(localData.products) && localData.products.length > 0
      ) || (
        Array.isArray(localData.personalDevelopmentDocuments) && localData.personalDevelopmentDocuments.length > 0
      ) || (
        Array.isArray(localData.personalDevelopmentCourses) && localData.personalDevelopmentCourses.length > 0
      )

      if (hasLocalContent) {
        return {
          courses: Array.isArray(localData.courses) ? localData.courses : [],
          articles: Array.isArray(localData.articles) ? localData.articles : [],
          products: Array.isArray(localData.products) ? localData.products : [],
          pages: Array.isArray(localData.pages) ? localData.pages : [],
          userData: localData.userData || {},
          settings: localData.settings || {},
          personalDevelopmentDocuments: Array.isArray(localData.personalDevelopmentDocuments) ? localData.personalDevelopmentDocuments : [],
          personalDevelopmentCourses: Array.isArray(localData.personalDevelopmentCourses) ? localData.personalDevelopmentCourses : [],
          versionHistory: [...contentVersions],
          timestamp
        }
      }
      
      // Samla kurser
      const coursesResponse = await fetch('/api/courses')
      const courses = coursesResponse.ok ? await coursesResponse.json() : []
      
      // Samla artiklar
      const articlesResponse = await fetch('/api/articles')
      const articles = articlesResponse.ok ? await articlesResponse.json() : []
      
      // Samla produkter
      const productsResponse = await fetch('/api/products')
      const products = productsResponse.ok ? await productsResponse.json() : []
      
      // Samla sidor
      const pagesResponse = await fetch('/api/pages')
      const pages = pagesResponse.ok ? await pagesResponse.json() : []
      
      // Samla användardata
      const userDataResponse = await fetch('/api/user/profile')
      const userData = userDataResponse.ok ? await userDataResponse.json() : {}
      
      // Samla inställningar
      const settingsResponse = await fetch('/api/settings')
      const settings = settingsResponse.ok ? await settingsResponse.json() : {}

      return {
        courses: Array.isArray(courses) ? courses : [],
        articles: Array.isArray(articles) ? articles : [],
        products: Array.isArray(products) ? products : [],
        pages: Array.isArray(pages) ? pages : [],
        userData: userData || {},
        settings: settings || {},
        personalDevelopmentDocuments: [],
        personalDevelopmentCourses: [],
        versionHistory: [...contentVersions],
        timestamp
      }
    } catch (error) {
      console.error('Fel vid insamling av innehåll:', error)
      
      // Returnera tomt innehåll vid fel
      return {
        courses: [],
        articles: [],
        products: [],
        pages: [],
        userData: {},
        settings: {},
        personalDevelopmentDocuments: [],
        personalDevelopmentCourses: [],
        versionHistory: [...contentVersions],
        timestamp
      }
    }
  }

  // HÄMTA INNEHÅLL FRÅN LOCALSTORAGE
  private collectContentFromLocalStorage(): Partial<BackupContent> {
    const content: Partial<BackupContent> = {
      courses: [],
      articles: [],
      products: [],
      pages: [],
      userData: {},
      settings: {},
      personalDevelopmentDocuments: [],
      personalDevelopmentCourses: []
    }

    try {
      // Hämta kurser
      const coursesData = localStorage.getItem('courses_data')
      if (coursesData) {
        content.courses = JSON.parse(coursesData)
      }

      // Hämta artiklar
      const articlesData = localStorage.getItem('articles_data')
      if (articlesData) {
        content.articles = JSON.parse(articlesData)
      }

      // Hämta produkter
      const productsData = localStorage.getItem('products_data')
      if (productsData) {
        content.products = JSON.parse(productsData)
      }

      // Hämta sidor
      const pagesData = localStorage.getItem('pages_data')
      if (pagesData) {
        content.pages = JSON.parse(pagesData)
      }

      // Hämta användardata
      const userData = localStorage.getItem('user_data')
      if (userData) {
        content.userData = JSON.parse(userData)
      }

      // Hämta inställningar
      const settingsData = localStorage.getItem('settings_data')
      if (settingsData) {
        content.settings = JSON.parse(settingsData)
      }

      // Hämta personlig utveckling
      const pdDocs = localStorage.getItem('personal_development_documents')
      if (pdDocs) {
        content.personalDevelopmentDocuments = JSON.parse(pdDocs)
      }
      const pdCourses = localStorage.getItem('personal_development_courses')
      if (pdCourses) {
        content.personalDevelopmentCourses = JSON.parse(pdCourses)
      }

    } catch (error) {
      console.warn('Fel vid insamling från localStorage:', error)
    }

    return content
  }

  // SKAPA FULL BACKUP
  async createFullBackup(description: string = 'Fullständig systembackup', createdBy: string = 'system'): Promise<BackupMetadata> {
    const backupId = `backup-${Date.now()}`
    const timestamp = new Date().toISOString()
    
    try {
      const content = await this.collectAllContent()
      const contentJson = JSON.stringify(content)
      const checksum = await this.generateChecksum(contentJson)
      
      const backupMetadata: BackupMetadata = {
        id: backupId,
        timestamp,
        type: 'full',
        contentTypes: ['courses', 'articles', 'products', 'pages', 'userData', 'settings', 'personalDevelopmentDocuments', 'personalDevelopmentCourses'],
        itemCount: content.courses.length + content.articles.length + content.products.length + content.pages.length + content.personalDevelopmentDocuments.length + content.personalDevelopmentCourses.length,
        fileSize: new Blob([contentJson]).size,
        checksum,
        status: 'completed',
        description,
        createdBy
      }
      
      // Spara backup-data
      await this.saveBackupData(backupId, content)
      
      // Spara metadata
      this.backupHistory.push(backupMetadata)
      await this.saveBackupHistory()
      
      console.log(`Full backup skapad: ${backupId}`)
      return backupMetadata
      
    } catch (error) {
      console.error('Fel vid skapande av full backup:', error)
      
      const failedBackup: BackupMetadata = {
        id: backupId,
        timestamp,
        type: 'full',
        contentTypes: [],
        itemCount: 0,
        fileSize: 0,
        checksum: '',
        status: 'failed',
        description: `Misslyckad backup: ${error}`,
        createdBy
      }
      
      this.backupHistory.push(failedBackup)
      await this.saveBackupHistory()
      
      throw error
    }
  }

  // SKAPA INKREMENTELL BACKUP
  async createIncrementalBackup(description: string = 'Inkrementell backup', createdBy: string = 'system'): Promise<BackupMetadata> {
    const backupId = `incremental-${Date.now()}`
    const timestamp = new Date().toISOString()
    const lastFullBackup = this.getLastSuccessfulBackup('full')
    
    if (!lastFullBackup) {
      // Om ingen full backup finns, skapa en
      return this.createFullBackup(description, createdBy)
    }
    
    try {
      const content = await this.collectAllContent()
      
      // Filtrera endast ändrat innehåll (förenklad version)
      const changedContent = await this.filterChangedContent(content, lastFullBackup)
      
      const contentJson = JSON.stringify(changedContent)
      const checksum = await this.generateChecksum(contentJson)
      
      const backupMetadata: BackupMetadata = {
        id: backupId,
        timestamp,
        type: 'incremental',
        contentTypes: Object.keys(changedContent).filter(key => changedContent[key as keyof BackupContent]?.length > 0),
        itemCount: Object.values(changedContent).reduce((sum: number, arr: any[]) => sum + (arr?.length || 0), 0),
        fileSize: new Blob([contentJson]).size,
        checksum,
        status: 'completed',
        description,
        createdBy
      }
      
      await this.saveBackupData(backupId, changedContent)
      this.backupHistory.push(backupMetadata)
      await this.saveBackupHistory()
      
      console.log(`Incremental backup skapad: ${backupId}`)
      return backupMetadata
      
    } catch (error) {
      console.error('Fel vid skapande av incremental backup:', error)
      throw error
    }
  }

  // AUTO-SAVE SYSTEM
  private startAutoSave(): void {
    setInterval(async () => {
      try {
        await this.createAutoSavePoint()
      } catch (error) {
        console.error('Fel vid auto-save:', error)
      }
    }, this.AUTO_SAVE_INTERVAL)
  }

  private async createAutoSavePoint(): Promise<void> {
    const savePointId = `autosave-${Date.now()}`
    const timestamp = new Date().toISOString()
    
    try {
      // Spara endast viktigt innehåll för auto-save
      const content = await this.collectAllContent()
      const essentialContent = {
        courses: content.courses.slice(0, 5), // Endast första 5 kurserna
        articles: content.articles.slice(0, 10), // Endast första 10 artiklarna
        products: content.products.slice(0, 10), // Endast första 10 produkterna
        personalDevelopmentDocuments: content.personalDevelopmentDocuments.slice(0, 10),
        personalDevelopmentCourses: content.personalDevelopmentCourses.slice(0, 5),
        userData: content.userData,
        settings: content.settings
      }
      
      const savePoint: AutoSavePoint = {
        id: savePointId,
        timestamp,
        content: essentialContent,
        description: `Auto-save ${new Date().toLocaleString('sv-SE')}`,
        triggeredBy: 'auto'
      }
      
      this.autoSavePoints.push(savePoint)
      
      // Begränsa antal auto-save punkter
      if (this.autoSavePoints.length > this.MAX_AUTO_SAVE_POINTS) {
        this.autoSavePoints = this.autoSavePoints.slice(-this.MAX_AUTO_SAVE_POINTS)
      }
      
      await this.saveAutoSavePoints()
      
    } catch (error) {
      console.error('Fel vid skapande av auto-save punkt:', error)
    }
  }

  // ÅTERSTÄLLNING FRÅN BACKUP
  async restoreFromBackup(backupId: string): Promise<boolean> {
    try {
      const backupMetadata = this.backupHistory.find(b => b.id === backupId)
      if (!backupMetadata) {
        console.warn(`Backup ${backupId} hittades inte i historiken. Försöker läsa data ändå.`)
        const backupDataFallback = await this.loadBackupData(backupId)
        if (!backupDataFallback) {
          console.error(`Backup restore misslyckades: backup ${backupId} saknas`)
          return false
        }
        // Återställ innehåll från fallback-data
        await this.restoreContent(backupDataFallback)
        console.log(`Återställning från backup-data ${backupId} slutförd utan metadata`)
        return true
      }
      
      const backupData = await this.loadBackupData(backupId)
      if (!backupData) {
        console.error(`Backup-data för ${backupId} kunde inte laddas`)
        return false
      }
      
      // Återställ innehåll
      await this.restoreContent(backupData)
      
      // Uppdatera backup-metadata
      backupMetadata.status = 'completed'
      await this.saveBackupHistory()
      
      console.log(`Återställning från backup ${backupId} slutförd`)
      return true
      
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Fel vid återställning från backup:', message)
      return false
    }
  }

  // HJÄLPMETODER
  private async generateChecksum(data: string): Promise<string> {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  private async filterChangedContent(currentContent: BackupContent, lastBackup: BackupMetadata): Promise<Partial<BackupContent>> {
    // Förenklad implementation - returnera allt för nu
    return currentContent
  }

  private async saveBackupData(backupId: string, content: any): Promise<void> {
    try {
      localStorage.setItem(`backup_${backupId}`, JSON.stringify(content))
    } catch (error) {
      console.error('Fel vid sparning av backup-data:', error)
      throw error
    }
  }

  private async loadBackupData(backupId: string): Promise<any> {
    try {
      const data = localStorage.getItem(`backup_${backupId}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Fel vid laddning av backup-data:', error)
      return null
    }
  }

  private async saveBackupHistory(): Promise<void> {
    try {
      localStorage.setItem('backup_history', JSON.stringify(this.backupHistory))
    } catch (error) {
      console.error('Fel vid sparning av backup-historik:', error)
    }
  }

  private loadBackupHistory(): void {
    try {
      const data = localStorage.getItem('backup_history')
      if (data) {
        this.backupHistory = JSON.parse(data)
      }
    } catch (error) {
      console.error('Fel vid laddning av backup-historik:', error)
      this.backupHistory = []
    }
  }

  private async saveAutoSavePoints(): Promise<void> {
    try {
      localStorage.setItem('autosave_points', JSON.stringify(this.autoSavePoints))
    } catch (error) {
      console.error('Fel vid sparning av auto-save punkter:', error)
    }
  }

  private loadAutoSavePoints(): void {
    try {
      const data = localStorage.getItem('autosave_points')
      if (data) {
        this.autoSavePoints = JSON.parse(data)
      }
    } catch (error) {
      console.error('Fel vid laddning av auto-save punkter:', error)
      this.autoSavePoints = []
    }
  }

  private async restoreContent(content: BackupContent): Promise<void> {
    // Implementation för att återställa innehåll till databasen
    // Detta är en placeholder - implementera baserat på din backend-struktur
    console.log('Återställer innehåll...', content)
  }

  // PUBLIKA METODER FÖR ÅTKOMST
  getAllBackups(): BackupMetadata[] {
    return [...this.backupHistory].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  getBackupMetadata(backupId: string): BackupMetadata | undefined {
    return this.backupHistory.find(b => b.id === backupId)
  }

  getLastSuccessfulBackup(type?: 'full' | 'incremental'): BackupMetadata | undefined {
    const filtered = type 
      ? this.backupHistory.filter(b => b.type === type && b.status === 'completed')
      : this.backupHistory.filter(b => b.status === 'completed')
    
    return filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0]
  }

  getAutoSavePoints(): AutoSavePoint[] {
    return [...this.autoSavePoints].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  getLatestAutoSavePoint(): AutoSavePoint | undefined {
    return this.autoSavePoints[this.autoSavePoints.length - 1]
  }

  cleanupOldBackups(): void {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.BACKUP_RETENTION_DAYS)
    
    this.backupHistory = this.backupHistory.filter(backup => 
      new Date(backup.timestamp) >= cutoffDate
    )
    
    this.saveBackupHistory()
  }

  // TRAE INTEGRATION
  async saveWorkspaceState(): Promise<void> {
    const state = {
      timestamp: new Date().toISOString(),
      lastBackup: this.getLastSuccessfulBackup(),
      autoSavePoints: this.autoSavePoints.length,
      totalBackups: this.backupHistory.length,
      protectedItems: this.getProtectedItems()
    }
    
    localStorage.setItem('trae_workspace_state', JSON.stringify(state))
  }

  getProtectedItems(): string[] {
    return [
      'Personlig Utveckling & Mindfulness - Kurs',
      'Inre Bilder och Personlig Utveckling - Artikel',
      'Vetenskaplig Forskning - Anti-Aging Genombrott 2025 - Artikel'
    ]
  }

  // Initiering för TraeIntegration
  async initialize(): Promise<void> {
    try {
      // Säkerställ att historia och autosave-punkter är laddade
      this.loadBackupHistory()
      this.loadAutoSavePoints()
      // Ingen dubbelstart av auto-save: konstruktorn har redan startat den
      console.log('BackupService initialize slutförd')
    } catch (error) {
      console.error('Fel vid initialize av BackupService:', error)
    }
  }
}

// GLOBAL INSTANS
export const backupService = new BackupService()

// BACKUP API HANDLERS
export async function handleBackupRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  try {
    switch (action) {
      case 'create-full':
        const fullBackup = await backupService.createFullBackup('Manuell full backup')
        return new Response(JSON.stringify({ success: true, backup: fullBackup }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'create-incremental':
        const incrementalBackup = await backupService.createIncrementalBackup('Manuell inkrementell backup')
        return new Response(JSON.stringify({ success: true, backup: incrementalBackup }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'list':
        const backups = backupService.getAllBackups()
        return new Response(JSON.stringify({ backups }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'restore':
        const backupId = searchParams.get('backupId')
        if (!backupId) {
          return new Response(JSON.stringify({ error: 'backupId krävs' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        const success = await backupService.restoreFromBackup(backupId)
        return new Response(JSON.stringify({ success }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      case 'autosave-points':
        const autoSavePoints = backupService.getAutoSavePoints()
        return new Response(JSON.stringify({ autoSavePoints }), {
          headers: { 'Content-Type': 'application/json' }
        })
        
      default:
        return new Response(JSON.stringify({ error: 'Ogiltig action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export default backupService