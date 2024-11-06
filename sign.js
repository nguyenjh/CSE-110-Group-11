function validateForm() {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('email-error').innerText = '';
    document.getElementById('username-error').innerText = '';
    document.getElementById('password-error').innerText = '';
    document.getElementById('confirm-password-error').innerText = '';
    document.getElementById('robot-error').innerText = '';
    document.getElementById('form-error').innerText = '';

    // Email validation
    const email = document.getElementById('email').value;
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Username validation (must be more than 4 characters)
    const username = document.getElementById('username').value;
    if (username.length <= 4) {
        document.getElementById('username-error').innerText = 'Username must be more than 4 characters.';
        isValid = false;
    }

    // Password validation (must be more than 5 characters and contain at least one number)
    const password = document.getElementById('password').value;
    if (password.length <= 5 || !/\d/.test(password)) {
        document.getElementById('password-error').innerText = 'Password must be at least 6 characters and contain a number.';
        isValid = false;
    }

    // Confirm password validation (must match the password)
    const confirmPassword = document.getElementById('confirm-password').value;
    if (confirmPassword !== password) {
        document.getElementById('confirm-password-error').innerText = 'Passwords do not match.';
        isValid = false;
    }

    // Checkbox validation (must be checked)
    const isRobotChecked = document.getElementById('not-robot').checked;
    if (!isRobotChecked) {
        document.getElementById('robot-error').innerText = 'Please confirm you are not a robot.';
        isValid = false;
    }

    // Final form validation message
    if (!isValid) {
        document.getElementById('form-error').innerText = '*Please check the fields above';
    } else {
        openModal(); // Show the success modal on successful registration
    }
}

// Function to open the success modal
function openModal() {
    document.getElementById('success-modal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html';
}
