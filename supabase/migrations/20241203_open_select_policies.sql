-- Enable RLS on relevant tables if not enabled
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

-- Open read access policies for anon (public)
CREATE POLICY IF NOT EXISTS "public read treatment_categories" ON treatment_categories
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read ailments" ON ailments
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read treatments" ON treatments
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read treatment_ailments" ON treatment_ailments
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read treatment_products" ON treatment_products
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read experts" ON experts
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read expert_specializations" ON expert_specializations
FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "public read expert_specialization_links"