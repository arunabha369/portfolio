-- Create blogs table
CREATE TABLE public.blogs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  cover_image text NOT NULL,
  tags text[] NOT NULL, -- Changed ARRAY to text[] for standard SQL, or keep ARRAY if preferred specific dialect
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at date NOT NULL DEFAULT now(),
  pinned boolean NOT NULL DEFAULT false,
  CONSTRAINT blogs_pkey PRIMARY KEY (id)
);

-- Create blog_sections table (corrected spelling from blog_scetions)
CREATE TABLE public.blog_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blog_id bigint NOT NULL,
  heading text NOT NULL,
  content text,
  image text[], -- Assuming array of image URLs
  code text[], -- Assuming array of code snippets
  code_language text[],
  "order" smallint NOT NULL, -- quoted "order" as it's a reserved word
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT blog_sections_pkey PRIMARY KEY (id),
  CONSTRAINT blog_sections_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(id) ON DELETE CASCADE
);
