// وظيفة لإنشاء نسخة احتياطية (تصدير البيانات)
document.getElementById('backupDataBtn').addEventListener('click', function() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];

    const backupData = {
        clients,
        products
    };

    // تحويل البيانات إلى JSON
    const backupDataJson = JSON.stringify(backupData);

    // إنشاء ملف Blob من البيانات المحولة إلى JSON
    const blob = new Blob([backupDataJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // إنشاء رابط لتحميل الملف
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.json';
    a.click();

    // إلغاء الرابط بعد الضغط
    URL.revokeObjectURL(url);
});

// وظيفة لاستيراد النسخة الاحتياطية (استيراد البيانات)
document.getElementById('importBackupBtn').addEventListener('click', function() {
    // إنشاء عنصر input لتحميل الملف
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    // عند تحديد ملف
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        // قراءة محتويات الملف بعد تحميله
        reader.onload = function(e) {
            try {
                const backupData = JSON.parse(e.target.result);

                // التحقق من البيانات المستوردة
                if (backupData.clients && backupData.products) {
                    // تخزين البيانات المستوردة في localStorage
                    localStorage.setItem('clients', JSON.stringify(backupData.clients));
                    localStorage.setItem('products', JSON.stringify(backupData.products));

                    alert('تم استيراد النسخة الاحتياطية بنجاح!');
                } else {
                    alert('الملف غير صحيح. يرجى التحقق من النسخة الاحتياطية.');
                }
            } catch (error) {
                alert('حدث خطأ أثناء استيراد النسخة الاحتياطية.');
            }
        };

        // قراءة الملف كـ JSON
        reader.readAsText(file);
    });

    // فتح نافذة الاختيار لتحميل الملف
    input.click();
});


// ضبط الموسيقى
const music = document.getElementById("backgroundMusic");

// لإيقاف الموسيقى
function stopMusic() {
    music.pause();
}

// لتشغيل الموسيقى من جديد
function playMusic() {
    music.play();
}

// يمكن ربط هذه الدوال بأزرار في الصفحة إذا كنت ترغب في السماح للمستخدم بالتحكم في الموسيقى.
