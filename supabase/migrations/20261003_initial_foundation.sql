-- KaiKhong.ai MVP foundation. Apply with `supabase db push` after linking a project.
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  business_name text,
  business_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  business_type text,
  pain_point text,
  source text not null default 'landing_page',
  created_at timestamptz not null default now()
);
create unique index waitlist_signups_email_lower_key on public.waitlist_signups (lower(email));

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) <= 140),
  description text,
  industry text,
  website_url text,
  target_customer text,
  business_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index businesses_owner_id_idx on public.businesses (owner_id);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null check (status in ('trialing', 'active', 'past_due', 'cancelled', 'expired')),
  plan text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index subscriptions_user_id_idx on public.subscriptions (user_id);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  provider_payment_id text not null unique,
  amount integer not null check (amount >= 0),
  currency text not null default 'THB',
  status text not null check (status in ('pending', 'successful', 'failed', 'refunded', 'cancelled')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index payments_user_id_idx on public.payments (user_id);

-- Internal event ledger enables idempotent Omise webhook handling. It has no public policy.
create table public.omise_webhook_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  event_type text not null,
  status text not null check (status in ('processing', 'processed', 'failed')),
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Keeps updated_at reliable without application-specific ORM hooks.
create or replace function public.set_updated_at() returns trigger language plpgsql security invoker as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger businesses_updated_at before update on public.businesses for each row execute procedure public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute procedure public.set_updated_at();
create trigger payments_updated_at before update on public.payments for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.waitlist_signups enable row level security;
alter table public.businesses enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.omise_webhook_events enable row level security;

-- Authenticated users only see rows they own. Service-role server code bypasses RLS for trusted work.
create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "businesses_select_own" on public.businesses for select to authenticated using ((select auth.uid()) = owner_id);
create policy "businesses_insert_own" on public.businesses for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "businesses_update_own" on public.businesses for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "businesses_delete_own" on public.businesses for delete to authenticated using ((select auth.uid()) = owner_id);
create policy "subscriptions_select_own" on public.subscriptions for select to authenticated using ((select auth.uid()) = user_id);
create policy "payments_select_own" on public.payments for select to authenticated using ((select auth.uid()) = user_id);

-- Anonymous visitors can submit their interest but cannot enumerate, modify, or delete signups.
create policy "waitlist_public_insert" on public.waitlist_signups for insert to anon, authenticated with check (true);
