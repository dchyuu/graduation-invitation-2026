'use strict';
/* Chỉ cần sửa các giá trị trong CONFIG. Giữ Supabase trống cho bản demo. */
const CONFIG = Object.freeze({
  name: 'Trần Duy Đức Huy',
  eventStart: '2026-11-29T10:00:00+07:00',
  eventEnd: '2026-11-29T11:00:00+07:00',
  address: 'Sảnh Hội trường A5, Trường Đại học Bách khoa – ĐHQG TP.HCM, 268 Lý Thường Kiệt, phường Diên Hồng, TP.HCM',
  mapUrl: 'https://maps.app.goo.gl/B5QTQUGW13hpyXqp9',
  supabaseUrl: '', // Ví dụ: 'https://abcdefgh.supabase.co'
  supabaseAnonKey: '' // Public anon/publishable key, KHÔNG dùng service_role key.
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
// Hiển thị ảnh chân dung khi đã có tệp.
const portrait = $('#portraitImage');
portrait.addEventListener('load', () => {
  portrait.style.display = 'block';
  $('#portraitFallback').hidden = true;
});
portrait.addEventListener('error', () => portrait.removeAttribute('src'));
portrait.src = portrait.dataset.src;

// Animation: tôn trọng người dùng chọn giảm chuyển động.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 30px 0px'});$$('.reveal').forEach(el=>observer.observe(el));}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
// Guestbook: nếu cấu hình Supabase -> chia sẻ lời chúc được duyệt giữa các thiết bị.
// Nếu chưa cấu hình -> localStorage demo CHỈ trong trình duyệt hiện tại, có cảnh báo rõ.
const online=Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey);
const localKey='huy-graduation-guestbook-preview-v2';
const msgList=$('#wishList'),form=$('#wishForm'),submitBtn=$('#submitWish');
if(online){$('#guestbookMode').textContent='CÓ KIỂM DUYỆT';$('#guestbookMode').classList.add('online');$('#wishExplainer').textContent='Lời chúc sẽ được gửi đi và hiển thị công khai sau khi Huy duyệt nội dung.';$('#wishExplainer').classList.add('online')}
const chars=$('#charsLeft');$('#wishText').addEventListener('input',()=>chars.textContent=`${$('#wishText').value.length} / 350 ký tự`);
function localMessages(){try{const data=JSON.parse(localStorage.getItem(localKey)||'[]');return Array.isArray(data)?data:[]}catch{return []}}
function renderWishes(messages){msgList.replaceChildren();$('#wishCount').textContent=messages.length+' lời chúc';if(!messages.length){const p=document.createElement('p');p.className='no-wishes';p.textContent=online?'Chưa có lời chúc được duyệt. Hãy gửi lời chúc đầu tiên nhé!':'Chưa có lời chúc nào trên thiết bị này. Hãy để lại lời chúc đầu tiên nhé!';msgList.append(p);return}
  messages.forEach(item=>{const article=document.createElement('article');article.className='wish-card';const name=document.createElement('strong');name.textContent=item.name;const date=document.createElement('time');const parsed=new Date(item.created_at);date.textContent=isNaN(parsed.getTime())?'':parsed.toLocaleDateString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',day:'2-digit',month:'2-digit',year:'numeric'});const message=document.createElement('p');message.textContent=item.message;article.append(name,date,message);msgList.append(article)});
}
async function readOnlineWishes(){
  try{const url=`${CONFIG.supabaseUrl.replace(/\/$/,'')}/rest/v1/guestbook_messages?select=name,message,created_at&status=eq.approved&order=created_at.desc&limit=100`;const res=await fetch(url,{headers:{apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`}});if(!res.ok)throw Error('status '+res.status);renderWishes(await res.json());}
  catch{renderWishes([]);toast('Không tải được lời chúc. Vui lòng thử lại.');}
}
if(online)readOnlineWishes();else renderWishes(localMessages());
form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const name=$('#wishName').value.trim().replace(/\s+/g,' '),message=$('#wishText').value.trim();
  if(name.length<2 || name.length>45 || message.length<2 || message.length>350){toast('Vui lòng nhập tên và lời chúc hợp lệ.');return}
  submitBtn.disabled=true;submitBtn.textContent='Đang gửi...';
  try{
    if(online){const url=`${CONFIG.supabaseUrl.replace(/\/$/,'')}/rest/v1/guestbook_messages`;const res=await fetch(url,{method:'POST',headers:{apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({name,message,status:'pending'})});if(!res.ok)throw Error('HTTP '+res.status);toast('Đã nhận lời chúc! Nội dung sẽ hiện sau khi được duyệt.');await readOnlineWishes()}
    else{const item={name,message,created_at:new Date().toISOString()};const all=[item,...localMessages()].slice(0,100);localStorage.setItem(localKey,JSON.stringify(all));renderWishes(all);toast('Đã lưu lời chúc trên thiết bị này (bản xem thử, chưa chia sẻ công khai).')}
    form.reset();chars.textContent='0 / 350 ký tự';
  }catch{toast(online?'Gửi lời chúc chưa thành công. Vui lòng thử lại.':'Không thể lưu trên trình duyệt này.');}
  finally{submitBtn.disabled=false;submitBtn.textContent='Gửi lời chúc ♡'}
});


// Sơ đồ trường phóng to (ảnh do Huy cung cấp).
const campusMapDialog=$('#campusMapDialog');
$('#openCampusMap').addEventListener('click',()=>campusMapDialog.showModal());
$('#closeCampusMap').addEventListener('click',()=>campusMapDialog.close());
campusMapDialog.addEventListener('click',e=>{if(e.target===campusMapDialog)campusMapDialog.close()});
