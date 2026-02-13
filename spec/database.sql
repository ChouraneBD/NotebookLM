-- EXAMSIM DATABASE SPECIFICATION
-- 1. Enable Vector Extension for AI RAG
create extension if not exists vector;

-- 2. Profiles (User Data)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role text check (role in ('student', 'teacher')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Study Materials (RAG Source)
create table public.study_materials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  original_file_url text, -- Supabase Storage URL
  processed_text_content text, -- Extracted text for AI
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Vector Embeddings (For Retrieval)
create table public.document_sections (
  id uuid default gen_random_uuid() primary key,
  material_id uuid references public.study_materials(id) on delete cascade,
  content_chunk text not null,
  embedding vector(1536) -- Matches OpenAI text-embedding-3-small
);

-- 5. Exam Sessions
create table public.exams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  material_source_id uuid references public.study_materials(id),
  title text not null,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  status text check (status in ('generating', 'ready', 'completed')) default 'generating',
  score integer,
  created_at timestamp with time zone default now()
);

-- 6. Questions
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references public.exams(id) on delete cascade,
  question_text text not null,
  options jsonb, -- ["A", "B", "C", "D"]
  correct_answer text not null,
  explanation text,
  order_index integer
);

-- 7. Security Policies (RLS)
alter table profiles enable row level security;
alter table study_materials enable row level security;
alter table exams enable row level security;
