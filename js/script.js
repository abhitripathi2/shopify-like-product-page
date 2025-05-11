console.log("JS loaded");

const mainImage = document.getElementById('currentImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    // Update the main image source
    mainImage.src = this.src;

    // Remove "active" class from all thumbnails
    thumbnails.forEach(img => img.classList.remove('active'));

    // Add "active" class to clicked one
    this.classList.add('active');
  });
});

// Size Chart Modal Logic
const openBtn = document.getElementById('openSizeChartBtn');
const modal = document.getElementById('sizeChartModal');
const closeBtn = document.getElementById('closeModalBtn');

// Open modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal with close button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Close modal on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
  }
});

// Variant Selection Logic
const colorSwatches = document.querySelectorAll('.color-swatch');
const sizeSelector = document.getElementById('sizeSelector');

colorSwatches.forEach(swatch => {
swatch.addEventListener('click', () => {
// Remove 'selected' from all swatches
colorSwatches.forEach(s => s.classList.remove('selected'));
// Add 'selected' to clicked one
swatch.classList.add('selected');


// (Optional) Log or update product image
const selectedColor = swatch.getAttribute('data-color');
console.log("Selected color:", selectedColor);
// Optional: Change image based on color
// document.getElementById('currentImage').src = `assets/images/product-${selectedColor}.jpg`;
});
});

sizeSelector.addEventListener('change', () => {
const selectedSize = sizeSelector.value;
console.log("Selected size:", selectedSize);
});

 // Compare Colours Modal
 const compareBtn = document.getElementById('compareBtn');
 const compareModal = document.getElementById('compareModal');
 const closeCompareBtn = document.getElementById('closeCompareBtn');
 const compareSwatchesContainer = document.getElementById('compareSwatches');
 
 let selectedColors = new Set();
 
 colorSwatches.forEach(swatch => {
 swatch.addEventListener('dblclick', () => {
 const color = swatch.getAttribute('data-color');
 if (selectedColors.has(color)) {
    selectedColors.delete(color);
  } else {
    selectedColors.add(color);
  }
  
  swatch.classList.toggle('selected-compare');
  console.log("Selected for compare:", Array.from(selectedColors));
});
});

compareBtn.addEventListener('click', () => {
compareSwatchesContainer.innerHTML = '';

if (selectedColors.size === 0) {
alert('Double-click color swatches to select colors to compare.');
return;
}

selectedColors.forEach(color => {
const div = document.createElement('div');
div.classList.add('swatch-box');
div.style.backgroundColor = color;
compareSwatchesContainer.appendChild(div);
});

compareModal.style.display = 'block';
});

closeCompareBtn.addEventListener('click', () => {
compareModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
if (e.target === compareModal) {
compareModal.style.display = 'none';
}
});

// Carousel Scroll Logic
const carousel = document.getElementById('pairCarousel');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

scrollLeftBtn.addEventListener('click', () => {
carousel.scrollBy({ left: -220, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
carousel.scrollBy({ left: 220, behavior: 'smooth' });
});

// Bundle Calculation Logic
const bundleProducts = document.querySelectorAll('.bundle-product');
const bundleTotal = document.getElementById('bundleTotal');
const addBundleBtn = document.getElementById('addBundleBtn');

// Calculate total bundle price
let total = 0;
bundleProducts.forEach(product => {
const price = parseFloat(product.dataset.price);
total += price;
});
//bundleTotal.textContent = $${total.toFixed(2)};
bundleTotal.textContent = `$${total.toFixed(2)}`;

// Add to cart button
addBundleBtn.addEventListener('click', () => {
alert('Bundle added to cart!');
});



document.addEventListener('DOMContentLoaded', () => {
    // Tabs Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
    button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
    
      // Add active class to clicked button and matching panel
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
    });
    });


    // Add to Cart for Related Products
document.querySelectorAll('.add-related-btn').forEach(button => {
    button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('.related-name').textContent;
    //alert(Added "${productName}" to cart!);
    alert(`Added "${productName}" to cart!`);
    });
    });

    // Cart counter logic
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');

document.querySelectorAll('.add-related-btn').forEach(button => {
button.addEventListener('click', () => {
const productName = button.parentElement.querySelector('.related-name');
if (productName) {
alert(`Added "${productName.textContent}" to cart!`);
cartCount++;
cartCountEl.textContent = cartCount;
}
});
});

// Color Swatch Selection + Save
colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
    // Remove 'selected' from all swatches
    colorSwatches.forEach(s => s.classList.remove('selected'));
    // Add 'selected' to clicked one
    swatch.classList.add('selected');
    // Save selected color to localStorage
const selectedColor = swatch.getAttribute('data-color');
localStorage.setItem('selectedColor', selectedColor);
});
});

// Size Selector + Save
sizeSelector.addEventListener('change', () => {
const selectedSize = sizeSelector.value;
localStorage.setItem('selectedSize', selectedSize);
});
// Restore saved color selection
const savedColor = localStorage.getItem('selectedColor');
if (savedColor) {
colorSwatches.forEach(swatch => {
if (swatch.getAttribute('data-color') === savedColor) {
swatch.classList.add('selected');
}
});
}

// Restore saved size selection
const savedSize = localStorage.getItem('selectedSize');
if (savedSize) {
sizeSelector.value = savedSize;
}

// Theme Toggle Logic
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
body.classList.add('dark-mode');
toggleThemeBtn.textContent = '☀️ Light Mode';
}

toggleThemeBtn.addEventListener('click', () => {
body.classList.toggle('dark-mode');
const isDark = body.classList.contains('dark-mode');
toggleThemeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
localStorage.setItem('theme', isDark ? 'dark' : 'light');
});