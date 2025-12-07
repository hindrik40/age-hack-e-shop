-- Create expert_specializations table
CREATE TABLE expert_specializations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_sv VARCHAR(255),
    category VARCHAR(50) NOT NULL CHECK (category IN ('ayurveda', 'tcm', 'antiaging')),
    description TEXT,
    description_sv TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experts table
CREATE TABLE experts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT NOT NULL,
    bio_sv TEXT,
    profile_image VARCHAR(500),
    years_experience INTEGER NOT NULL,
    certifications TEXT[],
    languages VARCHAR(10)[] DEFAULT ARRAY['en', 'sv'],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expert_specialization_links table (many-to-many relationship)
CREATE TABLE expert_specialization_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    expert_id UUID NOT NULL REFERENCES experts(id) ON DELETE CASCADE,
    specialization_id UUID NOT NULL REFERENCES expert_specializations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(expert_id, specialization_id)
);

-- Create forum_questions table
CREATE TABLE forum_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('ayurveda', 'tcm', 'antiaging', 'general')),
    specialization_id UUID REFERENCES expert_specializations(id) ON DELETE SET NULL,
    is_anonymous BOOLEAN DEFAULT false,
    is_answered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_answers table
CREATE TABLE forum_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID NOT NULL REFERENCES forum_questions(id) ON DELETE CASCADE,
    expert_id UUID NOT NULL REFERENCES experts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_expert_specializations_category ON expert_specializations(category);
CREATE INDEX idx_expert_specializations_name ON expert_specializations(name);
CREATE INDEX idx_experts_active ON experts(is_active);
CREATE INDEX idx_expert_specialization_links_expert ON expert_specialization_links(expert_id);
CREATE INDEX idx_expert_specialization_links_specialization ON expert_specialization_links(specialization_id);
CREATE INDEX idx_forum_questions_category ON forum_questions(category);
CREATE INDEX idx_forum_questions_specialization ON forum_questions(specialization_id);
CREATE INDEX idx_forum_questions_user ON forum_questions(user_id);
CREATE INDEX idx_forum_questions_created ON forum_questions(created_at DESC);
CREATE INDEX idx_forum_answers_question ON forum_answers(question_id);
CREATE INDEX idx_forum_answers_expert ON forum_answers(expert_id);
CREATE INDEX idx_forum_answers_featured ON forum_answers(is_featured);

-- Enable Row Level Security (RLS)
ALTER TABLE expert_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_specialization_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_answers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Public can view specializations" ON expert_specializations
    FOR SELECT USING (true);

CREATE POLICY "Public can view active experts" ON experts
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view expert-specialization links" ON expert_specialization_links
    FOR SELECT USING (true);

CREATE POLICY "Public can view forum questions" ON forum_questions
    FOR SELECT USING (true);

CREATE POLICY "Public can view forum answers" ON forum_answers
    FOR SELECT USING (true);

-- Create policies for authenticated users to create questions
CREATE POLICY "Authenticated users can create questions" ON forum_questions
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create policies for experts to create answers (experts will be authenticated via service role)
CREATE POLICY "Experts can create answers" ON forum_answers
    FOR INSERT WITH CHECK (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON expert_specializations TO anon, authenticated;
GRANT SELECT ON experts TO anon, authenticated;
GRANT SELECT ON expert_specialization_links TO anon, authenticated;
GRANT SELECT ON forum_questions TO anon, authenticated;
GRANT SELECT ON forum_answers TO anon, authenticated;
GRANT INSERT ON forum_questions TO authenticated;
GRANT INSERT ON forum_answers TO authenticated;

-- Insert sample data for expert specializations
INSERT INTO expert_specializations (name, name_sv, category, description, description_sv) VALUES
    ('Ayurvedic Nutrition', 'Ayurvedisk Nutrition', 'ayurveda', 'Dietary guidance based on Ayurvedic principles', 'Kostråd baserat på ayurvediska principer'),
    ('Herbal Medicine', 'Örtmedicin', 'ayurveda', 'Traditional Ayurvedic herbal remedies', 'Traditionella ayurvediska örtmediciner'),
    ('Panchakarma Therapy', 'Panchakarma Terapi', 'ayurveda', 'Detoxification and rejuvenation treatments', 'Avgiftnings- och föryngringsbehandlingar'),
    ('Acupuncture', 'Akupunktur', 'tcm', 'Traditional Chinese acupuncture therapy', 'Traditionell kinesisk akupunkturterapi'),
    ('Chinese Herbal Medicine', 'Kinesisk Örtmedicin', 'tcm', 'Classical Chinese herbal formulations', 'Klassiska kinesiska örtmedicinska formler'),
    ('Qi Gong', 'Qi Gong', 'tcm', 'Energy cultivation and movement practices', 'Energicirkulation och rörelseövningar'),
    ('Anti-Aging Nutrition', 'Anti-Aging Nutrition', 'antiaging', 'Nutrition for longevity and vitality', 'Näring för långt liv och vitalitet'),
    ('Hormone Optimization', 'Hormonoptimering', 'antiaging', 'Natural hormone balancing therapies', 'Naturliga hormonbalanserande terapier'),
    ('Regenerative Medicine', 'Regenerativ Medicin', 'antiaging', 'Stem cell and regenerative therapies', 'Stamcell och regenerativa terapier');

-- Insert sample experts
INSERT INTO experts (name, email, bio, bio_sv, profile_image, years_experience, certifications, languages) VALUES
    ('Dr. Priya Sharma', 'priya.sharma@example.com', 'Dr. Sharma is a certified Ayurvedic practitioner with over 15 years of experience in traditional Indian medicine. She specializes in personalized nutrition plans and herbal remedies.', 'Dr Sharma är en certifierad ayurvedisk utövare med över 15 års erfarenhet av traditionell indisk medicin. Hon specialiserar sig på personliga näringsplaner och örtmediciner.', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+Indian+female+doctor+portrait%2C+traditional+clothing%2C+warm+smile%2C+professional+lighting&image_size=square', 15, ARRAY['BAMS (Bachelor of Ayurvedic Medicine and Surgery)', 'MD (Ayurveda)'], ARRAY['en', 'hi']),
    ('Master Li Wei', 'li.wei@example.com', 'Master Li Wei is a renowned Traditional Chinese Medicine practitioner with expertise in acupuncture and herbal medicine. He has been practicing for over 20 years.', 'Mästare Li Wei är en välrenommerad utövare av Traditionell Kinesisk Medicin med expertis inom akupunktur och örtmedicin. Han har praktiserat i över 20 år.', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Traditional+Chinese+male+doctor+portrait%2C+wisdom+in+eyes%2C+traditional+Chinese+clothing%2C+professional+lighting&image_size=square', 20, ARRAY['Licensed Acupuncturist', 'TCM Master Practitioner'], ARRAY['en', 'zh']),
    ('Dr. Elena Rodriguez', 'elena.rodriguez@example.com', 'Dr. Rodriguez specializes in anti-aging medicine and hormone optimization. She combines modern science with natural therapies to promote longevity and vitality.', 'Dr Rodriguez specialiserar sig på anti-aging medicin och hormonoptimering. Hon kombinerar modern vetenskap med naturliga terapier för att främja långt liv och vitalitet.', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+female+doctor+portrait%2C+modern+medical+setting%2C+confident+expression%2C+professional+lighting&image_size=square', 12, ARRAY['MD', 'Board Certified in Anti-Aging Medicine'], ARRAY['en', 'es']);

-- Link experts to specializations
INSERT INTO expert_specialization_links (expert_id, specialization_id) VALUES
    ((SELECT id FROM experts WHERE email = 'priya.sharma@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Ayurvedic Nutrition')),
    ((SELECT id FROM experts WHERE email = 'priya.sharma@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Herbal Medicine')),
    ((SELECT id FROM experts WHERE email = 'li.wei@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Acupuncture')),
    ((SELECT id FROM experts WHERE email = 'li.wei@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Chinese Herbal Medicine')),
    ((SELECT id FROM experts WHERE email = 'elena.rodriguez@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Anti-Aging Nutrition')),
    ((SELECT id FROM experts WHERE email = 'elena.rodriguez@example.com'), (SELECT id FROM expert_specializations WHERE name = 'Hormone Optimization'));