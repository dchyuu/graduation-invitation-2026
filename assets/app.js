'use strict';
/* Cấu hình thiệp và địa chỉ nhận lời chúc riêng. */
const CONFIG = Object.freeze({
  name: 'Trần Duy Đức Huy',
  eventStart: '2026-11-29T10:00:00+07:00',
  eventEnd: '2026-11-29T11:00:00+07:00',
  address: 'Sảnh Hội trường A5, Trường Đại học Bách khoa – ĐHQG TP.HCM, 268 Lý Thường Kiệt, phường Diên Hồng, TP.HCM',
  mapUrl: 'https://maps.app.goo.gl/B5QTQUGW13hpyXqp9',
  guestbookUrl: "https://script.google.com/macros/s/AKfycbyV-aoNx54d7mbzarvZNUul9ltxzOsht4pr0FhK3miIX31cmR-RtbyBmfRpA8-GP6YrUQ/exec"
});
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const $toast = $('#toast');
let toastTimer;
function toast(message){$toast.textContent=message;$toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$toast.classList.remove('show'),4200)}
async function copy(text){
  if(navigator.clipboard && window.isSecureContext){try{await navigator.clipboard.writeText(text);return true}catch{}}
  try{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='-9999px';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return ok}catch{return false}
}
// Countdown theo UTC timestamp của giờ hẹn 10:00 VN (không phụ thuộc múi giờ người xem).
const startMs=Date.parse(CONFIG.eventStart),endMs=Date.parse(CONFIG.eventEnd);
function refreshCountdown(){
  const now=Date.now();let left=Math.max(0,startMs-now);
  const numbers=[Math.floor(left/86400000),Math.floor(left/3600000)%24,Math.floor(left/60000)%60,Math.floor(left/1000)%60];
  ['days','hours','minutes','seconds'].forEach((key,i)=>$('#'+key).textContent=String(numbers[i]).padStart(2,'0'));
  if(now>=startMs){$('#countdownNote').textContent=now<endMs?'Hẹn gặp Huy tại sảnh A5 ngay bây giờ!':'Cảm ơn bạn đã đồng hành trong ngày tốt nghiệp của Huy!'}
}
refreshCountdown();setInterval(refreshCountdown,1000);
// Lịch .ics đồng bộ 10:00-11:00 ngày 29/11/2026 giờ VN; đổi sang UTC 03:00-04:00.
const icsText=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Huy Graduation//Personal Invitation//VI','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:huy-graduation-meetup-20261129@personal-invitation','DTSTAMP:20261122T000000Z','DTSTART:20261129T030000Z','DTEND:20261129T040000Z','SUMMARY:Chụp ảnh tốt nghiệp cùng Trần Duy Đức Huy',`LOCATION:${CONFIG.address.replaceAll(",", "\\,")}`,'DESCRIPTION:Hẹn gặp Huy để chụp ảnh ở sảnh A5, cơ sở Lý Thường Kiệt. Đây là giờ hẹn cá nhân sau lễ buổi sáng.','END:VEVENT','END:VCALENDAR'].join('\r\n');
$('#downloadIcs').addEventListener('click',()=>{const blob=new Blob([icsText],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hen-chup-anh-tot-nghiep-Huy-29-11-2026.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Đã tạo tệp lịch 10:00–11:00 ngày 29/11/2026.');});
$('#copyAddress').addEventListener('click',async()=>toast((await copy(CONFIG.address))?'Đã sao chép địa chỉ gặp Huy!':'Không sao chép được. Bạn có thể mở Bản đồ Google.'));
$('#shareBtn').addEventListener('click',async()=>{if(location.protocol==='file:'){toast('Hãy mở thiệp mời trực tuyến để chia sẻ đường dẫn.');return}const data={title:'Thiệp mời tốt nghiệp của Trần Duy Đức Huy',text:'Mình mời bạn đến chung vui và chụp ảnh tốt nghiệp ngày 29/11/2026, 10:00–11:00 tại sảnh A5 🎓',url:location.href};if(navigator.share){try{await navigator.share(data);return}catch(e){if(e.name==='AbortError')return}}toast(await copy(location.href)?'Đã sao chép đường dẫn thiệp mời!':'Không thể sao chép tự động. Hãy sao chép đường dẫn trên trình duyệt.');});
// Animation: tôn trọng người dùng chọn giảm chuyển động.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 30px 0px'});$$('.reveal').forEach(el=>observer.observe(el));}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
// Lời chúc chỉ được gửi vào hộp thư riêng của chủ dự án.
const online = Boolean(CONFIG.guestbookUrl);
const form = $('#wishForm');
const submitBtn = $('#submitWish');
const explainer = $('#wishExplainer');
$('#guestbookMode').textContent = online ? 'GỬI RIÊNG' : 'CHƯA MỞ';
explainer.textContent = online
  ? 'Lời chúc được gửi riêng cho Huy. Huy sẽ đọc trong bảng lời chúc riêng.'
  : 'Hộp thư lời chúc đang được chuẩn bị. Bạn vui lòng quay lại sau nhé.';
submitBtn.disabled = !online;
$('#wishName').disabled = !online;
$('#wishText').disabled = !online;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!online || submitBtn.disabled || !form.reportValidity()) return;
  const name = $('#wishName').value.trim().replace(/\s+/g, ' ');
  const message = $('#wishText').value.trim();
  if (name.length < 2 || name.length > 45 || message.length < 2) {
    toast('Vui lòng nhập tên và lời chúc hợp lệ.');
    return;
  }
  submitBtn.disabled = true;
  submitBtn.textContent = 'Đang gửi...';
  try {
    const response = await fetch(CONFIG.guestbookUrl, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name, message })
    });
    if (!response.ok) throw new Error("Gửi chưa thành công");
    const result = await response.json();
    if (result.ok !== true) throw new Error("Chưa lưu được lời chúc");
    form.reset();
    explainer.textContent = 'Đã gửi lời chúc riêng cho Huy. Cảm ơn bạn nhé!';
    toast('Đã gửi lời chúc riêng cho Huy!');
  } catch {
    explainer.textContent = 'Chưa gửi được lời chúc. Nội dung vẫn còn trong biểu mẫu để bạn thử lại.';
    toast('Gửi chưa thành công. Vui lòng thử lại.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Gửi lời chúc ♡';
  }
});

// Sơ đồ trường phóng to (ảnh do Huy cung cấp).
const campusMapDialog=$('#campusMapDialog');
$('#openCampusMap').addEventListener('click',()=>campusMapDialog.showModal());
$('#closeCampusMap').addEventListener('click',()=>campusMapDialog.close());
campusMapDialog.addEventListener('click',e=>{if(e.target===campusMapDialog)campusMapDialog.close()});
