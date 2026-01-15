-- Add reaction_type column to blog_likes
ALTER TABLE public.blog_likes 
ADD COLUMN reaction_type text NOT NULL DEFAULT 'like';

-- Drop the old unique constraint (which was just blog_id + visitor_id)
ALTER TABLE public.blog_likes 
DROP CONSTRAINT blog_likes_blog_id_visitor_id_key;

-- Add new unique constraint including reaction_type
-- This allows one user to have both a 'like' AND a 'celebrate' on the same blog
ALTER TABLE public.blog_likes 
ADD CONSTRAINT blog_likes_unique_reaction UNIQUE (blog_id, visitor_id, reaction_type);
