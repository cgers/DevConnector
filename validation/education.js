const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileExperienceInput(data) {

    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.datefrom = !isEmpty(data.datefrom) ? data.datefrom : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

    if (validator.isEmpty(data.school)) {
        errors.school = 'School is required.';
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree is required.';
    }
    if (validator.isEmpty(data.datefrom)) {
        errors.datefrom = 'Date from required.';
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};