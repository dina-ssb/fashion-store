// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

// Find product from data
function getProductById(id) {
    return productsData.find(p => p.id === id);
}

// Display product details
function displayProductDetails() {
    const productId = getProductIdFromURL();
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }
    
     // Update page title
    document.title = `${product.name} - THE ANNEX`;
    
    // Display main image
    document.getElementById('mainImage').src = product.image;
    document.getElementById('mainImage').alt = product.name;
    
    // Display product details
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.fullDescription;
    
   // Display specifications
    const specsHTML = `
        <li><strong>Material:</strong> ${product.material}</li>
        <li><strong>Weight:</strong> ${product.weight}</li>
        <li><strong>Fit:</strong> ${product.fit}</li>
        <li><strong>Care:</strong> ${product.care}</li>
        <li><strong>Made in:</strong> ${product.madeIn}</li>
    `;
    document.getElementById('productSpecs').innerHTML = specsHTML;
    
    // Display only one thumbnail
    displayThumbnails(product);
    
    // Display related products
    displayRelatedProducts(product.id);
}

// Display only one thumbnail
function displayThumbnails(product) {
    const thumbnailRow = document.getElementById('thumbnailRow');
    thumbnailRow.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="thumb active">
    `;
}

// Display related products
function displayRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('relatedProducts');
    const relatedProducts = productsData.filter(p => p.id !== currentProductId).slice(0, 3);
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="btn">View Details</a>
            </div>
        </div>
    `).join('');
}

// Size selection function
function setupSizeSelector() {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Quantity control function
function setupQuantityControls() {
    const input = document.getElementById('quantityInput');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    decreaseBtn.addEventListener('click', () => {
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        if (input.value < 99) {
            input.value = parseInt(input.value) + 1;
        }
    });
}

// Add to Cart function
function setupAddToCart() {
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const productId = getProductIdFromURL();
        const product = getProductById(productId);
        const selectedSize = document.querySelector('.size-option.active').dataset.size;
        const quantity = parseInt(document.getElementById('quantityInput').value);
        
        // Save to localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Success message
        alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    setupSizeSelector();
    setupQuantityControls();
    setupAddToCart();
});