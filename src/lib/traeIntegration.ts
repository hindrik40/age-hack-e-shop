// TRAE WORKSPACE INTEGRATION
// Hanterar automatisk återställning av senaste arbetsläge vid omstart

import { restoreManager } from './restoreManager'
import { backupService } from './backupService'
import { revisionManager } from './revisionManager'
import { useState, useEffect } from 'react'

export interface WorkspaceState {
  lastActiveTime: string
  activeTab: string
  openFiles: string[]
  currentProject: string
  lastModifiedFiles: string[]
  userPreferences: Record<string, any>
  sessionDuration: number
  autoSaveEnabled: boolean
  backupEnabled: boolean
  warningsAcknowledged: string[]
  lastBackupId: string | null
  lastRestorePointId: string | null
  protectedContentEnabled: boolean
  revisionHistoryEnabled: boolean
}

export interface TraeIntegrationConfig {
  autoRestoreOnStartup: boolean
  createBackupOnExit: boolean
  warnBeforeExit: boolean
  saveWorkspaceState: boolean
  restoreLastPosition: boolean
  enableAutoSave: boolean
  enableRevisionTracking: boolean
  maxSessionDuration: number // minuter
  backupInterval: number // minuter
  autoSaveInterval: number // minuter
}

export class TraeWorkspaceIntegration {
  private config: TraeIntegrationConfig
  private workspaceState: WorkspaceState
  private sessionStartTime: number
  private autoSaveTimer: NodeJS.Timeout | null = null
  private backupTimer: NodeJS.Timeout | null = null
  private isInitialized = false
  private isShuttingDown = false

  constructor(config: Partial<TraeIntegrationConfig> = {}) {
    this.config = {
      autoRestoreOnStartup: true,
      createBackupOnExit: true,
      warnBeforeExit: true,
      saveWorkspaceState: true,
      restoreLastPosition: true,
      enableAutoSave: true,
      enableRevisionTracking: true,
      maxSessionDuration: 480, // 8 timmar
      backupInterval: 60, // 1 timme
      autoSaveInterval: 5, // 5 minuter
      ...config
    }

    this.sessionStartTime = Date.now()
    this.workspaceState = this.loadWorkspaceState()
  }

  // Initiera Trae-integrationen
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      console.log('🔄 Initialiserar Trae Workspace Integration...')

      // Starta revision manager om aktiverat
      if (this.config.enableRevisionTracking) {
        await revisionManager.initialize()
        console.log('✅ Revision manager initierad')
      }

      // Starta backup service om aktiverat
      if (this.config.enableAutoSave) {
        await backupService.initialize()
        console.log('✅ Backup service initierad')
      }

      // Återställ senaste läge om konfigurerat
      if (this.config.autoRestoreOnStartup && this.config.restoreLastPosition) {
        await this.restoreLastWorkspaceState()
      }

      // Starta timers
      this.startAutoSaveTimer()
      this.startBackupTimer()

      // Registrera event listeners
      this.registerEventListeners()

      this.isInitialized = true
      console.log('✅ Trae Workspace Integration initierad framgångsrikt!')

    } catch (error) {
      console.error('❌ Fel vid initiering av Trae Workspace Integration:', error)
      throw error
    }
  }

  // Stäng ner integrationen på ett säkert sätt
  async shutdown(): Promise<void> {
    if (this.isShuttingDown) return
    
    this.isShuttingDown = true
    console.log('🔄 Stänger ner Trae Workspace Integration...')

    try {
      // Stoppa timers
      this.stopAutoSaveTimer()
      this.stopBackupTimer()

      // Skapa backup vid avslut om konfigurerat
      if (this.config.createBackupOnExit) {
        await this.createExitBackup()
      }

      // Spara workspace-state
      if (this.config.saveWorkspaceState) {
        await this.saveCurrentWorkspaceState()
      }

      // Avregistrera event listeners
      this.unregisterEventListeners()

      console.log('✅ Trae Workspace Integration stängd framgångsrikt!')

    } catch (error) {
      console.error('❌ Fel vid nedstängning av Trae Workspace Integration:', error)
      throw error
    } finally {
      this.isShuttingDown = false
      this.isInitialized = false
    }
  }

  // Återställ senaste workspace-state
  private async restoreLastWorkspaceState(): Promise<void> {
    try {
      const lastState = this.workspaceState
      
      if (!lastState.lastRestorePointId && !lastState.lastBackupId) {
        console.log('ℹ️ Ingen tidigare session hittad, börjar ny session')
        return
      }

      // Validera att ID:n faktiskt finns innan försök
      const available = await restoreManager.getAvailableRestorePoints()
      const knownIds = new Set(available.map(rp => rp.id).concat(
        available.map(rp => (rp as any).metadata?.id).filter(Boolean) as string[]
      ))

      const restoreId = lastState.lastRestorePointId
      const backupId = lastState.lastBackupId

      const validRestoreId = restoreId && knownIds.has(restoreId) ? restoreId : null
      const validBackupId = backupId && knownIds.has(backupId) ? backupId : null

      if (!validRestoreId && restoreId) {
        console.warn(`Ignorerar ogiltig restorePointId: ${restoreId}. Rensar referens.`)
        this.workspaceState.lastRestorePointId = null
      }

      if (!validBackupId && backupId) {
        console.warn(`Ignorerar ogiltig backupId: ${backupId}. Rensar referens.`)
        this.workspaceState.lastBackupId = null
      }

      console.log('🔄 Återställer senaste workspace-state...')

      // Försök återställa från senaste giltiga restore point
      if (validRestoreId) {
        const restoreResult = await restoreManager.performRestore(validRestoreId, {
          createBackupBeforeRestore: false,
          dryRun: false
        })

        if (restoreResult.success) {
          console.log('✅ Återställning från senaste restore point slutförd')
          return
        } else {
          console.warn('⚠️ Återställning från restore point misslyckades:', restoreResult.errors)
        }
      }

      // Försök återställa från senaste giltiga backup
      if (validBackupId) {
        const restoreResult = await restoreManager.performRestore(validBackupId, {
          createBackupBeforeRestore: false,
          dryRun: false
        })

        if (restoreResult.success) {
          console.log('✅ Återställning från senaste backup slutförd')
          return
        } else {
          console.warn('⚠️ Återställning från backup misslyckades:', restoreResult.errors)
        }
      }

      console.log('⚠️ Kunde inte återställa från tidigare session, börjar ny session')

    } catch (error) {
      console.error('❌ Fel vid återställning av workspace-state:', error)
      // Fortsätt med ny session om återställning misslyckas
    } finally {
      // Spara uppdaterat state utan ogiltiga referenser
      try {
        localStorage.setItem('trae-workspace-state', JSON.stringify(this.workspaceState))
      } catch {}
    }
  }

  // Spara nuvarande workspace-state
  private async saveCurrentWorkspaceState(): Promise<void> {
    try {
      const currentState: WorkspaceState = {
        ...this.workspaceState,
        lastActiveTime: new Date().toISOString(),
        sessionDuration: this.getSessionDuration(),
        lastModifiedFiles: typeof (revisionManager as any).getRecentlyModifiedFiles === 'function'
          ? revisionManager.getRecentlyModifiedFiles()
          : [],
        lastBackupId: backupService.getLastSuccessfulBackup()?.id || null,
        lastRestorePointId: restoreManager.getLatestRestorePoint()?.id || null
      }

      localStorage.setItem('trae-workspace-state', JSON.stringify(currentState))
      this.workspaceState = currentState

      console.log('✅ Workspace-state sparad')

    } catch (error) {
      console.error('❌ Fel vid sparning av workspace-state:', error)
    }
  }

  // Ladda workspace-state från localStorage
  private loadWorkspaceState(): WorkspaceState {
    try {
      const saved = localStorage.getItem('trae-workspace-state')
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          lastActiveTime: parsed.lastActiveTime || new Date().toISOString(),
          activeTab: parsed.activeTab || 'courses',
          openFiles: parsed.openFiles || [],
          currentProject: parsed.currentProject || 'e-shop',
          lastModifiedFiles: parsed.lastModifiedFiles || [],
          userPreferences: parsed.userPreferences || {},
          sessionDuration: parsed.sessionDuration || 0,
          autoSaveEnabled: parsed.autoSaveEnabled ?? true,
          backupEnabled: parsed.backupEnabled ?? true,
          warningsAcknowledged: parsed.warningsAcknowledged || [],
          lastBackupId: parsed.lastBackupId || null,
          lastRestorePointId: parsed.lastRestorePointId || null,
          protectedContentEnabled: parsed.protectedContentEnabled ?? true,
          revisionHistoryEnabled: parsed.revisionHistoryEnabled ?? true
        }
      }
    } catch (error) {
      console.error('❌ Fel vid laddning av workspace-state:', error)
    }

    // Returnera standardvärden om inget sparat state finns
    return {
      lastActiveTime: new Date().toISOString(),
      activeTab: 'courses',
      openFiles: [],
      currentProject: 'e-shop',
      lastModifiedFiles: [],
      userPreferences: {},
      sessionDuration: 0,
      autoSaveEnabled: true,
      backupEnabled: true,
      warningsAcknowledged: [],
      lastBackupId: null,
      lastRestorePointId: null,
      protectedContentEnabled: true,
      revisionHistoryEnabled: true
    }
  }

  // Skapa backup vid avslut
  private async createExitBackup(): Promise<void> {
    try {
      console.log('🔄 Skapar backup vid avslut...')
      
      const backup = await backupService.createFullBackup(
        `Automatisk backup vid avslut - Session: ${Math.round(this.getSessionDuration() / 60)}h`,
        'auto-exit'
      )

      console.log(`✅ Exit backup skapad: ${backup.id}`)

    } catch (error) {
      console.error('❌ Fel vid skapning av exit backup:', error)
    }
  }

  // Starta auto-save timer
  private startAutoSaveTimer(): void {
    if (!this.config.enableAutoSave) return

    this.stopAutoSaveTimer() // Stoppa befintlig timer

    this.autoSaveTimer = setInterval(async () => {
      if (!this.isShuttingDown) {
        await this.performAutoSave()
      }
    }, this.config.autoSaveInterval * 60 * 1000) // Konvertera minuter till millisekunder

    console.log(`✅ Auto-save timer startad (${this.config.autoSaveInterval} min)`)
  }

  // Stoppa auto-save timer
  private stopAutoSaveTimer(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer)
      this.autoSaveTimer = null
      console.log('⏹️ Auto-save timer stoppad')
    }
  }

  // Starta backup timer
  private startBackupTimer(): void {
    if (!this.config.enableAutoSave) return

    this.stopBackupTimer() // Stoppa befintlig timer

    this.backupTimer = setInterval(async () => {
      if (!this.isShuttingDown) {
        await this.performScheduledBackup()
      }
    }, this.config.backupInterval * 60 * 1000) // Konvertera minuter till millisekunder

    console.log(`✅ Backup timer startad (${this.config.backupInterval} min)`)
  }

  // Stoppa backup timer
  private stopBackupTimer(): void {
    if (this.backupTimer) {
      clearInterval(this.backupTimer)
      this.backupTimer = null
      console.log('⏹️ Backup timer stoppad')
    }
  }

  // Utför auto-save
  private async performAutoSave(): Promise<void> {
    try {
      console.log('🔄 Utför auto-save...')
      
      // Spara workspace-state
      await this.saveCurrentWorkspaceState()
      
      // Skapa autosave-restore point
      await restoreManager.createAutosavePoint('Automatisk sparning')
      
      console.log('✅ Auto-save slutförd')

    } catch (error) {
      console.error('❌ Fel vid auto-save:', error)
    }
  }

  // Utför schemalagd backup
  private async performScheduledBackup(): Promise<void> {
    try {
      console.log('🔄 Utför schemalagd backup...')
      
      const backup = await backupService.createFullBackup(
        `Schemalagd backup - ${new Date().toLocaleString('sv-SE')}`,
        'scheduled'
      )

      console.log(`✅ Schemalagd backup slutförd: ${backup.id}`)

    } catch (error) {
      console.error('❌ Fel vid schemalagd backup:', error)
    }
  }

  // Registrera event listeners
  private registerEventListeners(): void {
    // Hantera sidavslut
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    
    // Hantera synlighetsändringar (tab/window focus)
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    
    // Hantera fokus/förlust av fokus
    window.addEventListener('focus', this.handleFocus)
    window.addEventListener('blur', this.handleBlur)
  }

  // Avregistrera event listeners
  private unregisterEventListeners(): void {
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    window.removeEventListener('focus', this.handleFocus)
    window.removeEventListener('blur', this.handleBlur)
  }

  // Hantera innan sidan stängs
  private handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    if (this.config.warnBeforeExit && !this.isShuttingDown) {
      const hasUnsavedChanges = revisionManager.hasUnsavedChanges()
      
      if (hasUnsavedChanges) {
        event.preventDefault()
        event.returnValue = 'Du har osparade ändringar. Är du säker på att du vill lämna sidan?'
      }
    }
  }

  // Hantera synlighetsändringar
  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      // Sidan är dold - pausa timers och spara state
      console.log('🔄 Sidan dold - pausar timers')
      this.stopAutoSaveTimer()
      this.stopBackupTimer()
      this.saveCurrentWorkspaceState()
    } else {
      // Sidan är synlig igen - starta om timers
      console.log('🔄 Sidan synlig - startar timers')
      this.startAutoSaveTimer()
      this.startBackupTimer()
    }
  }

  // Hantera fokus
  private handleFocus = (): void => {
    console.log('🔄 Fönster fick fokus')
    // Kan användas för att synkronisera data eller uppdatera UI
  }

  // Hantera förlust av fokus
  private handleBlur = (): void => {
    console.log('🔄 Fönster tappade fokus')
    // Spara state när användaren lämnar fönstret
    this.saveCurrentWorkspaceState()
  }

  // Hjälpmetoder
  private getSessionDuration(): number {
    return Math.floor((Date.now() - this.sessionStartTime) / 1000) // Sekunder
  }

  // Publika metoder för extern användning
  
  async forceAutoSave(): Promise<void> {
    await this.performAutoSave()
  }

  async forceBackup(): Promise<void> {
    await this.performScheduledBackup()
  }

  getWorkspaceState(): WorkspaceState {
    return { ...this.workspaceState }
  }

  updateConfig(newConfig: Partial<TraeIntegrationConfig>): void {
    this.config = { ...this.config, ...newConfig }
    
    // Om vissa inställningar ändras, starta om relevanta tjänster
    if ('autoSaveInterval' in newConfig || 'enableAutoSave' in newConfig) {
      this.startAutoSaveTimer()
    }
    
    if ('backupInterval' in newConfig) {
      this.startBackupTimer()
    }
  }

  isSystemHealthy(): boolean {
    return this.isInitialized && !this.isShuttingDown
  }

  getSystemStatus() {
    return {
      initialized: this.isInitialized,
      shuttingDown: this.isShuttingDown,
      sessionDuration: this.getSessionDuration(),
      autoSaveActive: this.config.enableAutoSave,
      backupActive: this.config.enableAutoSave,
      revisionTracking: this.config.enableRevisionTracking,
      lastActiveTime: this.workspaceState.lastActiveTime
    }
  }
}

// Skapa global instans
export const traeIntegration = new TraeWorkspaceIntegration()

// React Hook för att använda Trae-integration
export function useTraeIntegration() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [systemStatus, setSystemStatus] = useState(traeIntegration.getSystemStatus())

  useEffect(() => {
    const initialize = async () => {
      if (!isInitialized) {
        try {
          await traeIntegration.initialize()
          setIsInitialized(true)
          setSystemStatus(traeIntegration.getSystemStatus())
        } catch (error) {
          console.error('Fel vid initiering av Trae-integration:', error)
        }
      }
    }

    initialize()

    // Uppdatera status regelbundet
    const statusInterval = setInterval(() => {
      setSystemStatus(traeIntegration.getSystemStatus())
    }, 5000)

    // Stäng ner vid unmount
    return () => {
      clearInterval(statusInterval)
      traeIntegration.shutdown()
    }
  }, [])

  return {
    traeIntegration,
    isInitialized,
    systemStatus,
    forceAutoSave: () => traeIntegration.forceAutoSave(),
    forceBackup: () => traeIntegration.forceBackup(),
    updateConfig: (config: Partial<TraeIntegrationConfig>) => traeIntegration.updateConfig(config)
  }
}

export default traeIntegration