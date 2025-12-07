# Expertforum Flödeschema - Ayurveda & TCM

## Systemarkitektur

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js App Router)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Header    │  │ ExpertForum  │  │  ExpertCard  │  │  QuestionCard    │   │
│  │ Navigation  │  │  Component   │  │  Component   │  │   Component      │   │
│  │  (Forum &   │◄─┤              │◄─┤              │◄─┤                  │   │
│  │  Experts)   │  │              │  │              │  │                  │   │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │
│         │                │                  │                   │             │
│         ▼                ▼                  ▼                   ▼             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │AskQuestion  │  │ExpertFilter  │  │  /forum/ask   │  │  /experts/[id]   │   │
│  │   Form      │◄─┤  Component   │◄─┤     Page     │◄─┤      Page        │   │
│  │             │  │              │  │              │  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                                                                                 │
└──────────────────────────────┬──────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           API LAYER (forum.ts)                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │  getExperts()   │  │ getQuestions()  │  │createQuestion() │               │
│  │  getExpertById()│  │ createAnswer()  │  │getSpecializations│               │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘               │
│           │                     │                     │                        │
│           ▼                     ▼                     ▼                        │
│  ┌─────────────────────────────────────────────────────────────────┐           │
│  │              SUPABASE CLIENT (@supabase/supabase-js)           │           │
│  └──────────────────────────────┬────────────────────────────────┘           │
│                                  │                                             │
└──────────────────────────────────┼─────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE (Supabase PostgreSQL)                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐  │
│  │     experts          │  │ forum_questions      │  │  forum_answers      │  │
│  ├──────────────────────┤  ├──────────────────────┤  ├─────────────────────┤  │
│  │ id (PK)              │  │ id (PK)              │  │ id (PK)            │  │
│  │ name                 │  │ title                │  │ question_id (FK)   │  │
│  │ email                │  │ content              │  │ expert_id (FK)     │  │
│  │ bio                  │  │ user_name            │  │ content            │  │
│  │ photo_url            │  │ user_email           │  │ created_at         │  │
│  │ years_of_experience  │  │ specialization_id    │  │ updated_at         │  │
│  │ certifications       │  │ is_anonymous         │  └─────────────────────┘  │
│  │ languages            │  │ created_at           │                        │  │
│  │ is_active            │  │ updated_at           │  ┌─────────────────────┐  │
│  │ created_at           │  │ expert_id (FK)     │  │expert_specializations│  │
│  │ updated_at           │  └──────────────────────┘  ├─────────────────────┤  │
│  └──────────┬───────────┘                               │ id (PK)             │  │
│              │                                           │ name                │  │
│              ▼                                           │ description         │  │
│  ┌──────────────────────┐                               │ category            │  │
│  │expert_specialization_links│                          │ is_active           │  │
│  ├──────────────────────┤                               │ created_at          │  │
│  │ expert_id (FK)       │                               │ updated_at          │  │
│  │ specialization_id (FK)│                               └─────────────────────┘  │
│  │ created_at           │                                                   │
│  └──────────────────────┘                                                   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                    ROW LEVEL SECURITY (RLS) POLICIES                    │  │
│  ├─────────────────────────────────────────────────────────────────────────┤  │
│  │ • SELECT: anon & authenticated kan läsa alla tabeller                   │  │
│  │ • INSERT: authenticated kan skapa frågor, experter kan svara         │  │
│  │ • UPDATE: endast ägare eller admin kan uppdatera                     │  │
│  │ • DELETE: endast admin kan ta bort                                     │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Dataflöde

### 1. Expertlista (experts page)
```
Användare → /experts → getExperts() → Supabase → experts + expert_specializations → ExpertCard[]
```

### 2. Forumsida (forum page)
```
Användare → /forum → getQuestions() → Supabase → forum_questions + forum_answers + experts → QuestionCard[]
```

### 3. Ställ fråga (ask question)
```
Användare → /forum/ask → AskQuestionForm → createQuestion() → Supabase → forum_questions → Redirect /forum
```

### 4. Expert svarar (answer question)
```
Expert → QuestionCard → createAnswer() → Supabase → forum_answers → Uppdatera UI
```

## Tekniska Detaljer

### Dependencies
- **Next.js 14** - App Router
- **React 18** - Komponenter
- **TypeScript** - Typ-säkerhet
- **Tailwind CSS** - Styling
- **Supabase** - Backend/Database
- **date-fns** - Datumhantering
- **lucide-react** - Ikoner

### API-funktioner (src/lib/forum.ts)
```typescript
// Experter
getExperts(filters?) → Expert[]
getExpertById(id) → Expert
getSpecializations() → ExpertSpecialization[]

// Forum
getQuestions(filters?) → Question[]
createQuestion(data) → Question
createAnswer(data) → Answer
```

### Komponent-hierarki
```
ExpertForum (main)
├── ExpertFilter
├── QuestionCard[]
│   └── Answer[]
├── ExpertCard
└── AskQuestionForm
```

### Sido-struktur
```
/app/forum/page.tsx          - Forumsida
/app/forum/ask/page.tsx     - Ställ fråga
/app/experts/page.tsx       - Expertlista
/app/experts/[id]/page.tsx  - Expert profil
```

## Säkerhet & Behörigheter

### Row Level Security (RLS)
- **anon** (icke inloggad): Läsa allt
- **authenticated** (inloggad): Läsa allt + skapa frågor
- **experter**: Läsa allt + skapa svar
- **admin**: Fulla rättigheter

### Validering
- Alla formulär har client-side validering
- Supabase RLS hanterar server-side behörighet
- SQL-injektion skyddad via Supabase prepared statements

## Prestanda

### Optimeringar
- Komponent-baserad arkitektur för återanvändning
- Lazy loading av expert-bilder
- Pagination redo (implementeras vid behov)
- Caching via Next.js App Router

### Skalbarhet
- Index på: expert_id, specialization_id, created_at
- Foreign keys för data-integritet
- Normaliserad databas-struktur