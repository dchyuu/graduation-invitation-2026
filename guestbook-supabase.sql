-- Chạy trong Supabase SQL Editor cho Sổ lưu bút công khai có kiểm duyệt.
-- Lưu ý: bạn phải duyệt từng lời chúc trước khi nó xuất hiện.
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
grant select, insert on table public.guestbook_messages to anon, authenticated;

alter table public.guestbook_messages enable row level security;

-- Công khai chỉ đọc lời chúc được duyệt, không đọc các lời chúc đang chờ duyệt.
drop policy if exists "Public reads approved messages" on public.guestbook_messages;
create policy "Public reads approved messages" on public.guestbook_messages
for select to anon, authenticated using (status = 'approved');

-- Công khai chỉ được tạo lời chúc chờ duyệt; không được tự duyệt/xóa/chỉnh sửa.
drop policy if exists "Public submits pending messages" on public.guestbook_messages;
create policy "Public submits pending messages" on public.guestbook_messages
for insert to anon, authenticated with check (status = 'pending');

-- Các thao tác duyệt cần thực hiện với quyền của chủ dự án trong Supabase dashboard.
-- Duyệt thủ công: Table Editor > guestbook_messages > status => approved.
-- Không đưa service_role key vào HTML/JS.
-- Gợi ý: thiết lập CAPTCHA/rate limiting nếu website có nhiều khách hoặc bị spam.
