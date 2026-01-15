-- Enable RLS on tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_sections ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can read published blogs
CREATE POLICY "Public can view published blogs"
ON public.blogs FOR SELECT
USING (true); -- Simply allow all reads for now, simpler for fetching

-- Policy 2: Everyone can read blog sections
CREATE POLICY "Public can view blog sections"
ON public.blog_sections FOR SELECT
USING (true);

-- Policy 3: Only Admin can Insert/Update/Delete Blogs
-- Using a check on the email from the JWT
CREATE POLICY "Admin can manage blogs"
ON public.blogs
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'arunabhabanerjee5@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arunabhabanerjee5@gmail.com');

-- Policy 4: Only Admin can Insert/Update/Delete Blog Sections
CREATE POLICY "Admin can manage blog sections"
ON public.blog_sections
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'arunabhabanerjee5@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'arunabhabanerjee5@gmail.com');
