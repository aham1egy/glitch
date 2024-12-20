document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // جمع البيانات من الفورم
    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientDetails = document.getElementById('clientDetails').value;

    // إنشاء كائن عميل جديد
    const client = {
        clientName,
        clientPhone,
        clientAddress,
        clientDetails
    };

    // استرجاع العملاء الحاليين من localStorage
    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    // إضافة العميل الجديد إلى قائمة العملاء
    clients.push(client);

    // تخزين العملاء مجددًا في localStorage
    localStorage.setItem('clients', JSON.stringify(clients));

    // إعادة تعيين الفورم بعد إضافة العميل
    document.getElementById('clientForm').reset();
});
