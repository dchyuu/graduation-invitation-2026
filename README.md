# Website thiệp mời tốt nghiệp – Trần Duy Đức Huy

## 1. Thông tin đã cập nhật

- **Lễ tốt nghiệp:** Chủ nhật, **29/11/2026**; buổi sáng bắt đầu **07:30** tại Hội trường **A5**.
- **Giờ hẹn cá nhân chụp ảnh:** **10:00–11:00 ngày 29/11/2026** (giờ Việt Nam); sau khi buổi lễ sáng kết thúc.
- **Điểm hẹn:** **Sảnh Hội trường A5**, cơ sở 1 Trường Đại học Bách khoa – ĐHQG TP.HCM, **268 Lý Thường Kiệt, phường Diên Hồng, TP.HCM**.
- **Google Maps:** https://maps.app.goo.gl/B5QTQUGW13hpyXqp9 (link bạn gửi, trỏ đến khuôn viên trường; tìm sảnh A5 bên trong khuôn viên).
- **Liên hệ ngày lễ:** Trần Xuân Hảo – 0834 125 202.
- **RSVP:** không có, đúng như yêu cầu.
- **Chủ đề:** HCMUT-inspired xanh đậm – xanh điện – trắng, điểm nhấn đỏ; không phải website chính thức của trường.

## 2. Xem thử

Mở `index.html` bằng Chrome hoặc Edge. Bạn không cần cài đặt bất kỳ thư viện nào.

## 3. Ảnh chân dung

Đặt ảnh chân dung tốt nghiệp tại `assets/photos/portrait.jpg`. Trang dùng hình minh họa khi chưa có ảnh.

## 4. Các tính năng đang chạy

- Responsive trên điện thoại và desktop.
- Hiệu ứng cuộn nhẹ, có tính đến chế độ *Reduce Motion*.
- Đếm ngược chính xác đến **10:00 ngày 29/11/2026 giờ VN**.
- Lịch trình buổi sáng **07:00–10:00** và khung gặp cá nhân **10:00–11:00** riêng biệt.
- Tải file lịch `.ics` cho cuộc hẹn **10:00–11:00**, hoặc mở Google Calendar.
- Google Maps dùng link do bạn gửi, bản đồ nhúng khu vực 268 Lý Thường Kiệt.
- Nút chia sẻ sau khi website được đưa lên URL công khai.
- Sổ lưu bút có biểu mẫu, giới hạn ký tự, và chế độ xem thử bằng localStorage trên chính thiết bị đó.
- Không có RSVP.

## 5. Quan trọng: làm sổ lưu bút hiển thị cho mọi người

**Mặc định, các lời chúc chỉ lưu trong trình duyệt của người gửi. Người khác sẽ không thấy.** Đây là chế độ demo, có nhãn cảnh báo trên website. Để khách gửi lời chúc và Huy có thể duyệt rồi công khai:

1. Tạo một **Supabase** project miễn phí tại https://supabase.com/.
2. Vào **SQL Editor**, chạy toàn bộ nội dung file `guestbook-supabase.sql` đi kèm.
3. Vào **Project Settings → API Keys** để lấy **publishable/anon key**, và **Project URL**.
4. Mở `assets/app.js`, tìm `CONFIG` ở đầu file, điền `supabaseUrl` và `supabaseAnonKey`. **Không bao giờ đưa service_role/secret key vào trình duyệt!**
5. Mở website và gửi một lời chúc thử. Trong Supabase **Table Editor → guestbook_messages**, bạn sẽ thấy dòng mới có `status = pending`.
6. Kiểm tra nội dung, đổi `status` thành `approved` để hiện cho tất cả khách. Có thể dùng `rejected` để ẩn.

Khi kết nối thành công, website sẽ tự hiện **CÓ KIỂM DUYỆT** thay cho **BẢN XEM THỬ**. Chỉ lời chúc đã duyệt được đọc công khai. Nếu gặp spam, thiết lập rate limiting hoặc CAPTCHA ở lớp API/trang web trước khi chia sẻ rộng.

Nếu **không muốn dùng database** bạn vẫn có thể dùng web trước buổi lễ, nhưng nên coi sổ lưu bút là bản demo chứ không phải hệ thống nhận lời chúc chung.

## 6. Đăng website cho mọi người xem

### Cách dễ: Netlify Drop

1. Truy cập https://app.netlify.com/drop, đăng nhập.
2. Kéo **cả thư mục** `hcmut-graduation-huy` vào vùng triển khai (hoặc dùng ZIP nếu dịch vụ hỗ trợ giải nén).
3. Nhận link `https://...netlify.app` rồi mở thử trên điện thoại.
4. Trong `index.html`, bổ sung thẻ `<meta property="og:image" content="https://<địa-chỉ-web>/assets/social-cover.png">` bằng URL thật sau khi deploy, để ứng dụng chat có cơ hội hiện ảnh preview.
5. Test link Google Maps, gọi điện và lịch hẹn trước khi gửi.

### Hoặc GitHub Pages

Tạo repository public, push các file và bật `Settings → Pages → Deploy from a branch`. Đặt `index.html` ở thư mục root.

## 7. Những chỗ dễ chỉnh

- `assets/app.js`: ngày giờ, địa chỉ, URL Supabase.
- `index.html`: nội dung lời mời và lịch trình.
- `assets/styles.css`: màu sắc, kiểu chữ, bố cục.

## 8. Các chi tiết kiểm chứng

Chương trình lễ tóm tắt trong website được biên tập từ **ảnh thiệp chính thức bạn gửi**. Mình không tự suy ra thời gian khác ngoài ảnh. Mốc **10:00–11:00** là **giờ hẹn riêng do bạn cung cấp**, không phải một phần trong chương trình của trường.

**Chưa thể cung cấp link website đã deploy** vì việc đăng trên Netlify/GitHub Pages cần tài khoản/ quyền của bạn; mã nguồn đã sẵn sàng.

## 9. Cập nhật bổ sung: Cổng 1, sơ đồ và logo chính thức

- **Gửi xe tại Cổng 1 (đường Lý Thường Kiệt)**, theo yêu cầu của Huy. Sau khi gửi xe, đi bộ đến **Sảnh A5**, gần khu A4 theo sơ đồ trường.
- `assets/campus-map.webp`: ảnh hiển thị nhẹ trên website; `assets/campus-map.png`: ảnh gốc để mở lớn và phóng to. Bản đồ này do Huy gửi trong hội thoại.
- Nút **Xem sơ đồ** ở phần thông tin, và hộp thoại phóng to ảnh ở phần vị trí; trên điện thoại có thể chọn **Mở ảnh gốc** để phóng to.
- **Logo BK TP.HCM được sử dụng đúng theo ảnh Trần Duy Đức Huy cung cấp**: lưu cục bộ tại `assets/logo-bk-tphcm.png`, gắn ở đầu trang, chân trang và làm favicon. Ảnh không phụ thuộc vào máy chủ ngoài.
- Logo và tên HCMUT chỉ dùng để giới thiệu ngữ cảnh thiệp mời cá nhân; trang web không phải đại diện trường.

## 10. Xem lại và xuất lời chúc sau ngày lễ

### Chế độ hiện tại (chưa thiết lập Supabase)
Lời chúc lưu trong `localStorage` của trình duyệt **người nhập**, theo key `huy-graduation-guestbook-preview-v2`. Huy không thể xem tập trung lời chúc của khách ở thiết bị khác. Các lời chúc có thể mất khi xóa dữ liệu website, đổi trình duyệt, hoặc xóa bộ nhớ. **Không dùng chế độ này làm sổ lưu bút chính thức.**

### Chế độ trực tuyến (Supabase)
- Khách gửi lời chúc → Supabase bảng `public.guestbook_messages` với `status='pending'`.
- Chủ website mở **Supabase Dashboard → Table Editor → public → guestbook_messages** để xem mọi lời chúc và ngày giờ gửi, kể cả chưa duyệt.
- Chuyển `status` thành `approved` để nội dung xuất hiện công khai. `rejected` để ẩn.
- Trong Table Editor có thể dùng chức năng Export CSV để tải dữ liệu dự phòng. Chỉ người có quyền truy cập dự án Supabase được xem tất cả lời chúc.
- Mẫu SQL xem mọi lời chúc trong SQL Editor:

```sql
select id, name, message, status,
       created_at at time zone 'Asia/Ho_Chi_Minh' as time_vietnam
from public.guestbook_messages
order by created_at desc;
```

**Không đăng URL quản trị, mật khẩu hoặc `service_role`/`secret` key trong repo GitHub.** `anon/publishable` key chỉ dùng với Supabase Row Level Security như script SQL đính kèm. Nên bổ sung CAPTCHA/rate limiting trước khi chia sẻ rộng vì form cho người dùng ẩn danh có thể bị spam.

## 11. Xuất bản lên GitHub Pages

Trạng thái tại lúc xuất bản mã nguồn: GitHub đã kết nối tài khoản `dchyuu`, nhưng chưa có repository thiệp mời. Công cụ GitHub được kết nối hỗ trợ ghi file vào repository **đã tồn tại**, chưa hỗ trợ tạo repository mới hoặc bật Pages. Chưa có đường link công khai.

Để triển khai bằng GitHub Pages:
1. Vào `https://github.com/new`, tạo **public repository** tên gợi ý `graduation-invitation-2026`, không cần README hay file mẫu.
2. Đưa tất cả file từ thư mục website này vào gốc repository (không chỉ ZIP).
3. Trong GitHub repository, vào `Settings → Pages → Build and deployment` chọn **Deploy from a branch**, branch `main`, thư mục `/(root)` rồi Save.
4. URL thường có dạng `https://dchyuu.github.io/graduation-invitation-2026/` **sau khi GitHub Pages báo thành công**. Không gửi URL trước khi kiểm tra trạng thái Pages.
5. Cập nhật `og:image` thành một URL tuyệt đối của file `assets/social-cover.png` dựa trên URL website đã thực sự xuất bản, ví dụ `https://dchyuu.github.io/graduation-invitation-2026/assets/social-cover.png`.
6. Thiết lập Supabase và thử gửi/duyệt/xem lời chúc trước khi gửi thiệp.
7. Kiểm tra trên điện thoại bằng 4G, nút Maps, lịch, xem sơ đồ lớn, form lời chúc và nút gọi.
