-- Hộp thư riêng. Chỉ chủ dự án xem trong Supabase Dashboard.
create table if not exists public.guestbook_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 2 and 45),
  message text not null check (char_length(btrim(message)) between 2 and 350),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
create index if not exists guestbook_messages_status_created_idx
  on public.guestbook_messages (status,created_at desc);

-- Cấp quyền tối thiểu để gọi REST API từ trình duyệt (RLS vẫn lọc từng hàng).
grant usage on schema public to anon, authenticated;
revoke select, update, delete on table public.guestbook_messages from anon, authenticated;
grant insert on table public.guestbook_messages to anon, authenticated;

alter table public.guestbook_messages enable row level security;

-- Gỡ quyền đọc công khai, kể cả lời chúc đã duyệt từ cấu hình cũ.
drop policy if exists "Public reads approved messages" on public.guestbook_messages;


-- Công khai chỉ được tạo lời chúc chờ duyệt; không được tự duyệt/xóa/chỉnh sửa.
drop policy if exists "Public submits pending messages" on public.guestbook_messages;
create policy "Public submits pending messages" on public.guestbook_messages
for insert to anon, authenticated with check (status = 'pending');

-- Chủ dự án xem lời chúc tại Table Editor > guestbook_messages trong Supabase Dashboard.
