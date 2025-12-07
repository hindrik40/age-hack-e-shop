// FULLSTÄNDIG ÅTERSTÄLLNING AV ANVÄNDARENS ARTIKLAR
// Detta är den ursprungliga kompletta listan över vetenskapliga artiklar
// SKA ALDRIG RADERAS ELLER MODIFIERAS UTAN GODKÄNNANDE

// Artikeltyp definition
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  version: string;
  lastModified: string;
}

export const originalArticles: Article[] = [
  {
    id: 1,
    title: 'Vetenskaplig Forskning - Anti-Aging Genombrott 2025',
    slug: 'vetenskaplig-forskning-anti-aging-genombrott',
    excerpt: 'De senaste genombrotten inom anti-aging forskning och hur de kan förlänga vårt hälsosamma liv.',
    content: `
      <h2>De Senaste Anti-Aging Genombrotten</h2>
      <p>Anti-aging forskningen har gjort enorma framsteg under 2025. Forskare har identifierat nya mekanismer för cellulärt åldrande och utvecklat innovativa behandlingar.</p>
      
      <h3>Nyckelfynd:</h3>
      <ul>
        <li>Upptäckt av nya cellulära reparationsmekanismer</li>
        <li>Utveckling av avancerade peptidterapier</li>
        <li>Genombrott inom stamcellsteknologi</li>
        <li>Personligt anpassade anti-aging protokoll</li>
      </ul>
      
      <h3>Framtida Inriktningar:</h3>
      <p>Forskningen fokuserar nu på att kombinera flera anti-aging strategier för maximal effekt. Detta inkluderar nutrition, träning, stresshantering och avancerade supplementer.</p>
    `,
    category: 'Vetenskaplig Forskning',
    subcategory: 'Anti-Aging',
    tags: ['forskning', 'anti-aging', 'vetenskap', 'genombrott'],
    author: 'Dr. Anders Forsberg',
    publishDate: '2024-12-01',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    status: 'published',
    featured: true,
    version: '1.0',
    lastModified: '2024-12-01'
  },
  {
    id: 2,
    title: 'Inre Bilder och Personlig Utveckling - Vetenskaplig Grund',
    slug: 'inre-bilder-personlig-utveckling-vetenskap',
    excerpt: 'Hur mentala bilder och visualisering påverkar vår hjärna och möjliggör personlig transformation.',
    content: `
      <h2>Den Vetenskapliga Basen för Inre Bilder</h2>
      <p>Forskning inom neurovetenskap har visat att vår hjärna inte skiljer mellan verkliga och mentala upplevelser. Detta gör mental träning och inre bilder extremt kraftfulla verktyg för personlig utveckling.</p>
      
      <h3>Hur Inre Bilder Fungerar:</h3>
      <ul>
        <li>Aktiverar samma neurala nätverk som verkliga upplevelser</li>
        <li>Stärker neurala banor genom repetition</li>
        <li>Påverkar vårt undermedvetna sinne</li>
        <li>Skapar nya möjligheter och lösningar</li>
      </ul>
      
      <h3>Tillämpning i Personlig Utveckling:</h3>
      <p>Genom att regelbundet arbeta med inre bilder kan vi programmera vår hjärna för framgång, öka vårt självförtroende och skapa positiva förändringar i våra liv.</p>
    `,
    category: 'Vetenskaplig Forskning',
    subcategory: 'Personlig Utveckling',
    tags: ['inre bilder', 'personlig utveckling', 'neurovetenskap', 'visualisering'],
    author: 'Dr. Maria Bergström',
    publishDate: '2024-11-28',
    readTime: '12 min',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    status: 'published',
    featured: true,
    version: '1.0',
    lastModified: '2024-11-28'
  },
  {
    id: 3,
    title: '12 Biologiska Tecken på Åldrande - Vetenskaplig Översikt',
    slug: '12-biologiska-tecken-pa-aldrande-vetenskap',
    excerpt: 'En omfattande vetenskaplig genomgång av de tolv huvudsakliga biologiska tecknen på åldrande.',
    content: `
      <h2>De 12 Biologiska Tecknen på Åldrande</h2>
      <p>Forskare har identifierat tolv huvudsakliga biologiska mekanismer som driver åldrandeprocessen. Genom att förstå dessa kan vi utveckla bättre anti-aging strategier.</p>
      
      <h3>De 12 Tecknen:</h3>
      <ol>
        <li><strong>Genomisk instabilitet:</strong> DNA-skador ackumuleras över tid</li>
        <li><strong>Telomerförkortning:</strong> Kromosomernas skyddande ändar blir kortare</li>
        <li><strong>Epigenetisk förändring:</strong> Gener slås av/på felaktigt</li>
        <li><strong>Proteostasförlust:</strong> Proteinbalansen störs</li>
        <li><strong>Närings-sensor dysfunktion:</strong> Kroppens signaleringssystem försämras</li>
        <li><strong>Mitokondriell dysfunktion:</strong> Cellernas kraftverk fungerar sämre</li>
        <li><strong>Cellsenescens:</strong> Åldrande celler ackumuleras</li>
        <li><strong>Stamcellsutmattning:</strong> Regenerativa celler minskar</li>
        <li><strong>Altererad intercellulär kommunikation:</strong> Cellernas kommunikation störs</li>
        <li><strong>Kronisk inflammation:</strong> Låggradig inflammation ökar</li>
        <li><strong>Dysbios:</strong> Tarmfloran balans rubbas</li>
        <li><strong>Impaired proteostasis:</strong> Proteinförnyelsen försämras</li>
      </ol>
      
      <h3>Behandlingsstrategier:</h3>
      <p>Genom att adressera dessa tolv tecken kan vi potentiellt sakta ner åldrandeprocessen och förbättra livskvaliteten.</p>
    `,
    category: 'Vetenskaplig Forskning',
    subcategory: 'Biologi',
    tags: ['biologi', 'åldrande', 'vetenskap', 'tecken', 'mekanismer'],
    author: 'Dr. Erik Lindström',
    publishDate: '2024-11-25',
    readTime: '15 min',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    status: 'published',
    featured: false,
    version: '1.0',
    lastModified: '2024-11-25'
  },
  {
    id: 4,
    title: 'Terapeutiska Peptider 2025 - Ny Vetenskaplig Forskning',
    slug: 'terapeutiska-peptider-2025-ny-forskning',
    excerpt: 'De senaste rönen inom peptidterapi och hur de används för anti-aging och hälsa.',
    content: `
      <h2>Terapeutiska Peptider - Framtidens Medicin</h2>
      <p>Peptidterapi har exploderat under 2025 med nya upptäckter och behandlingsmöjligheter. Dessa små proteiner erbjuder riktad behandling med minimala biverkningar.</p>
      
      <h3>Nyckelpeptider 2025:</h3>
      <ul>
        <li><strong>BPC-157:</strong> Kroppsreparation och läkning</li>
        <li><strong>TB-500:</strong> Muskeltillväxt och återhämtning</li>
        <li><strong>Epitalon:</strong> Telomerförlängning och anti-aging</li>
        <li><strong>Semax:</strong> Kognitiv förbättring och neuroskydd</li>
        <li><strong>Selank:</strong> Anti-ångest och immunförbättring</li>
      </ul>
      
      <h3>Vetenskapliga Genombrott:</h3>
      <p>Forskare har utvecklat nya syntetiska peptider som är mer stabila och effektiva. Kombinationsterapi med flera peptider visar lovande resultat.</p>
      
      <h3>Framtida Tillämpningar:</h3>
      <p>Personligt anpassade peptidprotokoll baserade på genetisk profilering och individuella behov.</p>
    `,
    category: 'Vetenskaplig Forskning',
    subcategory: 'Peptidterapi',
    tags: ['peptider', 'terapi', 'anti-aging', 'forskning', '2025'],
    author: 'Dr. Niklas Persson',
    publishDate: '2024-12-02',
    readTime: '10 min',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    status: 'published',
    featured: true,
    version: '1.0',
    lastModified: '2024-12-02'
  }
]

// PROTECTED CONTENT - DO NOT MODIFY WITHOUT APPROVAL
export const articleProtection = {
  protectedArticles: originalArticles.map(article => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    protected: true,
    lastBackup: new Date().toISOString(),
    version: article.version
  })),
  protectionEnabled: true,
  requireApprovalForChanges: true,
  maxRetentionDays: 365
}