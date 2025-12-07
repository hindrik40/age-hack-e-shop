BEGIN;

-- Treatments: allow public read of active rows
DROP POLICY IF EXISTS "Allow read active treatments to all" ON public.treatments;
CREATE POLICY "Allow read active treatments to all"
ON public.treatments
FOR SELECT
USING (is_active = true);

-- Treatment categories: allow public read
DROP POLICY IF EXISTS "Allow read categories to all" ON public.treatment_categories;
CREATE POLICY "Allow read categories to all"
ON public.treatment_categories
FOR SELECT
USING (true);

-- Ailments: allow public read
DROP POLICY IF EXISTS "Allow read ailments to all" ON public.ailments;
CREATE POLICY "Allow read ailments to all"
ON public.ailments
FOR SELECT
USING (true);

-- Junction table: treatment_ailments
DROP POLICY IF EXISTS "Allow read treatment_ailments to all" ON public.treatment_ailments;
CREATE POLICY "Allow read treatment_ailments to all"
ON public.treatment_ailments
FOR SELECT
USING (true);

-- Junction table: treatment_products
DROP POLICY IF EXISTS "Allow read treatment_products to all" ON public.treatment_products;
CREATE POLICY "Allow read treatment_products to all"