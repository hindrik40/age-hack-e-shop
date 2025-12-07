-- Lägg till testdata för experter
INSERT INTO experts (name, email, bio, photo_url, years_of_experience, certifications, languages) VALUES
-- Ayurveda experter
('Dr. Priya Sharma', 'priya@ayurveda.com', 
 'Certified Ayurvedic practitioner with 15 years of experience in traditional Indian medicine. Specializes in Panchakarma therapy and herbal formulations.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+Indian+female+doctor+in+traditional+clothing%2C+warm+smile%2C+ayurvedic+clinic+background&image_size=square', 
 15, 
 '{"BAMS (Bachelor of Ayurvedic Medicine and Surgery)", "MD Ayurveda", "Panchakarma Specialist"}', 
 '{"en", "hi", "sv"}'),

('Vaidya Rajesh Patel', 'rajesh@ayurveda.com', 
 'Third-generation Ayurvedic physician specializing in chronic disease management and rejuvenation therapies.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Wise+Indian+male+doctor+with+beard%2C+traditional+clothing%2C+ayurvedic+herbs+in+background&image_size=square', 
 20, 
 '{"BAMS", "PhD Ayurveda", "Rasayana Specialist"}', 
 '{"en", "gu", "sv"}'),

-- TCM experter
('Dr. Li Wei Chen', 'liwei@tcm.com', 
 'Licensed Traditional Chinese Medicine practitioner with expertise in acupuncture and herbal medicine.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+Chinese+male+doctor+in+white+coat%2C+traditional+Chinese+medicine+clinic+background&image_size=square', 
 12, 
 '{"Licensed Acupuncturist", "TCM Herbalist", "Doctor of Traditional Chinese Medicine"}', 
 '{"en", "zh", "sv"}'),

('Master Mei Lin', 'mei@tcm.com', 
 'Qigong master and TCM practitioner specializing in energy healing and traditional Chinese therapeutic massage.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elderly+Chinese+female+master+in+traditional+robes%2C+peaceful+expression%2C+meditation+garden+background&image_size=square', 
 25, 
 '{"Qigong Master", "Tui Na Specialist", "TCM Practitioner"}', 
 '{"en", "zh", "sv"}'),

-- Anti-aging experter
('Dr. Elena Rodriguez', 'elena@antiaging.com', 
 'Medical doctor specializing in anti-aging medicine and cellular regeneration therapies.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+female+doctor+in+modern+lab+coat%2C+scientific+background%2C+confident+expression&image_size=square', 
 18, 
 '{"MD", "Board Certified Anti-Aging Medicine", "Regenerative Medicine Specialist"}', 
 '{"en", "es", "sv"}'),

('Prof. Johan Andersson', 'johan@antiaging.com', 
 'Swedish researcher and clinician in longevity medicine with focus on natural hormone optimization.',
 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+Swedish+male+doctor+in+modern+clinic%2C+scientific+equipment+background%2C+approachable+smile&image_size=square', 
 22, 
 '{"PhD Nutrition", "Anti-Aging Medicine", "Hormone Specialist"}', 
 '{"sv", "en"}');

-- Koppla experter till specialiseringar
INSERT INTO expert_specialization_links (expert_id, specialization_id) VALUES
-- Dr. Priya Sharma - Ayurveda
((SELECT id FROM experts WHERE email = 'priya@ayurveda.com'), (SELECT id FROM expert_specializations WHERE name = 'Panchakarma Therapy')),
((SELECT id FROM experts WHERE email = 'priya@ayurveda.com'), (SELECT id FROM expert_specializations WHERE name = 'Herbal Medicine')),
((SELECT id FROM experts WHERE email = 'priya@ayurveda.com'), (SELECT id FROM expert_specializations WHERE name = 'Diet & Nutrition')),

-- Vaidya Rajesh Patel - Ayurveda  
((SELECT id FROM experts WHERE email = 'rajesh@ayurveda.com'), (SELECT id FROM expert_specializations WHERE name = 'Herbal Medicine')),
((SELECT id FROM experts WHERE email = 'rajesh@ayurveda.com'), (SELECT id FROM expert_specializations WHERE name = 'Diet & Nutrition')),

-- Dr. Li Wei Chen - TCM
((SELECT id FROM experts WHERE email = 'liwei@tcm.com'), (SELECT id FROM expert_specializations WHERE name = 'Acupuncture')),
((SELECT id FROM experts WHERE email = 'liwei@tcm.com'), (SELECT id FROM expert_specializations WHERE name = 'Herbal Formulas')),

-- Master Mei Lin - TCM
((SELECT id FROM experts WHERE email = 'mei@tcm.com'), (SELECT id FROM expert_specializations WHERE name = 'Qi Gong')),
((SELECT id FROM experts WHERE email = 'mei@tcm.com'), (SELECT id FROM expert_specializations WHERE name = 'Tui Na Massage')),

-- Dr. Elena Rodriguez - Anti-aging
((SELECT id FROM experts WHERE email = 'elena@antiaging.com'), (SELECT id FROM expert_specializations WHERE name = 'Longevity Medicine')),
((SELECT id FROM experts WHERE email = 'elena@antiaging.com'), (SELECT id FROM expert_specializations WHERE name = 'Cellular Regeneration')),

-- Prof. Johan Andersson - Anti-aging
((SELECT id FROM experts WHERE email = 'johan@antiaging.com'), (SELECT id FROM expert_specializations WHERE name = 'Hormone Optimization')),
((SELECT id FROM experts WHERE email = 'johan@antiaging.com'), (SELECT id FROM expert_specializations WHERE name = 'Nutritional Therapy'));