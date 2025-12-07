import { Suspense } from 'react';
import TreatmentDetail from '@/components/TreatmentDetail';
import type { Metadata } from 'next';
import { getTreatmentById } from '@/lib/treatments';

export default function TreatmentPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[600px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        }>
          <TreatmentDetail treatmentId={id} />
        </Suspense>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const treatment = await getTreatmentById(params.id);
  if (!treatment) {
    return {
      title: 'Behandling saknas',
      description: 'Kunde inte hitta behandling.',
    };
  }

  const title = `${treatment.name_sv} – Ayurveda/TCM | Behandling`;
  const description = treatment.description_sv?.slice(0, 160) || 'Läs mer om behandlingen och dess fördelar.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'sv_SE',
      images: treatment.image_url ? [{ url: treatment.image_url }] : undefined,
    },
  };
}