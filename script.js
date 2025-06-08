// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle hamburger menu
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const productCards = document.querySelectorAll('.product-card');
const bundleCards = document.querySelectorAll('.bundle-card');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Search in product cards
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Search in bundle cards
    bundleCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements when they come into view
document.querySelectorAll('.product-card, .bundle-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Product Review System
const modal = document.getElementById('reviewModal');
const closeModal = document.querySelector('.close-modal');
const submitReviewBtn = document.getElementById('submitReview');
const ratingStars = document.querySelectorAll('.rating-input .star');

// Sample reviews data (in a real application, this would come from a database)
const reviewsData = {
    1: [
        { author: 'John D.', rating: 5, text: 'Amazing product! The quality is outstanding.', date: '2024-03-15' },
        { author: 'Sarah M.', rating: 4, text: 'Great features, but a bit pricey.', date: '2024-03-10' }
    ],
    2: [
        { author: 'Mike R.', rating: 5, text: 'Perfect for daily use!', date: '2024-03-14' },
        { author: 'Lisa K.', rating: 4, text: 'Good product, fast delivery.', date: '2024-03-08' }
    ],
    // Add more reviews for other products...
};

let currentProductId = null;
let selectedRating = 0;

// Open modal when clicking on a product
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.dataset.productId;
        currentProductId = productId;
        
        // Update modal content
        const productImage = card.querySelector('img').src;
        const productName = card.querySelector('h3').textContent;
        const productDescription = card.querySelector('p').textContent;
        
        document.getElementById('modalProductImage').src = productImage;
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalProductDescription').textContent = productDescription;
        
        // Display reviews
        displayReviews(productId);
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle star rating selection
ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        selectedRating = rating;
        
        // Update stars display
        ratingStars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.rating) <= rating);
        });
    });
    
    star.addEventListener('mouseover', () => {
        const rating = parseInt(star.dataset.rating);
        ratingStars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.rating) <= rating);
        });
    });
    
    star.addEventListener('mouseout', () => {
        ratingStars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating);
        });
    });
});

// Display reviews for a product
function displayReviews(productId) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';
    
    const reviews = reviewsData[productId] || [];
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <div class="review-text">${review.text}</div>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// Submit review
submitReviewBtn.addEventListener('click', () => {
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (!selectedRating) {
        alert('Please select a rating');
        return;
    }
    
    if (!reviewText) {
        alert('Please write a review');
        return;
    }
    
    // In a real application, this would send the review to a server
    const newReview = {
        author: 'You',
        rating: selectedRating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    };
    
    if (!reviewsData[currentProductId]) {
        reviewsData[currentProductId] = [];
    }
    
    reviewsData[currentProductId].unshift(newReview);
    displayReviews(currentProductId);
    
    // Reset form
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    ratingStars.forEach(star => star.classList.remove('active'));
    
    // Update product card rating
    updateProductRating(currentProductId);
});

// Update product card rating
function updateProductRating(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const reviews = reviewsData[productId] || [];
    
    if (reviews.length > 0) {
        const averageRating = Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length);
        const starsElement = productCard.querySelector('.stars');
        const reviewCountElement = productCard.querySelector('.review-count');
        
        starsElement.textContent = '★'.repeat(averageRating) + '☆'.repeat(5-averageRating);
        reviewCountElement.textContent = `(${reviews.length} reviews)`;
    }
} 