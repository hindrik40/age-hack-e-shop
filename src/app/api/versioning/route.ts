import { NextResponse } from 'next/server'
import { contentVersions, versionControl, protectedContent, ContentVersion } from '@/data/versionControl'

// API för versionshantering - SKYDDAD
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const contentType = searchParams.get('contentType')
  const itemId = searchParams.get('itemId')
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'list':
        // Lista alla versioner för ett specifikt objekt
        if (!contentType || !itemId) {
          return NextResponse.json({ 
            error: 'contentType och itemId krävs' 
          }, { status: 400 })
        }
        
        const versions = versionControl.getAllVersions(contentType, itemId)
        return NextResponse.json({ 
          contentType, 
          itemId, 
          versions: versions.length,
          data: versions 
        })

      case 'latest':
        // Hämta senaste version
        if (!contentType || !itemId) {
          return NextResponse.json({ 
            error: 'contentType och itemId krävs' 
          }, { status: 400 })
        }
        
        const latest = versionControl.getLatestVersion(contentType, itemId)
        return NextResponse.json({ 
          contentType, 
          itemId, 
          version: latest 
        })

      case 'all':
        // Lista alla versioner i systemet
        return NextResponse.json({ 
          totalVersions: contentVersions.length,
          versions: contentVersions 
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 50) // Begränsa till 50 senaste
        })

      case 'protected':
        // Lista skyddat innehåll
        return NextResponse.json({ 
          protectedItems: protectedContent.protectedItems,
          protectionEnabled: true,
          totalProtected: protectedContent.protectedItems.length
        })

      default:
        return NextResponse.json({ 
          error: 'Ogiltig action. Använd: list, latest, all, protected' 
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Fel i versionshantering GET:', error)
    return NextResponse.json({ 
      error: 'Internt serverfel' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, contentType, itemId, title, content, changes, author, versionId } = body

    switch (action) {
      case 'create':
        // Skapa ny version
        if (!contentType || !itemId || !title || !content || !changes) {
          return NextResponse.json({ 
            error: 'contentType, itemId, title, content och changes krävs' 
          }, { status: 400 })
        }

        // Kontrollera om innehållet är skyddat
        if (protectedContent.requireApproval(contentType, itemId)) {
          return NextResponse.json({ 
            error: 'Detta innehåll är skyddat och kräver godkännande för ändringar',
            protected: true,
            item: { contentType, itemId, title }
          }, { status: 403 })
        }

        const newVersion = versionControl.createVersion(
          contentType, 
          itemId, 
          title, 
          content, 
          changes, 
          author || 'API'
        )
        
        return NextResponse.json({ 
          message: 'Ny version skapad',
          version: newVersion 
        })

      case 'restore':
        // Återställ till specifik version
        if (!versionId) {
          return NextResponse.json({ 
            error: 'versionId krävs' 
          }, { status: 400 })
        }

        const restored = versionControl.restoreVersion(versionId)
        if (!restored) {
          return NextResponse.json({ 
            error: 'Version hittades inte' 
          }, { status: 404 })
        }

        return NextResponse.json({ 
          message: 'Version återställd',
          version: restored 
        })

      case 'cleanup':
        // Rensa gamla versioner
        const maxAgeDays = body.maxAgeDays || 365
        versionControl.cleanupOldVersions(maxAgeDays)
        
        return NextResponse.json({ 
          message: `Gamla versioner äldre än ${maxAgeDays} dagar har rensats`
        })

      default:
        return NextResponse.json({ 
          error: 'Ogiltig action. Använd: create, restore, cleanup' 
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Fel i versionshantering POST:', error)
    return NextResponse.json({ 
      error: 'Internt serverfel' 
    }, { status: 500 })
  }
}

// Hjälpfunktion för att säkerhetskopiera skyddat innehåll
export async function backupProtectedContent() {
  const protectedVersions = contentVersions.filter(version => {
    return protectedContent.isProtected(version.contentType, version.itemId)
  })
  
  return {
    timestamp: new Date().toISOString(),
    totalProtected: protectedVersions.length,
    protectedContent: protectedVersions
  }
}