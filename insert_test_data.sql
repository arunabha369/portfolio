-- Insert a test blog and its sections
WITH new_blog AS (
  INSERT INTO public.blogs (title, slug, description, cover_image, tags, is_published, pinned)
  VALUES (
    'The Future of AI: Beyond Generative Models',
    'future-of-ai-beyond-generative',
    'Exploring the next frontiers of Artificial Intelligence, from reasoning agents to embodied AI.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000',
    ARRAY['AI', 'Technology', 'Future'],
    true,
    false
  )
  RETURNING id
)
INSERT INTO public.blog_sections (blog_id, heading, content, "order", code, code_language)
SELECT
  id,
  'Introduction',
  'Generative AI has taken the world by storm, but what comes next? We are moving towards systems that can reason and act.',
  1,
  NULL,
  NULL
FROM new_blog
UNION ALL
SELECT
  id,
  'Reasoning Agents',
  'Reasoning agents can break down complex problems into steps. Here is a simple example of a reasoning loop in pseudocode:',
  2,
  ARRAY['function reason(problem) {
  const steps = decompose(problem);
  for (const step of steps) {
    solve(step);
  }
}'],
  ARRAY['javascript']
FROM new_blog
UNION ALL
SELECT
  id,
  'Conclusion',
  'The future is bright and autonomous.',
  3,
  NULL,
  NULL
FROM new_blog;
