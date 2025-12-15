// ตัวอย่างการแจ้งเตือนเมื่อส่งฟอร์ม
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับเร็ว ๆ นี้.');
  this.reset();
});
