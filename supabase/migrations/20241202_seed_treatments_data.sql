-- Insert treatment categories
INSERT INTO treatment_categories (name_sv, name_en, description_sv, description_en, system_type) VALUES
('Ayurveda Behandlingar', 'Ayurveda Treatments', 'Traditionella ayurvediska behandlingar för balans och välbefinnande', 'Traditional Ayurvedic treatments for balance and well-being', 'ayurveda'),
('TCM Akupunktur', 'TCM Acupuncture', 'Traditionell kinesisk akupunktur för energiflöde och healing', 'Traditional Chinese acupuncture for energy flow and healing', 'tcm'),
('Örtmedicin', 'Herbal Medicine', 'Naturliga örtbaserade behandlingar och kurer', 'Natural herbal-based treatments and remedies', 'both'),
('Massage & Kroppsbehandlingar', 'Massage & Body Treatments', 'Helande massage och kroppsbehandlingar', 'Healing massage and body treatments', 'both'),
('Meditation & Mindfulness', 'Meditation & Mindfulness', 'Meditations- och mindfulnesspraktiker för inre balans', 'Meditation and mindfulness practices for inner balance', 'both');

-- Insert common ailments
INSERT INTO ailments (name_sv, name_en, description_sv, description_en, body_part, severity) VALUES
('Stress & Ångest', 'Stress & Anxiety', 'Allmän stress och ångestkänslor', 'General stress and anxiety feelings', 'mind', 'moderate'),
('Sömnproblem', 'Sleep Problems', 'Svårigheter att somna eller sova genom natten', 'Difficulty falling asleep or sleeping through the night', 'mind', 'moderate'),
('Ryggvärk', 'Back Pain', 'Smärta och obehag i ryggregionen', 'Pain and discomfort in the back region', 'back', 'moderate'),
('Huvudvärk', 'Headache', 'Spänningshuvudvärk eller migrän', 'Tension headache or migraine', 'head', 'moderate'),
('Trötthet', 'Fatigue', 'Allmän trötthet och energibrist', 'General fatigue and lack of energy', 'body', 'mild'),
('Matsmältningsproblem', 'Digestive Issues', 'Problem med matsmältningen som uppblåsthet eller förstoppning', 'Digestive problems like bloating or constipation', 'abdomen', 'mild'),
('Ledvärk', 'Joint Pain', 'Smärta och stelhet i lederna', 'Pain and stiffness in joints', 'joints', 'moderate'),
('Hudproblem', 'Skin Problems', 'Olika typer av hudproblem som eksem eller akne', 'Various skin problems like eczema or acne', 'skin', 'mild');

-- Insert treatments
INSERT INTO treatments (name_sv, name_en, description_sv, description_en, category_id, system_type, duration_minutes, price, benefits_sv, benefits_en, image_url, is_active) VALUES
('Abhyanga Massage', 'Abhyanga Massage', 'Traditionell ayurvedisk helkroppsmassage med varma oljor för djup avslappning och avgiftning', 'Traditional Ayurvedic full-body massage with warm oils for deep relaxation and detoxification', (SELECT id FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar'), 'ayurveda', 90, 950, '{"Djup avslappning", "Förbättrad cirkulation", "Avgiftning", "Förbättrad sömn"}', '{"Deep relaxation", "Improved circulation", "Detoxification", "Better sleep"}', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', true),
('Shirodhara Behandling', 'Shirodhara Treatment', 'Ayurvedisk behandling där varm olja forsaktigt strömmar över pannan för djup mental avslappning', 'Ayurvedic treatment where warm oil gently flows over the forehead for deep mental relaxation', (SELECT id FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar'), 'ayurveda', 75, 1200, '{"Mental klarhet", "Reducerad stress", "Förbättrad koncentration", "Emotionell balans"}', '{"Mental clarity", "Reduced stress", "Improved concentration", "Emotional balance"}', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', true),
('TCM Akupunktur', 'TCM Acupuncture', 'Traditionell kinesisk akupunktur för att balansera kroppens energiflöde och främja healing', 'Traditional Chinese acupuncture to balance the body''s energy flow and promote healing', (SELECT id FROM treatment_categories WHERE name_sv = 'TCM Akupunktur'), 'tcm', 60, 800, '{"Smärtlindring", "Förbättrad energi", "Stressreduktion", "Bättre sömn"}', '{"Pain relief", "Improved energy", "Stress reduction", "Better sleep"}', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', true),
('Örtmedicinsk Konsultation', 'Herbal Medicine Consultation', 'Personlig konsultation för skräddarsydd örtmedicinsk behandling baserad på dina behov', 'Personal consultation for tailored herbal medicine treatment based on your needs', (SELECT id FROM treatment_categories WHERE name_sv = 'Örtmedicin'), 'both', 45, 650, '{"Personlig behandling", "Naturlig healing", "Inga biverkningar", "Långvariga resultat"}', '{"Personalized treatment", "Natural healing", "No side effects", "Long-lasting results"}', 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800', true),
('Ayurvedisk Ansiktsbehandling', 'Ayurvedic Facial Treatment', 'Avslappnande ansiktsbehandling med ayurvediska örter och oljor för strålande hud', 'Relaxing facial treatment with Ayurvedic herbs and oils for radiant skin', (SELECT id FROM treatment_categories WHERE name_sv = 'Ayurveda Behandlingar'), 'ayurveda', 60, 750, '{"Strålande hud", "Reducerade rynkor", "Förbättrad hudton", "Djup avslappning"}', '{"Radiant skin", "Reduced wrinkles", "Improved skin tone", "Deep relaxation"}', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', true),
('Cupping Massage (TKM)', 'Cupping Massage (TCM)', 'Traditionell kinesisk cupping-terapi för att främja blodcirkulation och lindra muskelspänningar', 'Traditional Chinese cupping therapy to promote blood circulation and relieve muscle tension', (SELECT id FROM treatment_categories WHERE name_sv = 'Massage & Kroppsbehandlingar'), 'tcm', 45, 700, '{"Förbättrad cirkulation", "Muskelavslappning", "Smärtlindring", "Avgiftning"}', '{"Improved circulation", "Muscle relaxation", "Pain relief", "Detoxification"}', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', true);

-- Link treatments to ailments
INSERT INTO treatment_ailments (treatment_id, ailment_id, effectiveness) VALUES
((SELECT id FROM treatments WHERE name_sv = 'Abhyanga Massage'), (SELECT id FROM ailments WHERE name_sv = 'Stress & Ångest'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'Abhyanga Massage'), (SELECT id FROM ailments WHERE name_sv = 'Trötthet'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'Shirodhara Behandling'), (SELECT id FROM ailments WHERE name_sv = 'Sömnproblem'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'Shirodhara Behandling'), (SELECT id FROM ailments WHERE name_sv = 'Stress & Ångest'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur'), (SELECT id FROM ailments WHERE name_sv = 'Ryggvärk'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur'), (SELECT id FROM ailments WHERE name_sv = 'Huvudvärk'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'TCM Akupunktur'), (SELECT id FROM ailments WHERE name_sv = 'Sömnproblem'), 'medium'),
((SELECT id FROM treatments WHERE name_sv = 'Örtmedicinsk Konsultation'), (SELECT id FROM ailments WHERE name_sv = 'Matsmältningsproblem'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'Örtmedicinsk Konsultation'), (SELECT id FROM ailments WHERE name_sv = 'Hudproblem'), 'medium'),
((SELECT id FROM treatments WHERE name_sv = 'Cupping Massage (TKM)'), (SELECT id FROM ailments WHERE name_sv = 'Ryggvärk'), 'high'),
((SELECT id FROM treatments WHERE name_sv = 'Cupping Massage (TKM)'), (SELECT id FROM ailments WHERE name_sv = 'Ledvärk'), 'high');