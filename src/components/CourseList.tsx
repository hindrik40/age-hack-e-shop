'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  price: string;
  status: 'active' | 'coming-soon';
  tags: string[];
  imageUrl: string;
}

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Alla');
  const [level, setLevel] = useState('Alla');
  const [status, setStatus] = useState('Alla');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initiera från URL-parametrar
  useEffect(() => {
    if (!searchParams) return;
    
    const q = searchParams.get('q') ?? '';
    const cat = searchParams.get('category') ?? 'Alla';
    const lvl = searchParams.get('level') ?? 'Alla';
    const stat = searchParams.get('status') ?? 'Alla';
    setSearchQuery(q);
    setCategory(cat);
    setLevel(lvl);
    setStatus(stat);
  }, [searchParams]);

  // Beräkna unika kategorier, nivåer och status
  const categories = useMemo(() => {
    const cats = ['Alla', ...new Set(courses.map(c => c.category))];
    return cats;
  }, [courses]);

  const levels = useMemo(() => {
    const lvls = ['Alla', ...new Set(courses.map(c => c.level))];
    return lvls;
  }, [courses]);

  const statuses = useMemo(() => {
    return ['Alla', 'Aktiva', 'Kommande'];
  }, []);

  // Filtrera kurser
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = category === 'Alla' ? true : course.category === category;
      const matchesLevel = level === 'Alla' ? true : course.level === level;
      const matchesStatus = status === 'Alla' ? true : 
                           status === 'Aktiva' ? course.status === 'active' :
                           status === 'Kommande' ? course.status === 'coming-soon' : true;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [courses, searchQuery, category, level, status]);

  // Synka URL med filter
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (category !== 'Alla') params.set('category', category);
    if (level !== 'Alla') params.set('level', level);
    if (status !== 'Alla') params.set('status', status);
    
    router.replace(`/courses?${params.toString()}`, { scroll: false });
  }, [searchQuery, category, level, status, router]);

  const CourseCard = ({ course }: { course: Course }) => (
    <article className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
      course.status === 'coming-soon' ? 'opacity-75' : ''
    }`}>
      <div className="relative h-48 overflow-hidden">
        <SafeImage
          src={course.imageUrl}
          alt={course.title}
          width={600}
          height={400}
          containerClassName="h-full bg-gradient-to-br from-blue-100 to-purple-100"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {course.status === 'coming-soon' && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
            Kommer snart
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {course.category}
          </span>
          <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">{course.duration}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{course.price}</span>
          <div className="flex gap-2">
            {course.status === 'active' ? (
              <Link
                href={`/courses/${course.slug}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Läs mer
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-full cursor-not-allowed"
              >
                Kommer snart
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-8 sticky top-24 z-10">
        <div className="flex flex-col lg:flex-row gap-4 mb-3 bg-white/70 backdrop-blur rounded-2xl p-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Sök kurser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full flex-1 min-w-0 px-6 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full flex-1 min-w-0 px-6 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full flex-1 min-w-0 px-6 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-sm text-gray-600">{filteredCourses.length} kurser</span>
          <button
            onClick={() => { 
              setSearchQuery(''); 
              setCategory('Alla'); 
              setLevel('Alla'); 
              setStatus('Alla'); 
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Rensa filter
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <div className="text-center text-gray-600 py-12">
          <p>Inga kurser matchar din sökning.</p>
          <button
            onClick={() => { 
              setSearchQuery(''); 
              setCategory('Alla'); 
              setLevel('Alla'); 
              setStatus('Alla'); 
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Rensa filter
          </button>
        </div>
      )}
    </div>
  );
}