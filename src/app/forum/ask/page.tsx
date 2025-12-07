'use client';

import { useRouter } from 'next/navigation';
import { AskQuestionForm } from '@/components/forum/AskQuestionForm';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AskQuestionPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleSuccess = () => {
    // Redirect to forum after successful question submission
    router.push('/forum');
  };

  const handleCancel = () => {
    router.push('/forum');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => router.push('/forum')}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('forum.backToForum')}
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('forum.askTitle')}
            </h1>
            <p className="text-gray-600">
              {t('forum.askSubtitle')}
            </p>
          </div>
        </div>

        <AskQuestionForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}