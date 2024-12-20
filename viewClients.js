// تحميل قائمة العملاء من localStorage
function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const tableBody = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // تفريغ الجدول قبل إضافته

    clients.forEach((client, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.clientName}</td>
            <td>${client.clientPhone}</td>
            <td>${client.clientAddress}</td>
            <td>${client.clientDetails}</td>
            <td><button onclick="deleteClient(${index})">حذف</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// حذف عميل
function deleteClient(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.splice(index, 1);  // حذف العميل من المصفوفة

    // تحديث localStorage
    localStorage.setItem('clients', JSON.stringify(clients));

    // إعادة تحميل قائمة العملاء
    loadClients();
}

// تحميل العملاء عند فتح الصفحة
window.onload = loadClients;
