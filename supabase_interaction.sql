-- 1. PROFILES TABLE (Syncs with Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. BLOG LIKES TABLE (Visitor based)
create table public.blog_likes (
  id uuid default gen_random_uuid() primary key,
  blog_id bigint references public.blogs(id) on delete cascade not null,
  visitor_id uuid not null, -- Stores ID from localStorage
  created_at timestamp with time zone default now(),
  unique(blog_id, visitor_id) -- Prevent duplicate likes
);

alter table public.blog_likes enable row level security;

create policy "Likes are public" on public.blog_likes for select using (true);
create policy "Anyone can like" on public.blog_likes for insert with check (true);
create policy "Anyone can unlike" on public.blog_likes for delete using (true);


-- 3. BLOG COMMENTS TABLE (Auth based)
create table public.blog_comments (
  id uuid default gen_random_uuid() primary key,
  blog_id bigint references public.blogs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table public.blog_comments enable row level security;

create policy "Comments are public" on public.blog_comments for select using (true);

create policy "Authenticated users can comment" on public.blog_comments 
  for insert 
  to authenticated 
  with check (auth.uid() = user_id);

create policy "Users can delete own comments" on public.blog_comments 
  for delete 
  using (auth.uid() = user_id);
