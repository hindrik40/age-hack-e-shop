'use client';

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SafeImage from "@/components/SafeImage";

type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
};

export default function ArticleList({ articles, basePath = "/articles", defaultCategory = "Alla" }: { articles: Article[], basePath?: string, defaultCategory?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>(defaultCategory);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [showFilters, setShowFilters] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastYRef.current && current > 150) {
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
      lastYRef.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bygg kategorilista från artiklar: inkludera förälder- och underkategorier + "Alla"
  const categories = useMemo(() => {
    const set = new Set<string>(["Alla"]);
    articles.forEach((a) => {
      const parts = a.category.split('>').map((p) => p.trim());
      if (parts.length === 0) return;
      let accum = '';
      for (let i = 0; i < parts.length; i++) {
        accum = i === 0 ? parts[0] : `${accum} > ${parts[i]}`;
        set.add(accum);
      }
    });
    return Array.from(set);
  }, [articles]);

  // Bygg taglista enbart från faktiska artiklar + "Alla"
  const allTags = useMemo(() => {
    const set = new Set<string>(["Alla"]);
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const aCat = a.category.trim();
      const parts = aCat.split('>').map((p) => p.trim());
      const matchesSearch = searchQuery
        ? `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory = category === "Alla"
        ? true
        : (
          aCat === category ||
          aCat.startsWith(`${category} >`) ||
          parts.includes(category) // fånga t.ex. "Anti-aging" i "Vetenskapliga studier > Anti-aging"
        );
      const matchesTag = activeTag && activeTag !== "Alla" ? a.tags.includes(activeTag) : true;
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [articles, searchQuery, category, activeTag]);

  const groupedStudies = useMemo(() => {
    if (category === 'Vetenskapliga studier') {
      const peptides = filtered.filter((a) => {
        const parts = a.category.trim().split('>').map((p) => p.trim());
        return parts[0] === 'Vetenskapliga studier' && (parts[1] || '') === 'Peptidforskning';
      });
      const antiAging = filtered.filter((a) => {
        const parts = a.category.trim().split('>').map((p) => p.trim());
        return parts[0] === 'Vetenskapliga studier' && (parts[1] || '') === 'Anti-aging';
      });
      return { peptides, antiAging };
    }
    return null;
  }, [filtered, category]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";
  const itemListJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${siteUrl}/articles/${a.slug}`,
      name: a.title,
    })),
  }), [filtered, siteUrl]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = typeof window !== "undefined";

  // Initiera från URL-parametrar
  useEffect(() => {
    if (!isClient) return;
    if (!searchParams) return;
    const q = searchParams.get("q") ?? "";
    const cat = (searchParams.get("category") ?? defaultCategory);
    const tagParam = searchParams.get("tag");
    setSearchQuery(q);
    setCategory(cat.trim());
    setActiveTag(tagParam ? (tagParam === "Alla" ? null : tagParam) : null);
  }, [searchParams, isClient]);

  // Validera att kategori/tag finns, annars reset
  useEffect(() => {
    if (category !== "Alla" && !categories.includes(category)) {
      setCategory(defaultCategory);
    }
  }, [categories, category]);

  useEffect(() => {
    if (activeTag && !allTags.includes(activeTag)) {
      setActiveTag(null);
    }
  }, [allTags, activeTag]);

  // Synka URL med filter
  useEffect(() => {
    if (!isClient) return;
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (category) params.set("category", category);
    params.set("tag", activeTag ?? "Alla");
    router.replace(`${basePath}?${params.toString()}` , { scroll: false });
  }, [searchQuery, category, activeTag, router, isClient, basePath]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCoverForArticle = (a: Article) => {
    switch (a.slug) {
      case "citrullin":
        return "https://images.unsplash.com/photo-1512719994955-56ec8681721f?auto=format&fit=crop&w=1200&q=80";
      case "aging-signs":
        return "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80";
      case "supplement-timing":
      case "supplement-timing-2":
        return "https://images.unsplash.com/photo-1594658986373-1749524a35cf?auto=format&fit=crop&w=1200&q=80";
      case "anti-aging-nutrition":
        return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80";
      case "vagus-nerve-health":
        return "https://images.unsplash.com/photo-1515879218367-8466d910aaa3?auto=format&fit=crop&w=1200&q=80";
      case "therapeutic-peptides-2025":
        return "https://images.unsplash.com/photo-1581093588401-9b6c8b53f5b2?auto=format&fit=crop&w=1200&q=80";
      case "peptide-drug-development-2025":
        return "https://images.unsplash.com/photo-1581091015940-4f2ab6b6d42d?auto=format&fit=crop&w=1200&q=80";
      case "synthetic-peptides-peptidomimetics-2024":
        return "https://images.unsplash.com/photo-1581092334301-20ad9f430d0e?auto=format&fit=crop&w=1200&q=80";
      case "non-hemolytic-amp-ml":
        return "https://images.unsplash.com/photo-1516574187841-9f8d3331b2d4?auto=format&fit=crop&w=1200&q=80";
      case "anti-aging-science-2025":
        return "https://images.unsplash.com/photo-1548345680-f5475ea5df86?auto=format&fit=crop&w=1200&q=80";
      default:
        return "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=1200&q=80";
    }
  };

  const ArticleItem = ({ article }: { article: Article }) => (
    <article className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <SafeImage
            src={getCoverForArticle(article)}
            alt={article.title}
            width={1200}
            height={800}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">
              {article.readTime} min läsning • {article.category}
            </span>
            <span className="text-gray-500 text-sm">{article.date}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{article.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  activeTag === tag ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpanded((prev) => ({ ...prev, [article.id]: !prev[article.id] }))}
                className="px-3 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50"
              >
                {expanded[article.id] ? "Visa färre" : "Läs mer"}
              </button>
              <Link
                href={`/articles/${article.slug}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Läs hela
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  const renderGroupedStudies = () => {
    if (!groupedStudies) return null;
    const hasGroups = groupedStudies.peptides.length > 0 || groupedStudies.antiAging.length > 0;
    if (!hasGroups) {
      // Fallback: visa filtrerade artiklar om inga grupper matchar
      return (
        <div className="grid grid-cols-1 gap-8">
          {filtered.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      );
    }
    return (
      <div>
        {groupedStudies.peptides.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Peptidforskning</h3>
            <div className="grid grid-cols-1 gap-8">
              {groupedStudies.peptides.map((article) => (
                <ArticleItem key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {groupedStudies.antiAging.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Anti-aging</h3>
            <div className="grid grid-cols-1 gap-8">
              {groupedStudies.antiAging.map((article) => (
                <ArticleItem key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Search & Filters */}
      <div className={`mb-8 sticky top-2 z-10 transition-transform duration-300 ${showFilters ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col md:flex-row gap-4 mb-3 bg-white/70 backdrop-blur rounded-2xl p-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Sök artiklar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value.trim())}
            className="px-6 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-sm text-gray-600">{filtered.length} artiklar</span>
          <button
            onClick={() => {
              setSearchQuery("");
              setCategory("Alla");
              setActiveTag(null);
            }}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Rensa filter
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === "Alla" ? null : (activeTag === tag ? null : tag))}
              className={`px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors ${
                activeTag === tag ? "bg-blue-600 text-white border-blue-600" : ""
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Debug panel (temporary) */}
      <div className="mb-6 p-4 rounded-xl border border-yellow-300 bg-yellow-50 text-sm">
        <div className="font-medium text-yellow-800 mb-2">Debug (tillfälligt)</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-yellow-900">
          <div>Vald kategori: <span className="font-mono">{category}</span></div>
          <div>Filtrerade artiklar: <span className="font-mono">{filtered.length}</span></div>
          <div>GroupedStudies: <span className="font-mono">{groupedStudies ? `Peptidforskning ${groupedStudies.peptides.length}, Anti-aging ${groupedStudies.antiAging.length}` : 'null'}</span></div>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer">Visa alla artiklar och kategorier</summary>
          <ul className="mt-2 list-disc pl-5">
            {articles.map((a) => (
              <li key={a.id} className="font-mono text-yellow-900">{a.id}. {a.title} — {a.category}</li>
            ))}
          </ul>
        </details>
      </div>

      {/* Articles Grid or Grouped */}
      {groupedStudies ? (
        renderGroupedStudies()
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filtered.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* JSON-LD for filtered list */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </div>
  );
}