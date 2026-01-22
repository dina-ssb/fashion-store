
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
   
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateSummary(0, 0, 0);
        return;
    }
    
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemHTML = `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-size">Size: ${item.size}</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn" type="button" onclick="changeQuantity(${index}, -1)">−</button>
                    <input type="number" value="${item.quantity}" min="1" max="99" readonly>
                    <button class="qty-btn" type="button" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
                <button class="item-remove" type="button" onclick="removeItem(${index})" title="Remove item">×</button>
            </div>
        `;
        
        cartItems.innerHTML += cartItemHTML;
    });
    
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    updateSummary(subtotal, tax, total);
}


function updateSummary(subtotal, tax, total) {
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}


function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    if (cart[index].quantity > 99) {
        cart[index].quantity = 99;
    }
    
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function removeItem(index) {
    
    if (confirm('Are you sure you want to remove this item?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}


document.addEventListener('DOMContentLoaded', renderCart);