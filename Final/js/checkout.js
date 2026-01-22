

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if cart has items
function checkCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'shop.html';
    }
}

// Display checkout items
function displayCheckoutItems() {
    const summaryItems = document.getElementById('summaryItems');
    
    if (!summaryItems) return;
    
    summaryItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemHTML = `
            <div class="summary-item">
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="summary-item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                </div>
                <div class="summary-item-price">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
        
        summaryItems.innerHTML += itemHTML;
    });
    
    // Calculate totals
    const shipping = 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Update display
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// Handle form submit
function handleFormSubmit() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            alert('Please fill all required fields correctly.');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const email = formData.get('email');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 10;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        
        // Save checkout data for success page
        const checkoutData = {
            email: email,
            customerName: `${firstName} ${lastName}`,
            total: total.toFixed(2),
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2)
        };
        
        // Save to localStorage
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        localStorage.setItem('orderSummary', JSON.stringify(checkoutData));
        
        // Redirect to success page
        // Cart will be cleared by success.js
        window.location.href = 'success.html';
    });
}

// Format card number
function formatCardNumber() {
    const cardInput = document.querySelector('input[name="cardNumber"]');
    
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
}

// Format expiry date
function formatExpiryDate() {
    const expiryInput = document.querySelector('input[name="expiryDate"]');
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Validate CVV
function validateCVV() {
    const cvvInput = document.querySelector('input[name="cvv"]');
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkCart();
    displayCheckoutItems();
    handleFormSubmit();
    formatCardNumber();
    formatExpiryDate();
    validateCVV();
});