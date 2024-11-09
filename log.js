function validateLoginForm() {
    let isValid = true;

    // Get the login button and set its text to "Authenticating..." initially
    const loginButton = document.querySelector("button");
    loginButton.textContent = "Authenticating...";
    loginButton.disabled = true; // Disable the button to prevent multiple clicks during processing

    // Clear previous error messages
    document.getElementById('email-error').innerText = '';
    document.getElementById('password-error').innerText = '';
    document.getElementById('robot-error').innerText = '';
    document.getElementById('form-error').innerText = '';

    // Email validation
    const email = document.getElementById('email').value;
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation (cannot be empty)
    const password = document.getElementById('password').value;
    if (password.length === 0) {
        document.getElementById('password-error').innerText = 'Please enter your password.';
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
        loginButton.textContent = "Login";  // Revert the text back to "Login" if form is invalid
        loginButton.disabled = false;      // Enable the button again
    } else {
        // Simulate the authentication process if form is valid
        setTimeout(() => {
            // Authentication is successful, reset the button text to "Login"
            loginButton.textContent = "Login";
            loginButton.disabled = false;  // Re-enable the button after processing
        }, 2000); // Simulate delay (2 seconds) for authentication
    }
}
