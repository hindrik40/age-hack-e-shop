module.exports = {
  apps: [
    {
      name: 'e-shop',
      script: '.next/standalone/server.js',
      instances: 1,
      env: {
        PORT: process.env.PORT || 3000,
        HOST: process.env.HOST || '0.0.0.0',
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://beta.age-hack.se',
        NEXT_PUBLIC_REVISIONS_PASSWORD: process.env.NEXT_PUBLIC_REVISIONS_PASSWORD || 'review',
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      }
    }
  ]
}
