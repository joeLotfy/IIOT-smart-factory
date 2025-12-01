document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إرسال النموذج
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // تحقق بسيط (يمكن تغييره لاحقًا مع PHP)
    if (username === 'admin' && password === '552018') {
        
      //alert('تم تسجيل الدخول بنجاح!'); // رسالة تأكيد (اختيارية)
        window.location.href = 'dashboard.html'; // الانتقال إلى لوحة التحكم
    } else {
        document.getElementById('message').classList.remove('hidden'); // إظهار رسالة الخطأ
        
    }
});