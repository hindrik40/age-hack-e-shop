-- Create products table (if not exists)
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create treatment_categories table
CREATE TABLE treatment_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_sv TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_sv TEXT,
    description_en TEXT,
    system_type TEXT CHECK (system_type IN ('ayurveda', 'tcm', 'both')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ailments table (åkommor)
CREATE TABLE ailments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_sv TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_sv TEXT,
    description_en TEXT,
    body_part TEXT,
    severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')) DEFAULT 'mild',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create treatments table
CREATE TABLE treatments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_sv TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_sv TEXT NOT NULL,
    description_en TEXT NOT NULL,
    category_id UUID REFERENCES treatment_categories(id) ON DELETE SET NULL,
    system_type TEXT CHECK (system_type IN ('ayurveda', 'tcm', 'both')) NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    price DECIMAL(10,2),
    benefits_sv TEXT[],
    benefits_en TEXT[],
    contraindications_sv TEXT[],
    contraindications_en TEXT[],
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create treatment_ailments junction table
CREATE TABLE treatment_ailments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    treatment_id UUID REFERENCES treatments(id) ON DELETE CASCADE NOT NULL,
    ailment_id UUID REFERENCES ailments(id) ON DELETE CASCADE NOT NULL,
    effectiveness TEXT CHECK (effectiveness IN ('high', 'medium', 'low')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(treatment_id, ailment_id)
);

-- Create treatment_products junction table
CREATE TABLE treatment_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    treatment_id UUID REFERENCES treatments(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    usage_instructions_sv TEXT,
    usage_instructions_en TEXT,
    recommended_quantity INTEGER DEFAULT 1,
    is_core_product BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(treatment_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX idx_treatments_category ON treatments(category_id);
CREATE INDEX idx_treatments_system ON treatments(system_type);
CREATE INDEX idx_treatments_active ON treatments(is_active);
CREATE INDEX idx_treatment_ailments_treatment ON treatment_ailments(treatment_id);
CREATE INDEX idx_treatment_ailments_ailment ON treatment_ailments(ailment_id);
CREATE INDEX idx_treatment_products_treatment ON treatment_products(treatment_id);
CREATE INDEX idx_treatment_products_product ON treatment_products(product_id);
CREATE INDEX idx_ailments_body_part ON ailments(body_part);

-- Grant permissions
GRANT SELECT ON treatment_categories TO anon, authenticated;
GRANT SELECT ON ailments TO anon, authenticated;
GRANT SELECT ON treatments TO anon, authenticated;
GRANT SELECT ON treatment_ailments TO anon, authenticated;
GRANT SELECT ON treatment_products TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON treatment_categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON ailments TO authenticated;
GRANT INSERT, UPDATE, DELETE ON treatments TO authenticated;
GRANT INSERT, UPDATE, DELETE ON treatment_ailments TO authenticated;
GRANT INSERT, UPDATE, DELETE ON treatment_products TO authenticated;