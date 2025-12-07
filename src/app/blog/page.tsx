'use client';

import { useState } from 'react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

interface BlogPost {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function BlogPage() {
  const { t, language } = useLanguage();
  const initialPostsByLanguage: Record<Language, BlogPost[]> = {
    sv: [
      {
        id: 1,
        name: 'Anna Svensson',
        email: 'anna@example.com',
        message: 'Jag har använt era anti-aging produkter i 3 månader nu och resultatet är fantastiskt! Min hud känns fastare och mer strålande.',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Maria Johansson',
        email: 'maria@example.com',
        message: 'Ayurvediska produkterna har verkligen hjälpt mig att hitta balans i min dagliga rutin. Rekommenderas varmt!',
        date: '2024-01-10'
      },
      {
        id: 3,
        name: 'Erik Andersson',
        email: 'erik@example.com',
        message: 'Hälsotesterna gav mig värdefull insikt om min kropp. Nu kan jag ta bättre hand om min hälsa.',
        date: '2024-01-08'
      }
    ],
    en: [
      {
        id: 1,
        name: 'Anna Smith',
        email: 'anna@example.com',
        message: 'I have used your anti-aging products for 3 months now and the results are fantastic! My skin feels firmer and more radiant.',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Maria Johnson',
        email: 'maria@example.com',
        message: 'The ayurvedic products have really helped me find balance in my daily routine. Highly recommended!',
        date: '2024-01-10'
      },
      {
        id: 3,
        name: 'Eric Anderson',
        email: 'erik@example.com',
        message: 'The health tests gave me valuable insight about my body. Now I can take better care of my health.',
        date: '2024-01-08'
      }
    ]
  };

  const [postsByLang, setPostsByLang] = useState<Record<Language, BlogPost[]>>(initialPostsByLanguage);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: BlogPost = {
      id: (postsByLang[language]?.length ?? 0) + 1,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString().split('T')[0]
    };

    setPostsByLang(prev => ({
      ...prev,
      [language]: [newPost, ...(prev[language] ?? [])]
    }));

    setFormData({ name: '', email: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {t('blog.subtitle')}
          </p>
        </div>

        {submitted && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {t('blog.success')}
          </div>
        )}

        {/* Write New Post Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('blog.writePost')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blog.yourName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blog.yourEmail')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('blog.yourMessage')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                {t('blog.submit')}
              </button>
            </div>
          </form>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {(postsByLang[language] ?? []).map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.date}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {post.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {post.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}