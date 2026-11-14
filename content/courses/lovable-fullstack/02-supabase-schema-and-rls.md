# Module 2 — Supabase Relational Database & Row-Level Security (RLS)

A prototype becomes a production product when it securely persists data. Lovable connects directly to Supabase, enabling real-time Postgres migrations and authentication.

### Lesson 2.1 — Schema Design & Foreign Keys

- Defining the primary tables: `profiles`, `projects`, `subscriptions`, and `audit_events`.
- Linking tables with `user_id uuid references auth.users(id) on delete cascade`.
- Enforcing Row-Level Security (RLS):
```sql
alter table public.projects enable row level security;

create policy "Users can view their own projects"
on public.projects for select
using (auth.uid() = user_id);

create policy "Users can insert their own projects"
on public.projects for insert
with check (auth.uid() = user_id);
```
