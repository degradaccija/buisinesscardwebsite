-- 0002_contact_trigger.sql — notify owner on new contact_messages (spec §5)

create extension if not exists pg_net;

-- Private settings table (no public policies; only service role/owner can read).
-- The notify secret is inserted here (matches edge function env NOTIFY_SECRET).
create table if not exists app_settings (
  key text primary key,
  value text not null,
  created_at timestamptz not null default now()
);

alter table app_settings enable row level security;

-- The function URL below uses <SUPABASE_FUNCTIONS_URL>, replaced automatically
-- by `supabase db push`. When pasting manually, replace it with:
--   https://<project-ref>.supabase.co/functions/v1/contact-notify

create or replace function notify_contact_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  function_url text := '<SUPABASE_FUNCTIONS_URL>/contact-notify';
  notify_secret text;
begin
  select value into notify_secret from public.app_settings where key = 'notify_secret';
  notify_secret := coalesce(notify_secret, '');
  perform net.http_post(
    url := function_url,
    body := jsonb_build_object('record', row_to_json(new)),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-notify-secret', notify_secret
    )
  );
  return new;
exception
  when others then
    raise warning 'contact-notify failed: %', sqlerrm;
    return new;
end;
$$;

drop trigger if exists on_contact_insert on contact_messages;
create trigger on_contact_insert
after insert on contact_messages
for each row execute function notify_contact_insert();
