// VERSIONSHANTERINGSSYSTEM FÖR ALLT INNEHÅLL
// Detta system säkerställer att vi alltid kan gå tillbaka till fungerande versioner

export interface ContentVersion {
  id: string
  contentType: 'course' | 'article' | 'product' | 'page'
  itemId: string | number
  title: string
  version: string
  revision: number
  timestamp: string
  author: string
  changes: string[]
  content: any
  status: 'draft' | 'published' | 'archived'
  backupDate: string
}

export interface VersionControlConfig {
  maxVersionsPerItem: number
  autoBackupOnChange: boolean
  requireApprovalForProtectedContent: boolean
  retentionDays: number
  notifyOnChanges: boolean
}

export const versionControlConfig: VersionControlConfig = {
  maxVersionsPerItem: 10,
  autoBackupOnChange: true,
  requireApprovalForProtectedContent: true,
  retentionDays: 365,
  notifyOnChanges: true
}

// Versionshistorik för alla typer av innehåll
export const contentVersions: ContentVersion[] = [
  // Kurser
  {
    id: 'course-1-v1',
    contentType: 'course',
    itemId: 1,
    title: 'Anti-Aging Grundkurs',
    version: '1.0',
    revision: 1,
    timestamp: '2024-12-01T10:00:00Z',
    author: 'System',
    changes: ['Initial version skapad'],
    content: { /* komplett kursinnehåll */ },
    status: 'published',
    backupDate: '2024-12-01T10:00:00Z'
  },
  {
    id: 'course-3-v1',
    contentType: 'course',
    itemId: 3,
    title: 'Personlig Utveckling & Mindfulness',
    version: '1.0',
    revision: 1,
    timestamp: '2024-11-28T14:30:00Z',
    author: 'System',
    changes: ['Personlig Utveckling kurs med Inre Bilder skapad'],
    content: {
      title: 'Personlig Utveckling med Inre Bilder',
      description: 'En transformerande kurs i personlig utveckling med fokus på inre bilder och mental träning',
      duration: '8 veckor',
      price: 4500,
      features: [
        'Mental träning med inre bilder',
        'Guidade meditationer',
        'Personlig coachning',
        'Kursmaterial och övningar',
        'Certifikat efter genomförd kurs'
      ],
      schedule: [
        { week: 1, title: 'Introduktion till Inre Bilder', description: 'Grundläggande tekniker för mental visualisering' },
        { week: 2, title: 'Personlig Målsättning', description: 'Skapa tydliga målbilder för personlig utveckling' },
        { week: 3, title: 'Stresshantering', description: 'Använd inre bilder för att reducera stress' },
        { week: 4, title: 'Självförtroende', description: 'Bygg starka positiva självbilder' },
        { week: 5, title: 'Relationsförbättring', description: 'Förbättra relationer genom mental träning' },
        { week: 6, title: 'Kreativitet och Innovation', description: 'Frigör kreativ potential genom visualisering' },
        { week: 7, title: 'Hälsa och Välbefinnande', description: 'Mental träning för fysisk och mental hälsa' },
        { week: 8, title: 'Integration och Framtid', description: 'Integrera teknikerna i det dagliga livet' }
      ]
    },
    status: 'published',
    backupDate: '2024-11-28T14:30:00Z'
  },
  
  // Artiklar
  {
    id: 'article-1-v1',
    contentType: 'article',
    itemId: 1,
    title: 'Vetenskaplig Forskning - Anti-Aging Genombrott 2025',
    version: '1.0',
    revision: 1,
    timestamp: '2024-12-01T09:00:00Z',
    author: 'System',
    changes: ['Artikel om anti-aging forskning skapad'],
    content: { /* komplett artikelinnehåll */ },
    status: 'published',
    backupDate: '2024-12-01T09:00:00Z'
  },
  {
    id: 'article-2-v1',
    contentType: 'article',
    itemId: 2,
    title: 'Inre Bilder och Personlig Utveckling - Vetenskaplig Grund',
    version: '1.0',
    revision: 1,
    timestamp: '2024-11-28T11:15:00Z',
    author: 'System',
    changes: ['Artikel om inre bilder och personlig utveckling skapad'],
    content: { /* komplett artikelinnehåll */ },
    status: 'published',
    backupDate: '2024-11-28T11:15:00Z'
  }
]

// Hjälpfunktioner för versionshantering
export const versionControl = {
  // Skapa ny version
  createVersion: (contentType: string, itemId: string | number, title: string, content: any, changes: string[], author: string = 'System'): ContentVersion => {
    const now = new Date().toISOString()
    const existingVersions = contentVersions.filter(v => v.contentType === contentType && v.itemId === itemId)
    const nextRevision = existingVersions.length > 0 ? Math.max(...existingVersions.map(v => v.revision)) + 1 : 1
    
    const newVersion: ContentVersion = {
      id: `${contentType}-${itemId}-v${nextRevision}`,
      contentType: contentType as any,
      itemId,
      title,
      version: `1.${nextRevision}`,
      revision: nextRevision,
      timestamp: now,
      author,
      changes,
      content,
      status: 'draft',
      backupDate: now
    }
    
    contentVersions.push(newVersion)
    return newVersion
  },

  // Hämta senaste version
  getLatestVersion: (contentType: string, itemId: string | number): ContentVersion | undefined => {
    const versions = contentVersions
      .filter(v => v.contentType === contentType && v.itemId === itemId)
      .sort((a, b) => b.revision - a.revision)
    
    return versions[0]
  },

  // Hämta alla versioner för ett objekt
  getAllVersions: (contentType: string, itemId: string | number): ContentVersion[] => {
    return contentVersions
      .filter(v => v.contentType === contentType && v.itemId === itemId)
      .sort((a, b) => b.revision - a.revision)
  },

  // Återställ till specifik version
  restoreVersion: (versionId: string): ContentVersion | undefined => {
    const version = contentVersions.find(v => v.id === versionId)
    if (version) {
      version.status = 'published'
      version.backupDate = new Date().toISOString()
      return version
    }
    return undefined
  },

  // Rensa gamla versioner
  cleanupOldVersions: (maxAgeDays: number = 365): void => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays)
    
    const toRemove = contentVersions.filter(v => 
      new Date(v.timestamp) < cutoffDate && v.status === 'archived'
    )
    
    toRemove.forEach(version => {
      const index = contentVersions.indexOf(version)
      if (index > -1) {
        contentVersions.splice(index, 1)
      }
    })
  }
}

// Skyddad innehållshantering
export const protectedContent = {
  // Lista över skyddat innehåll
  protectedItems: [
    { type: 'course', id: 3, title: 'Personlig Utveckling & Mindfulness', reason: 'Användarens originalkurs med Inre Bilder' },
    { type: 'article', id: 2, title: 'Inre Bilder och Personlig Utveckling - Vetenskaplig Grund', reason: 'Användarens originalartikel' },
    { type: 'article', id: 1, title: 'Vetenskaplig Forskning - Anti-Aging Genombrott 2025', reason: 'Viktig vetenskaplig artikel' }
  ],

  // Kontrollera om innehåll är skyddat
  isProtected: (contentType: string, itemId: string | number): boolean => {
    return protectedContent.protectedItems.some(item => 
      item.type === contentType && item.id === itemId
    )
  },

  // Kräv godkännande för ändringar
  requireApproval: (contentType: string, itemId: string | number): boolean => {
    return protectedContent.isProtected(contentType, itemId) && versionControlConfig.requireApprovalForProtectedContent
  }
}