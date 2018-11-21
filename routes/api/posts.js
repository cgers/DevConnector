const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Post model
const Post = require('../../models/post');
//Profile model
const Profile = require('../../models/profile');
const passport = require('passport');

//Post Validation
const ValidatePostInput = require('../../validation/post');

//Note that test in this case will refer to /api/posts/test
// @route GET api/posts/test 
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'Posts works! '
}));

//Note that test in this case will refer to /api/posts/test
// @route GET api/posts
// @desc Get all posts
// @access Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            postdate: -1
        })
        .then(posts => res.json(posts))
        .catch(error => res.status(404).json({
            error: 'No posts found.'
        }));
});

//Note that test in this case will refer to /api/posts/test
// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
            error: 'No post found with that id'
        }));
});

//Note that test in this case will refer to /api/posts/test
// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = ValidatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(savedPost => res.json(savedPost));
});



//Note that test in this case will refer to /api/posts/test
// @route GET api/posts/:id
// @desc Delete a post
// @access Private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(foundprofile => {
            Post.findById(req.params.id)
                .then(foundPost => {
                    //Check post owner
                    if (foundPost.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'User not authorized to delete this post.'
                        });
                    }

                    // Remove the post.
                    foundPost.remove().then(() => res.json({
                        success: true
                    }));
                })
                .catch(error => res.status(404).json({
                    error: 'Post not found with that id.'
                }))
        }).catch(err => res.status(404).json({
            error: 'User not found.'
        }))
});


// @route   Post api/posts/like/:id
// @desc    Like for a post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(foundprofile => {
            Post.findById(req.params.id)
                .then(foundPost => {
                    //Check if user has liked this before
                    if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            error: 'User already liked this post.'
                        });
                    }
                    //add the userid to the likes array.
                    foundPost.likes.push({
                        user: req.user.id
                    });
                    foundPost.save().then(post => res.json(post));

                })
                .catch(error => res.status(404).json({
                    error: 'Post not found with that id.'
                }))
        }).catch(err => res.status(404).json({
            error: 'User not found.'
        }))
});



// @route   Post api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(foundprofile => {
            Post.findById(req.params.id)
                .then(foundPost => {
                    //Check if user has liked this before
                    if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            error: 'You have not yet liked this post.'
                        });
                    }
                    //Remove a like
                    //Get index to remove.
                    let removeIndex = foundPost.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    //Splice it out of the array
                    foundPost.likes.splice(removeIndex, 1);
                    foundPost.save().then(post => res.json(post));
                })
                .catch(error => res.status(404).json({
                    error: 'Post not found with that id.'
                }))
        }).catch(err => res.status(404).json({
            error: 'User not found.'
        }))
});

// @route   Post api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    console.log(`req.params.id:  ${req.params.id}`);

    const {
        errors,
        isValid
    } = ValidatePostInput(req.body);

    console.log(`isValid:  ${isValid}`);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {

            console.log(post.id.toString());

            //Check if user has liked this before
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };
            //Add to comments array
            post.comment.unshift(newComment);

            //Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'Post not found.'
        }));
});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment from a post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    console.log('236');

    Post.findById(req.params.id)
        .then(post => {
            //Check if comment exists.
            if (post.comment.filter(comment => comment._id.toString() === req.params.comment_id)
                .length === 0) {
                //Comment does not exist.
                return res.status(404).json({
                    error: 'Comment does not exist'
                });
            }
            const RemoveIndex = post.comment.map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            post.comment.splice(RemoveIndex, 1);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'Post not found.'
        }));
});

module.exports = router;