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
