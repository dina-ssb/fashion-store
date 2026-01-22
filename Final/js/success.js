// ===================================
// SUCCESS PAGE - JavaScript
// ===================================

// Generate Order Number
function generateOrderNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `#AX${year}-${random}`;
}

// Format Date
function formatDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Get Order Data from localStorage
function getOrderData() {
    // Try to get data from checkoutData first (has the actual totals)
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary') || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Get total from orderSummary if exists, otherwise calculate
    let total = 0;
    
    if (orderSummary.total) {
        total = parseFloat(orderSummary.total);
    } else if (checkoutData.total) {
        total = parseFloat(checkoutData.total);
    } else {
        // Fallback: calculate from cart
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const tax = subtotal * 0.08;
        total = subtotal + shipping + tax;
    }
    
    return {
        orderNumber: generateOrderNumber(),
        orderDate: formatDate(),
        total: total.toFixed(2),
        email: checkoutData.email || checkoutData.customerEmail || 'customer@email.com',
        cart: cart,
        orderSummary: orderSummary
    };
}

// Display Order Info
function displayOrderInfo() {
    const orderData = getOrderData();
    
    // Update order details
    const orderNumberEl = document.getElementById('orderNumber');
    const orderDateEl = document.getElementById('orderDate');
    const orderTotalEl = document.getElementById('orderTotal');
    const orderEmailEl = document.getElementById('orderEmail');
    const emailConfirmEl = document.getElementById('emailConfirm');
    
    if (orderNumberEl) orderNumberEl.textContent = orderData.orderNumber;
    if (orderDateEl) orderDateEl.textContent = orderData.orderDate;
    if (orderTotalEl) orderTotalEl.textContent = `$${orderData.total}`;
    if (orderEmailEl) orderEmailEl.textContent = orderData.email;
    if (emailConfirmEl) emailConfirmEl.textContent = orderData.email;
    
    // Save order to history
    saveOrderToHistory(orderData);
}

// Save order to history
function saveOrderToHistory(orderData) {
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orders.unshift({
        orderNumber: orderData.orderNumber,
        date: orderData.orderDate,
        total: orderData.total,
        items: orderData.cart,
        status: 'Processing',
        email: orderData.email
    });
    localStorage.setItem('orderHistory', JSON.stringify(orders));
}

// Clear cart after successful order
function clearCart() {
    // Remove cart and checkout data
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutData');
    // Keep orderSummary for display, will be removed after page unload
}

// Animation on load
function animateSuccess() {
    const content = document.getElementById('successContent');
    if (!content) return;
    
    content.style.opacity = '0';
    content.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.8s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);
}

// Celebrate with icon animation
function celebrateSuccess() {
    const icon = document.querySelector('.success-icon');
    if (!icon) return;
    
    icon.style.transform = 'scale(0)';
    
    setTimeout(() => {
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        icon.style.transform = 'scale(1)';
    }, 200);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayOrderInfo();
    animateSuccess();
    celebrateSuccess();
    
    // Clear cart after showing the info
    setTimeout(() => {
        clearCart();
    }, 2000);
});

