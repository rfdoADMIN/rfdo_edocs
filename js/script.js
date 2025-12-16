import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'; 

// โค้ดที่เหลือของคุณ (เช่น การกำหนด URL และ Key ของ Supabase)
const SUPABASE_URL = "https://rxqfmhrxoepjdsmmnqhk.supabase.co"; 
// ... โค้ดอื่น ๆ ของคุณ

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับเร็ว ๆ นี้.');
  this.reset();
});

