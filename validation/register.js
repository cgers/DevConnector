const validator = require('validator');
const isEmpty = require('./is-empty');
const passwordValidator = require('password-validator');

module.exports = function validateRegisterInput(data) {

    const passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8) // Minimum length 8
        .is().max(100) // Maximum length 100
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits() // Must have digits    
        .has().not().spaces() // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123', 'P@$$w0rd', 'P@$$w0rd123', 'P@$$w0rd1234', 'P@$$w0rd12345', 'P@$$w0rd123456', 'P@$$w0rd1234567', 'P@$$w0rd12345678', 'P@$$w0rd123456789', 'P@$$w0rd10', 'P@$$w0rd11', 'P@$$w0rd12', 'P@$$w0rd13', 'Password1234']); // Blacklist these values

    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''; //Confirmed password

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name filed is required.';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'E-Mail filed is required.';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required.';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match. ';
    }
    if (!validator.isLength(data.name, {
            min: 5,
            max: 50
        }) && !validator.isEmpty(data.name)) {
        errors.name = 'Name must be between 5 and 50 characters.';
    }
    if (!validator.isEmail(data.email) && !validator.isEmpty(data.email)) {
        errors.email = 'Invalid e-mail address.';
    }
    if (!passwordSchema.validate(data.password) && !validator.isEmpty(data.password)) {
        errors.password = 'Password is too weak. It must be between 8 and 100 characters and contain UPPER & lower case and digits. No spaces.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};