-- Create visitors table to track unique devices
CREATE TABLE public.visitors (
  id uuid PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now()
);

-- Create counter table to store the total count
CREATE TABLE public.counter (
  id text PRIMARY KEY,
  count integer DEFAULT 0
);

-- Initialize the counter with 0
INSERT INTO public.counter (id, count) VALUES ('main', 0) ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counter ENABLE ROW LEVEL SECURITY;

-- Policy for visitors: Allow anyone to insert (since we generate UUIDs on client)
CREATE POLICY "allow insert only"
ON public.visitors
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for counter: Allow anyone to read
CREATE POLICY "allow read"
ON public.counter
FOR SELECT
TO anon
USING (true);

-- Policy for counter: Allow update (needed for the RPC function to work under some configurations, or if we were doing it clientside, but RPC bypasses RLS if defined SECURITY DEFINER. Let's add it for safety if we change approaches)
CREATE POLICY "allow update"
ON public.counter
FOR UPDATE
TO anon
USING (true);

-- Create the increment function (RPC)
-- This is safer and prevents race conditions
CREATE OR REPLACE FUNCTION increment_counter()
RETURNS void AS $$
BEGIN
  UPDATE public.counter SET count = count + 1 WHERE id = 'main';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
