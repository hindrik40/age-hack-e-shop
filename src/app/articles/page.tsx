export const metadata = {
  title: "Kunskapsbank – Artiklar om hälsa och anti-aging",
  description: "Utforska vetenskapligt baserade artiklar om hälsa, anti-aging, näring och välbefinnande.",
  openGraph: {
    title: "Kunskapsbank – Artiklar",
    description: "Vetenskapligt baserade artiklar om hälsa och anti-aging.",
    url: "/articles",
    siteName: "E-Shop Wellness",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Kunskapsbank – Artiklar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunskapsbank – Artiklar",
    description: "Vetenskapligt baserade artiklar om hälsa och anti-aging.",
    images: [
      "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

import ArticlesPageClient from "./ArticlesPageClient";
import { articles } from "@/data/articles";

export default function ArticlesPage() {
  return <ArticlesPageClient articles={articles} />
}