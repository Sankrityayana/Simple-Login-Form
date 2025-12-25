// Get DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const eyeIcon = document.getElementById('eyeIcon');
const eyeIconConfirm = document.getElementById('eyeIconConfirm');
const rememberCheckbox = document.getElementById('rememberMe');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const nameError = document.getElementById('nameError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const successMessage = document.getElementById('successMessage');
const googleLoginBtn = document.querySelector('.social-btn.google');
const facebookLoginBtn = document.querySelector('.social-btn.facebook');
const submitBtn = document.getElementById('submitBtn');
const toggleFormLink = document.getElementById('toggleFormLink');
const toggleFormText = document.getElementById('toggleFormText');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const successTitle = document.getElementById('successTitle');
const successText = document.getElementById('successText');
const nameField = document.querySelector('.name-field');
const confirmPasswordField = document.querySelector('.confirm-password-field');
const formOptions = document.querySelector('.form-options');

// Track current mode (login or signup)
let isSignupMode = false;

// Track current mode (login or signup)
let isSignupMode = false;

// Toggle between login and signup modes
toggleFormLink.addEventListener('click', (e) => {
    e.preventDefault();
    isSignupMode = !isSignupMode;
    
    if (isSignupMode) {
        // Switch to signup mode
        formTitle.textContent = 'Create Account';
        formSubtitle.textContent = 'Sign up to get started';
        submitBtn.textContent = 'Sign Up';
        toggleFormText.innerHTML = 'Already have an account? <a href="#" id="toggleFormLink">Login</a>';
        nameField.style.display = 'block';
        confirmPasswordField.style.display = 'block';
        formOptions.style.display = 'none';
    } else {
        // Switch to login mode
        formTitle.textContent = 'Welcome Back!';
        formSubtitle.textContent = 'Please login to your account';
        submitBtn.textContent = 'Login';
        toggleFormText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleFormLink">Sign Up</a>';
        nameField.style.display = 'none';
        confirmPasswordField.style.display = 'none';
        formOptions.style.display = 'flex';
        
        // Clear signup fields
        nameInput.value = '';
        confirmPasswordInput.value = '';
        nameError.textContent = '';
        confirmPasswordError.textContent = '';
        nameInput.classList.remove('error', 'success');
        confirmPasswordInput.classList.remove('error', 'success');
    }
    
    // Re-bind the toggle link event
    document.getElementById('toggleFormLink').addEventListener('click', arguments.callee);
});

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
});

// Toggle confirm password visibility
toggleConfirmPasswordBtn.addEventListener('click', () => {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    eyeIconConfirm.textContent = type === 'password' ? '👁️' : '🙈';
});

// Email validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Password validation
function validatePassword(password) {
    return password.length >= 6;
}

// Name validation
function validateName(name) {
    return name.trim().length >= 2;
}

// Check if passwords match
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
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
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
    } else {
        showSuccess(passwordInput, passwordError);
    }
});

nameInput.addEventListener('blur', () => {
    if (isSignupMode) {
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, nameError, 'Name is required');
        } else if (!validateName(nameValue)) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
        } else {
            showSuccess(nameInput, nameError);
        }
    }
});

confirmPasswordInput.addEventListener('blur', () => {
    if (isSignupMode) {
        const confirmPasswordValue = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        
        if (confirmPasswordValue === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        } else if (!passwordsMatch(passwordValue, confirmPasswordValue)) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError);
        }
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

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
});

confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('error')) {
        confirmPasswordInput.classList.remove('error');
        confirmPasswordError.textContent = '';
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
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        showSuccess(passwordInput, passwordError);
    }
    
    // Additional validation for signup mode
    if (isSignupMode) {
        const nameValue = nameInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value;
        
        // Validate name
        if (nameValue === '') {
            showError(nameInput, nameError, 'Name is required');
            isValid = false;
        } else if (!validateName(nameValue)) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            showSuccess(nameInput, nameError);
        }
        
        // Validate confirm password
        if (confirmPasswordValue === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
            isValid = false;
        } else if (!passwordsMatch(passwordValue, confirmPasswordValue)) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            isValid = false;
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError);
        }
    }
    
    // If form is valid, show success message
    if (isValid) {
        // Handle remember me (only in login mode)
        if (!isSignupMode && rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailValue);
        } else if (!isSignupMode) {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Update success message based on mode
        if (isSignupMode) {
            successTitle.textContent = 'Account Created!';
            successText.textContent = 'Welcome! Redirecting to your dashboard...';
        } else {
            successTitle.textContent = 'Login Successful!';
            successText.textContent = 'Redirecting to dashboard...';
        }
        
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            loginForm.reset();
            emailInput.classList.remove('success');
            passwordInput.classList.remove('success');
            nameInput.classList.remove('success');
            confirmPasswordInput.classList.remove('success');
            successMessage.classList.add('hidden');
        }, 3000);
    }
});

// Social login handlers
googleLoginBtn.addEventListener('click', () => {
    const mode = isSignupMode ? 'Sign up' : 'Login';
    alert(`Google ${mode.toLowerCase()} would be implemented here!\n\nThis is a UI-only demo. In a real application, this would connect to Google OAuth.`);
});

facebookLoginBtn.addEventListener('click', () => {
    const mode = isSignupMode ? 'Sign up' : 'Login';
    alert(`Facebook ${mode.toLowerCase()} would be implemented here!\n\nThis is a UI-only demo. In a real application, this would connect to Facebook OAuth.`);
});

// Forgot password handler
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here!\n\nThis is a UI-only demo. In a real application, this would send a reset email.');
    });
}

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

toggleConfirmPasswordBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleConfirmPasswordBtn.click();
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
console.log('%c🔐 Simple Login/Signup Form UI', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cThis is a UI-only demonstration.', 'color: #7f8c8d; font-size: 14px;');
console.log('%cNo actual authentication is performed.', 'color: #7f8c8d; font-size: 14px;');
