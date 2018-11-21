const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {

    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (validator.isEmpty(data.text)) {
        errors.text = 'Text required';
    } else {
        if (!validator.isLength(data.text, {
                min: 10,
                max: 1000
            })) {
            errors.text = 'Posts must be between 10 and 1000 characters.';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};