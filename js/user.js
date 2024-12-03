const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const lastname_input = document.getElementById('lastname-input');
const username_input = document.getElementById('username-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const confirm_password_input = document.getElementById('confirm-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];

    if (firstname_input && lastname_input && username_input) {
        // Signup form validation
        errors = getSignupFormErrors(
            firstname_input.value,
            lastname_input.value,
            username_input.value,
            email_input.value,
            password_input.value,
            confirm_password_input.value
        );
    } else {
        // Login form validation
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join('. ');
    }
});

function getSignupFormErrors(firstname, lastname, username, email, password, confirmpassword) {
    let errors = [];
    if (firstname === '' || firstname == null) {
        errors.push('First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if (lastname === '' || lastname == null) {
        errors.push('Last Name is required');
        lastname_input.parentElement.classList.add('incorrect');
    }
    if (username === '' || username == null) {
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }
    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password !== confirmpassword) {
        errors.push('Password does not match repeated password');
        password_input.parentElement.classList.add('incorrect');
        confirm_password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];
    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

const allInputs = [
    firstname_input,
    lastname_input,
    username_input,
    email_input,
    password_input,
    confirm_password_input,
].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
        }

        // Optionally clear the error message if all fields are valid
        if (error_message.innerText !== '') {
            error_message.innerText = '';
        }
    });
});
