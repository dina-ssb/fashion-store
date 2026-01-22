// Display all products on the Shop page
function displayProducts() {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
   // Clear current content
    container.innerHTML = '';
    
     // Display each product
    productsData.forEach(product => {
        const productCard = `
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
        `;
        
        container.innerHTML += productCard;
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', displayProducts);