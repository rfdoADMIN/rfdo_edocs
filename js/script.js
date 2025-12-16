// 1. นำเข้า Supabase Client ผ่าน CDN Module (ต้องใช้ type="module" ใน HTML)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'; 

// 2. กำหนด URL และ Key ที่ใช้จริง (ใช้ URL และ Key ที่คุณให้มา)
const SUPABASE_URL = "https://rxqfmhrxoepjdsmmnqhk.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_1MMLp3mTRrIi5m1Om-HdQVW_0DrHub8g"; 

// 3. สร้าง Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 4. โค้ดที่เหลือของคุณ
const documentList = document.getElementById('documentList'); // จะทำงานได้เพราะใช้ window.onload/DOMContentLoaded

async function loadDocuments() {
    documentList.innerHTML = '<tr><td colspan="5">กำลังโหลดข้อมูลเอกสาร...</td></tr>';

    // ดึงข้อมูลทั้งหมดจากตาราง documents
    const { data, error } = await supabase.from('documents').select('*').order('date', { ascending:false });

    if(error){
        documentList.innerHTML = `<tr><td colspan="5">เกิดข้อผิดพลาดในการดึงข้อมูล (ตรวจสอบ RLS Policy): ${error.message}</td></tr>`;
        console.error("Supabase API Error:", error);
        return;
    }

    if (!data || data.length === 0) {
        documentList.innerHTML = `<tr><td colspan="5">ไม่พบเอกสารในฐานข้อมูล</td></tr>`;
        return;
    }

    // สร้างตาราง
    documentList.innerHTML = '';
    data.forEach(doc => {
        let fileUrl = doc.filename; 
        // โค้ดเสริมแปลงลิงก์ Google Drive (เก็บไว้เหมือนเดิม)
        if (fileUrl && fileUrl.includes('drive.google.com/file/d/')) {
            const fileIdMatch = fileUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
            if (fileIdMatch && fileIdMatch[1]) {
                fileUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`; 
            }
        }

        const formattedDate = doc.date ? new Date(doc.date).toLocaleDateString('th-TH', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        }) : '-';

        const row = `<tr>
            <td>${doc.title}</td>
            <td>${doc.doc_number || '-'}</td>
            <td>${doc.level || 'ปกติ'}</td>
            <td>${formattedDate}</td>
            <td><a href="${fileUrl}" target="_blank">ดาวน์โหลด</a></td>
        </tr>`;
        documentList.innerHTML += row;
    });
}

// 5. เรียกใช้ฟังก์ชันเมื่อ HTML โหลดเสร็จ
window.onload = loadDocuments;

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับเร็ว ๆ นี้.');
  this.reset();
});


