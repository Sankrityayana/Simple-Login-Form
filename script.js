// Get DOM elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password');
const eyeIcon = document.querySelector('.eye-icon');
const rememberCheckbox = document.getElementById('remember');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const successMessage = document.getElementById('success-message');
const googleLoginBtn = document.getElementById('google-login');
const facebookLoginBtn = document.getElementById('facebook-login');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
});

// Email validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Password validation
function validatePassword(password) {
    return password.length >= 8;
}

// Show error
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
    input.parentElement.parentElement.classList.add('shake');
    setTimeout(() => {
        input.parentElement.parentElement.classList.remove('shake');
    }, 300);
}

// Show success
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

// Validate input on blur
emailInput.addEventListener('blur', () => {
    const emailValue = emailInput.value.trim();
    
    if (emailValue === '') {
        showError(emailInput, emailError, 'Email is required');
    } else if (!validateEmail(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
    } else {
        showSuccess(emailInput, emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    const passwordValue = passwordInput.value;
    
    if (passwordValue === '') {
        showError(passwordInput, passwordError, 'Password is required');
    } else if (!validatePassword(passwordValue)) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters');
    } else {
        showSuccess(passwordInput, passwordError);
    }
});

// Clear error on input
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        passwordInput.classList.remove('error');
        passwordError.textContent = '';
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    let isValid = true;
    
    // Validate email
    if (emailValue === '') {
        showError(emailInput, emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(emailInput, emailError);
    }
    
    // Validate password
    if (passwordValue === '') {
        showError(passwordInput, passwordError, 'Password is required');
        isValid = false;
    } else if (!validatePassword(passwordValue)) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        showSuccess(passwordInput, passwordError);
    }
    
    // If form is valid, show success message
    if (isValid) {
        // Handle remember me
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailValue);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            loginForm.reset();
            emailInput.classList.remove('success');
            passwordInput.classList.remove('success');
            successMessage.classList.add('hidden');
        }, 3000);
    }
});

// Social login handlers
googleLoginBtn.addEventListener('click', () => {
    alert('Google login would be implemented here!\n\nThis is a UI-only demo. In a real application, this would connect to Google OAuth.');
});

facebookLoginBtn.addEventListener('click', () => {
    alert('Facebook login would be implemented here!\n\nThis is a UI-only demo. In a real application, this would connect to Facebook OAuth.');
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here!\n\nThis is a UI-only demo. In a real application, this would send a reset email.');
});

// Sign up handler
document.querySelector('.signup-link a').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign up page would be implemented here!\n\nThis is a UI-only demo. In a real application, this would navigate to the registration page.');
});

// Check for remembered email on page load
window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});

// Add enter key support for password toggle
togglePasswordBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePasswordBtn.click();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Alt + S for social login section
    if (e.altKey && e.key === 's') {
        googleLoginBtn.focus();
    }
    
    // Alt + F for forgot password
    if (e.altKey && e.key === 'f') {
        document.querySelector('.forgot-password').click();
    }
});

// Add smooth focus transitions
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Password strength indicator
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    
    // You can add visual feedback here if needed
    if (password.length > 0) {
        passwordInput.setAttribute('data-strength', strength);
    } else {
        passwordInput.removeAttribute('data-strength');
    }
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
}

// Console message
console.log('%c🔐 Simple Login Form UI', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cThis is a UI-only demonstration.', 'color: #7f8c8d; font-size: 14px;');
console.log('%cNo actual authentication is performed.', 'color: #7f8c8d; font-size: 14px;');
