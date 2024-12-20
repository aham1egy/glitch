// لتخزين المنتجات في localStorage
function saveProductData(name, price, quantity, commission, shipping) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price, quantity, commission, shipping });
    localStorage.setItem('products', JSON.stringify(products));
}

// لحفظ البيانات عند تقديم النموذج في صفحة تسجيل المنتج
document.getElementById('productForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const commission = parseFloat(document.getElementById('productCommission').value);
    const shipping = parseFloat(document.getElementById('shippingPrice').value);

    saveProductData(name, price, quantity, commission, shipping);
    
    alert('تم حفظ المنتج بنجاح!');
    window.location.href = 'index.html';  // العودة إلى الصفحة الرئيسية
});

// لعرض المنتجات في صفحة الإحصائيات
function displayStatistics() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('statisticsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // تنظيف الجدول قبل إضافة العناصر الجديدة

    products.forEach(product => {
        const totalProduct = product.price * product.quantity;
        const totalCommission = product.commission * product.quantity;
        const totalShipping = product.shipping;
        const total = totalProduct + totalCommission + totalShipping;

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.commission}</td>
            <td>${product.shipping}</td>
            <td>${totalProduct}</td>
            <td>${totalCommission}</td>
            <td>${totalShipping}</td>
            <td>${total}</td>
        `;
    });
}

if (document.getElementById('statisticsTable')) {
    displayStatistics();
}

// لمسح البيانات المخزنة
function clearStorage() {
    localStorage.removeItem('products');
    alert('تم مسح البيانات!');
    window.location.reload();
}
// دالة الرجوع إلى الصفحة السابقة
function goBack() {
    window.history.back();
}

// دالة لحساب الفاتورة وعرض البيانات في الفاتورة
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productCommission = parseFloat(document.getElementById('productCommission').value);
    const shippingPrice = 65; // ثابت

    // حساب التوتال
    const totalProductPrice = productPrice * productQuantity;
    const totalCommission = productCommission * productQuantity;
    const totalShippingPrice = shippingPrice;
    const grandTotal = totalProductPrice + totalCommission + totalShippingPrice;

    // عرض البيانات في الفاتورة
    document.getElementById('invoiceProductName').textContent = productName;
    document.getElementById('invoiceProductPrice').textContent = productPrice + ' جنيه';
    document.getElementById('invoiceProductQuantity').textContent = productQuantity;
    document.getElementById('invoiceCommission').textContent = productCommission + ' جنيه';
    document.getElementById('invoiceShippingPrice').textContent = shippingPrice + ' جنيه';
    document.getElementById('invoiceTotalProductPrice').textContent = totalProductPrice + ' جنيه';
    document.getElementById('invoiceTotalCommission').textContent = totalCommission + ' جنيه';
    document.getElementById('invoiceTotalShippingPrice').textContent = totalShippingPrice + ' جنيه';
    document.getElementById('invoiceGrandTotal').textContent = grandTotal + ' جنيه';
});
// الحصول على البيانات المخزنة من Local Storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    let totalProfit = 0; // إجمالي الربح
    const productList = document.getElementById('productList');
    
    // مسح محتويات الجدول قبل إعادة تعبئته
    productList.innerHTML = '';

    products.forEach(product => {
        // حساب إجمالي الربح لكل منتج
        const totalProductPrice = product.productPrice * product.productQuantity;
        const totalCommission = product.productCommission * product.productQuantity;
        const totalShippingPrice = product.shippingPrice;
        const grandTotal = totalProductPrice + totalCommission + totalShippingPrice;

        // تحديث إجمالي الربح
        totalProfit += totalCommission;

        // إضافة صف جديد للجدول
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.productPrice} جنيه</td>
            <td>${product.productQuantity}</td>
            <td>${product.productCommission} جنيه</td>
            <td>${product.shippingPrice} جنيه</td>
            <td>${totalProductPrice} جنيه</td>
            <td>${totalCommission} جنيه</td>
            <td>${totalShippingPrice} جنيه</td>
            <td>${grandTotal} جنيه</td>
        `;
        productList.appendChild(row);
    });

    // تحديث إجمالي الربح
    document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
}

// مسح البيانات المخزنة
function clearData() {
    localStorage.removeItem('products');
    loadProducts(); // إعادة تحميل البيانات بعد المسح
}

// تحميل البيانات عند فتح الصفحة
window.onload = loadProducts;

// إضافة سجل بيانات العميل
document.getElementById('clientDataBtn').addEventListener('click', function() {
    document.getElementById('clientForm').style.display = 'block';
});

document.getElementById('clientDataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientNotes = document.getElementById('clientNotes').value;

    // تخزين بيانات العميل محلياً مع بيانات المنتج
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const latestProduct = products[products.length - 1];
    latestProduct.clientData = { clientName, clientPhone, clientAddress, clientNotes };

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('clientForm').style.display = 'none';  // إخفاء فورم العميل
});


// وظيفة لتحميل الصفحات ديناميكيًا
function loadPage(page) {
    // الحصول على عنصر المحتوى
    const contentDiv = document.getElementById("content");

    // عرض رسالة تحميل مؤقتة
    contentDiv.innerHTML = "<p>جاري تحميل الصفحة...</p>";

    // جلب الصفحة باستخدام fetch
    fetch(page)
        .then((response) => {
            if (!response.ok) {
                throw new Error("صفحة غير موجودة");
            }
            return response.text();
        })
        .then((html) => {
            // وضع محتوى الصفحة في div
            contentDiv.innerHTML = html;
        })
        .catch((error) => {
            contentDiv.innerHTML = `<p>حدث خطأ أثناء تحميل الصفحة: ${error.message}</p>`;
        });
}
