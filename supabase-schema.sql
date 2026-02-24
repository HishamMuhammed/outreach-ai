-- Enable Row Level Security (RLS)
CREATE TABLE public.outreach_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    lead_name TEXT NOT NULL,
    lead_company TEXT NOT NULL,
    product_info TEXT NOT NULL,
    script TEXT NOT NULL,
    talking_points TEXT NOT NULL,
    research TEXT NOT NULL,
    analysis TEXT NOT NULL,
    objections TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on RLS
ALTER TABLE public.outreach_campaigns ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own outreach campaigns
CREATE POLICY "Users can insert their own outreach campaigns" ON public.outreach_campaigns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to select their own outreach campaigns
CREATE POLICY "Users can view their own outreach campaigns" ON public.outreach_campaigns
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to delete their own outreach campaigns
CREATE POLICY "Users can delete their own outreach campaigns" ON public.outreach_campaigns
    FOR DELETE USING (auth.uid() = user_id);
