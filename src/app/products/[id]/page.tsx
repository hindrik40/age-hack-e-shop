import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { enhancedProducts } from '@/data/enhancedProducts';

export async function generateStaticParams() {
  return enhancedProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = enhancedProducts.find(p => p.id.toString() === id);
  
  if (!product) {
    return {
      title: 'Produkt hittades inte',
      description: 'Den begärda produkten kunde inte hittas.',
    };
  }

  return {
    title: `${product.name} - Premium Anti-Aging | E-Shop`,
    description: product.description,
    keywords: `anti-aging, ${product.category}, ${product.name}, hudvård, kollagen, retinol, hyaluronsyra`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = enhancedProducts.find(p => p.id.toString() === id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient productId={id} />;
}