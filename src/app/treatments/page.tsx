import type { Metadata } from 'next';
import { Suspense } from 'react';
import TreatmentCatalog from '@/components/TreatmentCatalog';

export const metadata: Metadata = {
  title: 'Behandlingar – Ayurveda & TCM | Holistisk skönhet',
  description: 'Utforska behandlingar inom Ayurveda och Traditionell Kinesisk Medicin. Filtrera efter kategori, kroppsområde och systemtyp. Lär dig mer och boka.',
  openGraph: {
    title: 'Behandlingar – Ayurveda & TCM',
    description: 'Se vårt utbud av behandlingar och filtrera efter dina behov.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        }>
          <TreatmentCatalog />
        </Suspense>
      </div>
    </div>
  );
}