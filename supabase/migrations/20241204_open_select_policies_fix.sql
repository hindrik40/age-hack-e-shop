-- Enable RLS on relevant tables
ALTER TABLE IF EXISTS treatment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ailments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS treatment_ailments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS treatment_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS expert_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS expert_specialization_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS forum_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS forum_answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "public read treatment_categories" ON treatment_categories;
DROP POLICY IF EXISTS "public read ailments" ON ailments;
DROP POLICY IF EXISTS "public read treatments" ON treatments;
DROP POLICY IF EXISTS "public read treatment_ailments" ON treatment_ailments;
DROP POLICY IF EXISTS "public read treatment_products" ON treatment_products;
DROP POLICY IF EXISTS "public read experts" ON experts;
DROP POLICY IF EXISTS "public read expert_specializations" ON expert_specializations;
DROP POLICY IF EXISTS "public read expert_specialization_links" ON expert_specialization_links;
DROP POLICY IF EXISTS "public read forum_questions" ON forum_questions;
DROP POLICY IF EXISTS "public read forum_answers" ON forum_answers;

-- Create open read access policies (apply to all roles)
CREATE POLICY "public read treatment_categories" ON treatment_categories
FOR SELECT USING (true);

CREATE POLICY "public read ailments" ON ailments
FOR SELECT USING (true);

CREATE POLICY "public read treatments" ON treatments
FOR SELECT USING (true);

CREATE POLICY "public read treatment_ailments" ON treatment_ailments
FOR SELECT USING (true);

CREATE POLICY "public read treatment_products" ON treatment_products
FOR SELECT USING (true);

CREATE POLICY "public read experts" ON experts
FOR SELECT USING (true);

CREATE POLICY "public read expert_specializations" ON expert_specializations
FOR SELECT USING (true);

CREATE POLICY "public read expert_specialization_links" ON expert_specialization_links
FOR SELECT USING (true);

CREATE POLICY "public read forum_questions" ON forum_questions
FOR SELECT USING (true);

CREATE POLICY "public read forum_answers" ON forum_answers
FOR SELECT USING (true);