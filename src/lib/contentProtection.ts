// INNEHÅLLSSKYDD & VARNINGSSYSTEM
// Skyddar användarens kurser, artiklar och produkter mot oavsiktlig borttagning

import { useState, useEffect } from 'react'
import { traeIntegration } from './traeIntegration'

export interface ContentProtectionRule {
  id: string
  type: 'course' | 'article' | 'product' | 'file' | 'navigation'
  pattern: string | RegExp
  action: 'warn' | 'block' | 'require_confirmation'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  enabled: boolean
  bypassAllowed: boolean
  createdAt: string
  lastTriggered?: string
  triggerCount: number
}

export interface ProtectionWarning {
  id: string
  ruleId: string
  contentType: string
  contentId: string
  contentTitle: string
  action: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  acknowledged: boolean
  bypassed: boolean
  userResponse?: 'cancel' | 'proceed' | 'bypass'
}

export interface ProtectedContent {
  id: string
  type: 'course' | 'article' | 'product' | 'file' | 'navigation'
  title: string
  description?: string
  content: any
  createdAt: string
  lastModified: string
  protectionLevel: 'low' | 'medium' | 'high' | 'maximum'
  backupBeforeChange: boolean
  requireConfirmation: boolean
  tags: string[]
  owner: string
  sharedWith: string[]
}

export class ContentProtectionSystem {
  private protectionRules: ContentProtectionRule[] = []
  private protectionWarnings: ProtectionWarning[] = []
  private protectedContent: ProtectedContent[] = []
  private userAcknowledgments: Map<string, string> = new Map()
  private isEnabled = true

  constructor() {
    this.initializeDefaultRules()
    // Lägg till standardregel för navigationslänkar (externa länkar)
    this.addProtectionRule({
      type: 'navigation',
      pattern: /Anti-Aging Space|nhgasocm\.manus\.space|manus\.space|extern|länk/i,
      action: 'require_confirmation',
      message: 'Detta är en navigationslänk (extern). Bekräfta ändringar.',
      severity: 'medium',
      enabled: true,
      bypassAllowed: true
    })
  }

  // Initiera standardregler för skydd
  private initializeDefaultRules(): void {
    const defaultRules: ContentProtectionRule[] = [
      {
        id: 'protect-courses',
        type: 'course',
        pattern: /.*course.*|.*kurs.*/i,
        action: 'require_confirmation',
        message: 'Detta verkar vara en kurs. Är du säker på att du vill ta bort/ändra denna?',
        severity: 'high',
        enabled: true,
        bypassAllowed: true,
        createdAt: new Date().toISOString(),
        triggerCount: 0
      },
      {
        id: 'protect-articles',
        type: 'article',
        pattern: /.*article.*|.*artikel.*/i,
        action: 'require_confirmation',
        message: 'Detta verkar vara en artikel. Vill du verkligen ta bort/ändra denna?',
        severity: 'medium',
        enabled: true,
        bypassAllowed: true,
        createdAt: new Date().toISOString(),
        triggerCount: 0
      },
      {
        id: 'protect-products',
        type: 'product',
        pattern: /.*product.*|.*produkt.*/i,
        action: 'require_confirmation',
        message: 'Detta verkar vara en produkt. Är du säker på att du vill ta bort/ändra denna?',
        severity: 'medium',
        enabled: true,
        bypassAllowed: true,
        createdAt: new Date().toISOString(),
        triggerCount: 0
      },
      {
        id: 'protect-important-files',
        type: 'file',
        pattern: /.*important.*|.*viktig.*|.*critical.*|.*kritisk.*/i,
        action: 'require_confirmation',
        message: 'Detta verkar vara en viktig fil. Vill du verkligen ta bort/ändra denna?',
        severity: 'high',
        enabled: true,
        bypassAllowed: false,
        createdAt: new Date().toISOString(),
        triggerCount: 0
      },
      {
        id: 'protect-config-files',
        type: 'file',
        pattern: /.*config.*|.*configuration.*|.*settings.*|.*inställning.*/i,
        action: 'warn',
        message: 'Detta är en konfigurationsfil. Ändringar kan påverka systemets beteende.',
        severity: 'medium',
        enabled: true,
        bypassAllowed: true,
        createdAt: new Date().toISOString(),
        triggerCount: 0
      }
    ]

    this.protectionRules = defaultRules
  }

  // Kontrollera om innehåll är skyddat
  async checkContentProtection(
    contentType: string,
    contentId: string,
    contentTitle: string,
    action: 'delete' | 'modify' | 'create'
  ): Promise<{
    allowed: boolean
    warning?: ProtectionWarning
    requiresConfirmation: boolean
    canBypass: boolean
  }> {
    if (!this.isEnabled) {
      return { allowed: true, requiresConfirmation: false, canBypass: false }
    }

    // Hitta tillämpliga regler
    const applicableRules = this.protectionRules.filter(rule => 
      rule.enabled && 
      rule.type === contentType && 
      this.matchesPattern(contentTitle, rule.pattern)
    )

    if (applicableRules.length === 0) {
      return { allowed: true, requiresConfirmation: false, canBypass: false }
    }

    // Hitta den mest restriktiva regeln
    const mostRestrictiveRule = applicableRules.reduce((prev, current) => {
      const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 }
      return severityOrder[current.severity] > severityOrder[prev.severity] ? current : prev
    })

    // Skapa varning
    const warning: ProtectionWarning = {
      id: `warning-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ruleId: mostRestrictiveRule.id,
      contentType,
      contentId,
      contentTitle,
      action,
      message: mostRestrictiveRule.message,
      severity: mostRestrictiveRule.severity,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      bypassed: false
    }

    // Uppdatera regelns trigger-räknare
    mostRestrictiveRule.lastTriggered = new Date().toISOString()
    mostRestrictiveRule.triggerCount++

    // Lägg till varningen i historiken
    this.protectionWarnings.push(warning)

    // Bestäm resultat baserat på regelns action
    switch (mostRestrictiveRule.action) {
      case 'block':
        return {
          allowed: false,
          warning,
          requiresConfirmation: false,
          canBypass: mostRestrictiveRule.bypassAllowed
        }

      case 'require_confirmation':
        return {
          allowed: false,
          warning,
          requiresConfirmation: true,
          canBypass: mostRestrictiveRule.bypassAllowed
        }

      case 'warn':
        return {
          allowed: true,
          warning,
          requiresConfirmation: false,
          canBypass: mostRestrictiveRule.bypassAllowed
        }

      default:
        return { allowed: true, requiresConfirmation: false, canBypass: false }
    }
  }

  // Visa varningsdialog
  async showProtectionWarning(warning: ProtectionWarning): Promise<'cancel' | 'proceed' | 'bypass'> {
    const rule = this.protectionRules.find(r => r.id === warning.ruleId)
    
    if (!rule) return 'proceed'

    let message = warning.message + '\n\n'
    
    if (warning.severity === 'critical') {
      message += '⚠️ KRITISK: Detta är en kritisk operation som kan påverka systemets stabilitet.\n\n'
    } else if (warning.severity === 'high') {
      message += '⚠️ VARNING: Detta är en viktig operation.\n\n'
    }

    message += `Innehåll: ${warning.contentTitle}\n`
    message += `Typ: ${warning.contentType}\n`
    message += `Åtgärd: ${warning.action}\n`
    message += `Allvarlighetsgrad: ${warning.severity.toUpperCase()}`

    // Bygg alternativ för användaren
    const options = ['Avbryt', 'Fortsätt']
    
    if (warning.bypassed || rule.bypassAllowed) {
      options.push('Kringgå skydd')
    }

    const choice = await this.showCustomDialog(message, options)
    
    // Uppdatera varningen med användarens svar
    warning.userResponse = choice
    warning.acknowledged = true
    
    if (choice === 'bypass') {
      warning.bypassed = true
    }

    return choice
  }

  // Anpassad dialog (ersätt med riktig UI-komponent i produktion)
  private async showCustomDialog(message: string, options: string[]): Promise<'cancel' | 'proceed' | 'bypass'> {
    // I en riktig implementation skulle detta använda en UI-komponent
    // Här använder vi en enkel confirm-dialog som fallback
    
    const result = window.confirm(message + '\n\nVälj:\nOK = Fortsätt\nAvbryt = Avbryt')
    
    if (!result) return 'cancel'
    
    // För bypass, använd en sekundär confirm
    if (options.includes('Kringgå skydd')) {
      const bypassConfirm = window.confirm('Är du VERKLIGEN säker på att du vill kringgå skyddet? Detta rekommenderas INTE.')
      return bypassConfirm ? 'bypass' : 'cancel'
    }
    
    return 'proceed'
  }

  // Kontrollera om titel matchar mönster
  private matchesPattern(title: string, pattern: string | RegExp): boolean {
    if (typeof pattern === 'string') {
      return title.toLowerCase().includes(pattern.toLowerCase())
    }
    return pattern.test(title)
  }

  // Lägg till skyddat innehåll
  addProtectedContent(content: Omit<ProtectedContent, 'id' | 'createdAt' | 'lastModified'>): ProtectedContent {
    const protectedContent: ProtectedContent = {
      ...content,
      id: `protected-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    this.protectedContent.push(protectedContent)
    return protectedContent
  }

  // Ta bort skyddat innehåll
  removeProtectedContent(contentId: string): boolean {
    const initialLength = this.protectedContent.length
    this.protectedContent = this.protectedContent.filter(content => content.id !== contentId)
    return this.protectedContent.length < initialLength
  }

  // Hämta skyddat innehåll
  getProtectedContent(contentId?: string): ProtectedContent[] {
    if (contentId) {
      return this.protectedContent.filter(content => content.id === contentId)
    }
    return [...this.protectedContent]
  }

  // Lägg till anpassad skyddsregel
  addProtectionRule(rule: Omit<ContentProtectionRule, 'id' | 'createdAt' | 'triggerCount'>): ContentProtectionRule {
    const newRule: ContentProtectionRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      triggerCount: 0
    }

    this.protectionRules.push(newRule)
    return newRule
  }

  // Ta bort skyddsregel
  removeProtectionRule(ruleId: string): boolean {
    const initialLength = this.protectionRules.length
    this.protectionRules = this.protectionRules.filter(rule => rule.id !== ruleId)
    return this.protectionRules.length < initialLength
  }

  // Aktivera/inaktivera skyddsregel
  toggleProtectionRule(ruleId: string, enabled: boolean): boolean {
    const rule = this.protectionRules.find(r => r.id === ruleId)
    if (rule) {
      rule.enabled = enabled
      return true
    }
    return false
  }

  // Hämta alla skyddsregler
  getProtectionRules(): ContentProtectionRule[] {
    return [...this.protectionRules]
  }

  // Hämta alla varningar
  getProtectionWarnings(acknowledged?: boolean): ProtectionWarning[] {
    if (acknowledged !== undefined) {
      return this.protectionWarnings.filter(w => w.acknowledged === acknowledged)
    }
    return [...this.protectionWarnings]
  }

  // Markera varning som erkänd
  acknowledgeWarning(warningId: string): boolean {
    const warning = this.protectionWarnings.find(w => w.id === warningId)
    if (warning) {
      warning.acknowledged = true
      return true
    }
    return false
  }

  // Rensa gamla varningar
  cleanupOldWarnings(maxAge: number = 30 * 24 * 60 * 60 * 1000): number {
    // Ta bort varningar äldre än 30 dagar (standard)
    const cutoffTime = Date.now() - maxAge
    const initialLength = this.protectionWarnings.length
    
    this.protectionWarnings = this.protectionWarnings.filter(warning => {
      const warningTime = new Date(warning.timestamp).getTime()
      return warningTime > cutoffTime
    })

    return initialLength - this.protectionWarnings.length
  }

  // Aktivera/inaktivera hela skyddssystemet
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
    console.log(`Innehållsskydd ${enabled ? 'aktiverat' : 'inaktiverat'}`)
  }

  // Kontrollera om systemet är aktiverat
  isSystemEnabled(): boolean {
    return this.isEnabled
  }

  // Hämta statistik
  getStatistics() {
    return {
      totalRules: this.protectionRules.length,
      enabledRules: this.protectionRules.filter(r => r.enabled).length,
      totalWarnings: this.protectionWarnings.length,
      acknowledgedWarnings: this.protectionWarnings.filter(w => w.acknowledged).length,
      protectedItems: this.protectedContent.length,
      systemEnabled: this.isEnabled,
      mostTriggeredRule: this.protectionRules.reduce((prev, current) => 
        current.triggerCount > prev.triggerCount ? current : prev, 
        this.protectionRules[0] || null
      )
    }
  }

  // Exportera konfiguration
  exportConfiguration() {
    return {
      rules: this.protectionRules,
      protectedContent: this.protectedContent,
      warnings: this.protectionWarnings,
      isEnabled: this.isEnabled,
      exportDate: new Date().toISOString()
    }
  }

  // Importera konfiguration
  importConfiguration(config: any): void {
    if (config.rules) {
      this.protectionRules = config.rules
    }
    if (config.protectedContent) {
      this.protectedContent = config.protectedContent
    }
    if (config.isEnabled !== undefined) {
      this.isEnabled = config.isEnabled
    }
    // Importera inte varningar från backup (de är sessionspecifika)
  }
}

// Skapa global instans
export const contentProtection = new ContentProtectionSystem()

// React Hook för att använda innehållsskydd
export function useContentProtection() {
  const [isEnabled, setIsEnabled] = useState(contentProtection.isSystemEnabled())
  const [statistics, setStatistics] = useState(contentProtection.getStatistics())

  useEffect(() => {
    const updateStatus = () => {
      setIsEnabled(contentProtection.isSystemEnabled())
      setStatistics(contentProtection.getStatistics())
    }

    updateStatus()
    const interval = setInterval(updateStatus, 30000) // Uppdatera var 30:e sekund
    
    return () => clearInterval(interval)
  }, [])

  return {
    contentProtection,
    isEnabled,
    statistics,
    setEnabled: (enabled: boolean) => {
      contentProtection.setEnabled(enabled)
      setIsEnabled(enabled)
    },
    checkContentProtection: contentProtection.checkContentProtection.bind(contentProtection),
    showProtectionWarning: contentProtection.showProtectionWarning.bind(contentProtection)
  }
}

export default contentProtection