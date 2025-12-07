'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the callback from Supabase auth
        const { data: { session }, error } = await supabase!.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast.error('Det uppstod ett fel vid inloggningen');
          router.push('/login');
          return;
        }

        if (session) {
          toast.success('Välkommen! Du är nu inloggad.');
          router.push('/profile');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        toast.error('Ett oväntat fel uppstod');
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifierar din inloggning...</p>
      </div>
    </div>
  );
}