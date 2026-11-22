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
- Hộp thư lời chúc riêng, giới hạn ký tự. Cần cấu hình Supabase để nhận lời chúc.
- Không có RSVP.

## 5. Hộp thư lời chúc riêng

Website chỉ gửi lời chúc. Chủ dự án xem trong Supabase Dashboard, tại Table Editor → guestbook_messages.

1. Tạo dự án Supabase và chạy toàn bộ guestbook-supabase.sql. Với dự án đã dùng bản SQL cũ, chạy lại bản mới để gỡ quyền đọc công khai.
2. Điền Project URL và khóa anon/publishable vào CONFIG trong assets/app.js. Giữ khóa service_role và mật khẩu trong trang quản trị.
3. Triển khai lại website. Thử gửi lời chúc và xác nhận bản ghi trong Dashboard. Kiểm tra API với khóa anon không thể đọc bảng.

Khi chưa cấu hình, biểu mẫu hiển thị Chưa mở và khóa nút gửi. Không lưu lời chúc mới vào trình duyệt. Dữ liệu xem thử cũ vẫn nằm trong trình duyệt từng người gửi.

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

## 10. Xem và xuất lời chúc

Đăng nhập Supabase Dashboard để xem bảng guestbook_messages hoặc xuất CSV. Các trạng thái cũ được giữ để tương thích dữ liệu. Website không đọc hay hiển thị lời chúc.

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
