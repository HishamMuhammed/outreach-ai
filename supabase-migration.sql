-- Migration: Add Multi-Channel Scripting Columns

-- Add the three new script columns to the table
ALTER TABLE public.outreach_campaigns 
ADD COLUMN email_script TEXT DEFAULT '',
ADD COLUMN linkedin_script TEXT DEFAULT '',
ADD COLUMN call_script TEXT DEFAULT '';

-- Migrate existing 'script' data to 'email_script' as a fallback so history isn't lost
UPDATE public.outreach_campaigns 
SET email_script = script 
WHERE email_script = '';

-- Optionally, you can drop the old generic 'script' column once confirmed working
-- ALTER TABLE public.outreach_campaigns DROP COLUMN script;
