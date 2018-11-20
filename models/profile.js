const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Profile Schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        required: true,
        max: 50
    },
    company: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    githubusername: {
        type: String,
        required: false
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: false
        },
        datefrom: {
            type: Date,
            required: true
        },
        dateto: {
            type: Date,
            require: false
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            require: false
        }
    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: false
        },
        datefrom: {
            type: Date,
            required: true
        },
        dateto: {
            type: Date,
            require: false
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            require: false
        }
    }],
    social: {
        linkedin: {
            type: String,
            required: false
        },
        twitter: {
            stype: String,
            required: false
        },
        youtube: {
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        }
    },

    // social: [{
    //     //Twitter, LinkedIn, Facebook, Instragram etc...
    //     mediaChannel: {
    //         type: String,
    //         require: true
    //     },
    //     mediaURL: {
    //         type: String,
    //         require: true
    //     }
    // }],

    registeredDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = Profile = mongoose.model('profile', profileSchema);