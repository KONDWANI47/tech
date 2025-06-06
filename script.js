// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Buy button functionality
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').textContent;
        const contactForm = document.getElementById('contact-form');
        const contactSection = document.getElementById('contact');
        
        // Scroll to contact form
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add highlight effect to the form
        contactForm.classList.add('highlight');
        
        // Pre-fill the message with product information
        const messageTextarea = contactForm.querySelector('textarea');
        messageTextarea.value = `I'm interested in purchasing: ${productName}`;
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            contactForm.classList.remove('highlight');
        }, 2000);
    });
});

// Search Form Functionality
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchForm.querySelector('.search-input').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            card.style.display = 'block';
            // Scroll to the first matching product
            if (card.style.display === 'block') {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            card.style.display = 'none';
        }
    });
});

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide initially
    showSlide(currentSlide);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});

// Subscribe Form Functionality
const subscribeForm = document.querySelector('.subscribe-form');
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    
    // Here you would typically send this to your backend
    // For now, we'll just show a success message
    alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
    subscribeForm.reset();
});

// Story Submission Form
const storyForm = document.querySelector('.story-form');
if (storyForm) {
    storyForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const storyData = {
            title: formData.get('title'),
            author: formData.get('author'),
            email: formData.get('email'),
            category: formData.get('category'),
            story: formData.get('story'),
            image: formData.get('image')
        };

        try {
            // Send story to admin emails
            const adminEmails = ['cupicsart@gmail.com', 'mmphadzula@gmail.com'];
            const emailSubject = `New Story Submission: ${storyData.title}`;
            
            // Send to admins
            for (const email of adminEmails) {
                await sendEmail(email, emailSubject, storyData, false);
            }

            // Send auto-reply to author
            await sendEmail(storyData.email, 'Thank You for Your Story Submission - Tech & Style', storyData, true);

        // Create new blog post element
        const newBlogPost = document.createElement('article');
        newBlogPost.className = 'blog-post';
        
        // Get current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create blog post content
        newBlogPost.innerHTML = `
            <div class="blog-image">
                <img src="${storyData.image ? URL.createObjectURL(storyData.image) : 'default-blog.jpg'}" alt="${storyData.title}">
            </div>
            <div class="blog-content">
                <h3>${storyData.title}</h3>
                <p class="blog-meta">Posted by ${storyData.author} on ${formattedDate}</p>
                <p>${storyData.story.substring(0, 200)}${storyData.story.length > 200 ? '...' : ''}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;

        // Add the new post to the top of the blog grid
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.insertBefore(newBlogPost, blogGrid.firstChild);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
                <p>Your story has been submitted successfully and sent to our team for review!</p>
        `;
        
        // Replace form with success message
        this.innerHTML = '';
        this.appendChild(successMessage);

        // Add success message styles
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                text-align: center;
                padding: 2rem;
                animation: fadeIn 0.5s ease;
            }
            .success-message i {
                font-size: 4rem;
                color: #2ecc71;
                margin-bottom: 1rem;
            }
            .success-message h3 {
                color: #2c3e50;
                font-size: 1.8rem;
                margin-bottom: 1rem;
            }
            .success-message p {
                color: #666;
                font-size: 1.1rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);

        // Scroll to the new post
        newBlogPost.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Error submitting story:', error);
            alert('There was an error submitting your story. Please try again later.');
        }
    });
}

// Email sending function
async function sendEmail(to, subject, storyData, isAutoReply = false) {
    try {
        // Convert image to base64 if present
        let imageBase64 = null;
        if (storyData.image && storyData.image.size > 0) {
            imageBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(storyData.image);
            });
        }

        // Create HTML email content
        const emailContent = isAutoReply ? 
            createAutoReplyTemplate(storyData) : 
            createAdminNotificationTemplate(storyData, imageBase64);

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: isAutoReply ? 'YOUR_AUTO_REPLY_TEMPLATE_ID' : 'YOUR_ADMIN_TEMPLATE_ID',
                user_id: 'YOUR_USER_ID',
                template_params: {
                    to_email: to,
                    subject: subject,
                    message: emailContent,
                    story_title: storyData.title,
                    author_name: storyData.author,
                    author_email: storyData.email,
                    category: storyData.category,
                    story_content: storyData.story,
                    submission_date: new Date().toLocaleString(),
                    story_image: imageBase64
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        // Create notification for admin emails
        if (!isAutoReply) {
            createEmailNotification(to, subject, storyData);
        }

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Create email notification
function createEmailNotification(to, subject, storyData) {
    const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    const newNotification = {
        title: subject,
        from: storyData.email,
        time: new Date().toLocaleString(),
        content: `New story submission from ${storyData.author}: "${storyData.title}"`,
        read: false,
        type: 'story_submission',
        storyData: {
            title: storyData.title,
            author: storyData.author,
            category: storyData.category,
            story: storyData.story
        }
    };

    // Add to beginning of notifications array
    notifications.unshift(newNotification);
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications.pop();
    }

    localStorage.setItem('emailNotifications', JSON.stringify(notifications));

    // If dashboard is open, update notifications
    if (window.location.pathname.includes('dashboard.html')) {
        loadNotifications();
    }
}

// Create HTML template for admin notification
function createAdminNotificationTemplate(storyData, imageBase64) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f8f9fa; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                .story-image { max-width: 100%; height: auto; margin: 20px 0; }
                .meta-info { background: #e9ecef; padding: 15px; margin: 15px 0; border-radius: 5px; }
                .story-content { white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Story Submission</h1>
                </div>
                <div class="content">
                    <h2>${storyData.title}</h2>
                    ${imageBase64 ? `<img src="${imageBase64}" alt="Story Image" class="story-image">` : ''}
                    <div class="meta-info">
                        <p><strong>Author:</strong> ${storyData.author}</p>
                        <p><strong>Email:</strong> ${storyData.email}</p>
                        <p><strong>Category:</strong> ${storyData.category}</p>
                        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div class="story-content">
                        ${storyData.story}
                    </div>
                </div>
                <div class="footer">
                    <p>This is an automated message from Tech & Style</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Create HTML template for auto-reply
function createAutoReplyTemplate(storyData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #28a745; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f8f9fa; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Your Submission!</h1>
                </div>
                <div class="content">
                    <p>Dear ${storyData.author},</p>
                    <p>Thank you for submitting your story "${storyData.title}" to Tech & Style. We have received your submission and our team will review it shortly.</p>
                    <p>Here's a summary of your submission:</p>
                    <ul>
                        <li><strong>Title:</strong> ${storyData.title}</li>
                        <li><strong>Category:</strong> ${storyData.category}</li>
                        <li><strong>Submission Date:</strong> ${new Date().toLocaleString()}</li>
                    </ul>
                    <p>We will notify you once your story has been reviewed. If you have any questions, please don't hesitate to contact us.</p>
                    <p>Best regards,<br>The Tech & Style Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated message from Tech & Style</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    let isScrolling = false;
    let scrollTimeout;

    // Function to handle scroll events
    function handleScroll() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
                isScrolling = false;
            });
        }
    }

    // Function to scroll to top smoothly
    function scrollToTop() {
        const currentScroll = window.scrollY;
        const scrollStep = Math.PI / (1000 / 15); // Smooth scroll duration
        let count = 0;

        function scroll() {
            if (window.scrollY !== 0) {
                count++;
                window.scrollTo(0, Math.max(0, currentScroll * Math.cos(scrollStep * count)));
                requestAnimationFrame(scroll);
            }
        }

        requestAnimationFrame(scroll);
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 100); // Throttle to 100ms
        }
    });

    // Add click event listener
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTop();
        });

        // Show button immediately if page is already scrolled
        if (window.scrollY > 100) {
            backToTopButton.classList.add('visible');
        }
    }
});

// Visitor Notification
document.addEventListener('DOMContentLoaded', function() {
    // Function to send visitor information
    async function notifyVisitor() {
        try {
            const response = await fetch('http://localhost:3000/api/notify-visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: window.location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send notification');
            }
        } catch (error) {
            console.error('Error sending visitor notification:', error);
        }
    }

    // Send notification when page loads
    notifyVisitor();
});

// Admin functionality
function checkAdminStatus() {
    const isRegistered = localStorage.getItem('adminRegistered');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminRegisterBtn = document.getElementById('adminRegisterBtn');

    if (adminLoginBtn && adminRegisterBtn) {
        if (isRegistered) {
            // If registered, show login button and hide register
            adminLoginBtn.style.display = 'inline-flex';
            adminRegisterBtn.style.display = 'none';
        } else {
            // If not registered, show register button and hide login
            adminLoginBtn.style.display = 'none';
            adminRegisterBtn.style.display = 'inline-flex';
        }
    }
}

// Run check when page loads
document.addEventListener('DOMContentLoaded', checkAdminStatus);

// Handle admin registration
function handleAdminRegistration(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname')?.value;
    const idNumber = document.getElementById('id-number')?.value;
    const email = document.getElementById('email')?.value;
    const username = document.getElementById('username')?.value;
    const defaultPassword = document.getElementById('default-password')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;
    const photoInput = document.getElementById('photoInput');
    
    if (!fullname || !idNumber || !email || !username || !defaultPassword || !password || !confirmPassword) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'All fields are required';
            errorMessage.style.display = 'block';
        }
        return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.style.display = 'block';
        }
        return false;
    }

    // Validate password requirements
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Password does not meet requirements';
            errorMessage.style.display = 'block';
        }
        return false;
    }

    // Get photo data if uploaded
    let photoData = null;
    if (photoInput && photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData = e.target.result;
            completeRegistration();
        }
        reader.readAsDataURL(file);
    } else {
        completeRegistration();
    }

    function completeRegistration() {
        // Store registration data
        const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
        adminUsers.push({
            fullname,
            idNumber,
            email,
            username,
            password, // In a real app, this would be hashed
            photo: photoData
        });
        localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
        
        // Set registration status
        localStorage.setItem('adminRegistered', 'true');
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 2000);
    }
    
    return false;
}

// Handle admin login
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!username || !password) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Username and password are required';
            errorMessage.style.display = 'block';
        }
        return false;
    }
    
    // Get stored admin users
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    
    // Find matching user
    const user = adminUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store logged in user
        localStorage.setItem('currentAdmin', JSON.stringify(user));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
        }
    }
    
    return false;
} 