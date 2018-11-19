const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.registeredDate = !isEmpty(data.registeredDate) ? data.registeredDate : Date.now();
    data.website = !isEmpty(data.website) ? data.website : '';

    data.linkedIn = !isEmpty(data.linkedin) ? data.linkedin : '';
    data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
    data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
    data.instagram = !isEmpty(data.instagram) ? data.instagram : '';
    data.facebook = !isEmpty(data.facebook) ? data.facebook : '';

    if (!validator.isLength(data.handle, {
            min: 5,
            max: 50
        })) {
        errors.handle = 'The handle must be between 5 and 50 characters.';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'The profile handle is required.';
    }
    if (validator.isEmpty(data.status)) {
        errors.status = 'The profile status is required.';
    }
    if (validator.isEmpty(data.skills)) {
        errors.skills = 'The profile skills are required.';
    }
    if (!validator.isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Invalid URL.';
        }
    }

    //Social Links
    if (!validator.isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Invalid YouTube URL.';
        }
    }
    if (!validator.isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Invalid Twitter URL.';
        }
    }
    if (!validator.isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Invalid LinkedIn URL.';
        }
    }
    if (!validator.isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Invalid Instagram URL.';
        }
    }
    if (!validator.isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Invalid Facebook URL.';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};