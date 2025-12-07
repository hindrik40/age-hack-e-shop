-- Skapa tabell för experter
CREATE TABLE experts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    photo_url VARCHAR(500),
    years_of_experience INTEGER,
    certifications TEXT[],
    languages VARCHAR(10)[] DEFAULT '{en}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa tabell för expert-specialiseringar
CREATE TABLE expert_specializations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_sv VARCHAR(255),
    description TEXT,
    description_sv TEXT,
    category VARCHAR(100) NOT NULL, -- 'ayurveda', 'tcm', 'antiaging'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa kopplingstabell för expert-specialiseringar
CREATE TABLE expert_specialization_links (
    expert_id UUID REFERENCES experts(id) ON DELETE CASCADE,
    specialization_id UUID REFERENCES expert_specializations(id) ON DELETE CASCADE,
    PRIMARY KEY (expert_id, specialization_id)
);

-- Skapa tabell för forumfrågor
CREATE TABLE forum_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'ayurveda', 'tcm', 'antiaging'
    specialization_id UUID REFERENCES expert_specializations(id),
    is_anonymous BOOLEAN DEFAULT false,
    is_answered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa tabell för forumsvar
CREATE TABLE forum_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES forum_questions(id) ON DELETE CASCADE,
    expert_id UUID REFERENCES experts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa index för bättre prestanda
CREATE INDEX idx_experts_active ON experts(is_active);
CREATE INDEX idx_experts_specialization ON expert_specialization_links(specialization_id);
CREATE INDEX idx_questions_category ON forum_questions(category);
CREATE INDEX idx_questions_specialization ON forum_questions(specialization_id);
CREATE INDEX idx_questions_answered ON forum_questions(is_answered);
CREATE INDEX idx_answers_question ON forum_answers(question_id);
CREATE INDEX idx_answers_expert ON forum_answers(expert_id);

-- Lägg till RLS (Row Level Security)
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_specialization_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_answers ENABLE ROW LEVEL SECURITY;

-- Skapa policies för läsåtkomst (alla kan läsa)
CREATE POLICY "Alla kan läsa experter" ON experts FOR SELECT USING (is_active = true);
CREATE POLICY "Alla kan läsa specialiseringar" ON expert_specializations FOR SELECT USING (true);
CREATE POLICY "Alla kan läsa expert-specialiseringar" ON expert_specialization_links FOR SELECT USING (true);
CREATE POLICY "Alla kan läsa frågor" ON forum_questions FOR SELECT USING (true);
CREATE POLICY "Alla kan läsa svar" ON forum_answers FOR SELECT USING (true);

-- Skapa policies för skrivåtkomst (begränsad)
CREATE POLICY "Endast autentiserade kan skapa frågor" ON forum_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Endast experter kan svara" ON forum_answers FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM experts 
        WHERE experts.id = expert_id 
        AND experts.email = current_user
        AND experts.is_active = true
    )
);

-- Ge nödvändiga rättigheter
GRANT SELECT ON experts TO anon, authenticated;
GRANT SELECT ON expert_specializations TO anon, authenticated;
GRANT SELECT ON expert_specialization_links TO anon, authenticated;
GRANT SELECT ON forum_questions TO anon, authenticated;
GRANT SELECT ON forum_answers TO anon, authenticated;
GRANT INSERT ON forum_questions TO anon, authenticated;
GRANT INSERT ON forum_answers TO authenticated;

-- Lägg till testdata för specialiseringar
INSERT INTO expert_specializations (name, name_sv, description, description_sv, category) VALUES
-- Ayurveda specialiseringar
('Panchakarma Therapy', 'Panchakarma Terapi', 'Detoxification and rejuvenation therapy', 'Avgiftnings- och föryngringsterapi', 'ayurveda'),
('Herbal Medicine', 'Örtmedicin', 'Traditional Ayurvedic herbal treatments', 'Traditionella ayurvediska örtbehandlingar', 'ayurveda'),
('Diet & Nutrition', 'Kost & Näring', 'Ayurvedic dietary guidance', 'Ayurvedisk kostrådgivning', 'ayurveda'),
('Yoga Therapy', 'Yogaterapi', 'Therapeutic yoga practices', 'Terapeutiska yogaövningar', 'ayurveda'),

-- TCM specialiseringar  
('Acupuncture', 'Akupunktur', 'Traditional needle therapy', 'Traditionell nålterapi', 'tcm'),
('Herbal Formulas', 'Örtformler', 'Classical Chinese herbal medicine', 'Klassisk kinesisk örtmedicin', 'tcm'),
('Tui Na Massage', 'Tui Na Massage', 'Traditional Chinese therapeutic massage', 'Traditionell kinesisk terapeutisk massage', 'tcm'),
('Qi Gong', 'Qi Gong', 'Energy cultivation practices', 'Energiförstärkande övningar', 'tcm'),

-- Anti-aging specialiseringar
('Longevity Medicine', 'Längemedisin', 'Anti-aging and longevity treatments', 'Anti-aging och längedbehandlingar', 'antiaging'),
('Cellular Regeneration', 'Cellulär Regenerering', 'Advanced cellular rejuvenation therapies', 'Avancerade cellförnyelseterapier', 'antiaging'),
('Hormone Optimization', 'Hormonoptimering', 'Natural hormone balancing', 'Naturlig hormonbalansering', 'antiaging'),
('Nutritional Therapy', 'Näringssterapi', 'Advanced nutritional interventions', 'Avancerade näringsinterventioner', 'antiaging');