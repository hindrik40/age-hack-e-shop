-- Idempotent seed fix: avoid duplicates and ensure linking works

-- Categories
INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type)
SELECT 'Ayurveda Behandlingar', 'Ayurveda Treatments', 'Traditionella ayurvediska behandlingar för balans och välbefinnande', 'Traditional Ayurvedic treatments for balance and well-being', 'ayurveda'
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar'
);

INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type)
SELECT 'TCM Akupunktur', 'TCM Acupuncture', 'Traditionell kinesisk akupunktur för energiflöde och healing', 'Traditional Chinese acupuncture for energy flow and healing', 'tcm'
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_categories WHERE name_sv = 'TCM Akupunktur'
);

INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type)
SELECT 'Örtmedicin', 'Herbal Medicine', 'Naturliga örtbaserade behandlingar och kurer', 'Natural herbal-based treatments and remedies', 'both'
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_categories WHERE name_sv = 'Örtmedicin'
);

INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type)
SELECT 'Massage & Kroppsbehandlingar', 'Massage & Body Treatments', 'Helande massage och kroppsbehandlingar', 'Healing massage and body treatments', 'both'
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_categories WHERE name_sv = 'Massage & Kroppsbehandlingar'
);

INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type)
SELECT 'Meditation & Mindfulness', 'Meditation & Mindfulness', 'Meditations- och mindfulnesspraktiker för inre balans', 'Meditation and mindfulness practices for inner balance', 'both'
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_categories WHERE name_sv = 'Meditation & Mindfulness'
);

-- Ailments
INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Stress & Ångest', 'Stress & Anxiety', 'Allmän stress och ångestkänslor', 'General stress and anxiety feelings', 'mind', 'moderate'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Stress & Ångest'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Sömnproblem', 'Sleep Problems', 'Svårigheter att somna eller sova genom natten', 'Difficulty falling asleep or sleeping through the night', 'mind', 'moderate'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Sömnproblem'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Ryggvärk', 'Back Pain', 'Smärta och obehag i ryggregionen', 'Pain and discomfort in the back region', 'back', 'moderate'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Ryggvärk'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Huvudvärk', 'Headache', 'Spänningshuvudvärk eller migrän', 'Tension headache or migraine', 'head', 'moderate'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Huvudvärk'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Trötthet', 'Fatigue', 'Allmän trötthet och energibrist', 'General fatigue and lack of energy', 'body', 'mild'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Trötthet'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Matsmältningsproblem', 'Digestive Issues', 'Problem med matsmältningen som uppblåsthet eller förstoppning', 'Digestive problems like bloating or constipation', 'abdomen', 'mild'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Matsmältningsproblem'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Ledvärk', 'Joint Pain', 'Smärta och stelhet i lederna', 'Pain and stiffness in joints', 'joints', 'moderate'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Ledvärk'
);

INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity)
SELECT 'Hudproblem', 'Skin Problems', 'Olika typer av hudproblem som eksem eller akne', 'Various skin problems like eczema or acne', 'skin', 'mild'
WHERE NOT EXISTS (
  SELECT 1 FROM ailments WHERE name_sv = 'Hudproblem'
);

-- Treatments
INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active)
SELECT 'Abhyanga Massage', 'Abhyanga Massage', 'Traditionell ayurvedisk helkroppsmassage med varma oljor för djup avslappning och avgiftning', 'Traditional Ayurvedic full-body massage with warm oils for deep relaxation and detoxification',
       (SELECT id FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar' ORDER BY id LIMIT 1),
       'ayurveda', 90, 950,
       '{"Djup avslappning", "Förbättrad cirkulation", "Avgiftning", "Förbättrad sömn"}',
       '{"Deep relaxation", "Improved circulation", "Detoxification", "Better sleep"}',
       'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', true
WHERE NOT EXISTS (
  SELECT 1 FROM treatments WHERE name_sv = 'Abhyanga Massage'
);

INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active)
SELECT 'Shirodhara Behandling', 'Shirodhara Treatment', 'Ayurvedisk behandling där varm olja forsaktigt strömmar över pannan för djup mental avslappning', 'Ayurvedic treatment where warm oil gently flows over the forehead for deep mental relaxation',
       (SELECT id FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar' ORDER BY id LIMIT 1),
       'ayurveda', 75, 1200,
       '{"Mental klarhet", "Reducerad stress", "Förbättrad koncentration", "Emotionell balans"}',
       '{"Mental clarity", "Reduced stress", "Improved concentration", "Emotional balance"}',
       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', true
WHERE NOT EXISTS (
  SELECT 1 FROM treatments WHERE name_sv = 'Shirodhara Behandling'
);

INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active)
SELECT 'TCM Akupunktur', 'TCM Acupuncture', 'Traditionell kinesisk akupunktur för att balansera kroppens energiflöde och främja healing', 'Traditional Chinese acupuncture to balance the body''s energy flow and promote healing',
       (SELECT id FROM treatment_categories WHERE name_sv = 'TCM Akupunktur' ORDER BY id LIMIT 1),
       'tcm', 60, 800,
       '{"Smärtlindring", "Förbättrad energi", "Stressreduktion", "Bättre sömn"}',
       '{"Pain relief", "Improved energy", "Stress reduction", "Better sleep"}',
       'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', true
WHERE NOT EXISTS (
  SELECT 1 FROM treatments WHERE name_sv = 'TCM Akupunktur'
);

INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active)
SELECT 'Örtmedicinsk Konsultation', 'Herbal Medicine Consultation', 'Personlig konsultation för skräddarsydd örtmedicinsk behandling baserad på dina behov', 'Personal consultation for tailored herbal medicine treatment based on your needs',
       (SELECT id FROM treatment_categories WHERE name_sv = 'Örtmedicin' ORDER BY id LIMIT 1),
       'both', 45, 650,
       '{"Personlig behandling", "Naturlig healing", "Inga biverkningar", "Långvariga resultat"}',
       '{"Personalized treatment", "Natural healing", "No side effects", "Long-lasting results"}',
       'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800', true
WHERE NOT EXISTS (
  SELECT 1 FROM treatments WHERE name_sv = 'Örtmedicinsk Konsultation'
);

INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active)
SELECT 'Cupping Massage (TKM)', 'Cupping Massage (TCM)', 'Traditionell kinesisk cupping-terapi för att främja blodcirkulation och lindra muskelspänningar', 'Traditional Chinese cupping therapy to promote blood circulation and relieve muscle tension',
       (SELECT id FROM treatment_categories WHERE name_sv = 'Massage & Kroppsbehandlingar' ORDER BY id LIMIT 1),
       'tcm', 45, 700,
       '{"Förbättrad cirkulation", "Muskelavslappning", "Smärtlindring", "Avgiftning"}',
       '{"Improved circulation", "Muscle relaxation", "Pain relief", "Detoxification"}',
       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', true
WHERE NOT EXISTS (
  SELECT 1 FROM treatments WHERE name_sv = 'Cupping Massage (TKM)'
);

-- Ensure unique linking and insert links safely
CREATE UNIQUE INDEX IF NOT EXISTS idx_treatment_ailments_unique ON treatment_ailments (treatment_id, ailment_id);

-- Link helper: functionally select single ids
-- Abhyanga Massage
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Abhyanga Massage' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Stress & Ångest' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Abhyanga Massage' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Trötthet' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

-- Shirodhara
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Shirodhara Behandling' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Sömnproblem' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Shirodhara Behandling' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Stress & Ångest' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

-- TCM Akupunktur
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Ryggvärk' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Huvudvärk' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'medium'
FROM (SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Sömnproblem' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

-- Örtmedicinsk Konsultation
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Örtmedicinsk Konsultation' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Matsmältningsproblem' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'medium'
FROM (SELECT id FROM treatments WHERE name_sv = 'Örtmedicinsk Konsultation' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Hudproblem' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

-- Cupping Massage
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Cupping Massage (TKM)' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Ryggvärk' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);

INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness)
SELECT t.id, a.id, 'high'
FROM (SELECT id FROM treatments WHERE name_sv = 'Cupping Massage (TKM)' ORDER BY id LIMIT 1) t,
     (SELECT id FROM ailments WHERE name_sv = 'Ledvärk' ORDER BY id LIMIT 1) a
WHERE NOT EXISTS (
  SELECT 1 FROM treatment_ailments WHERE treatment_id = t.id AND ailment_id = a.id
);