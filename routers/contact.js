const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', (req, res) => {
    res.render('../views/main/contact', {title : 'Contact Page', errors: false});
});

router.post('/process_form', (req, res) => {
     req.checkBody('name', 'Name is required').notEmpty();
     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('email', 'Email is not valid').isEmail();
     req.checkBody('subject', 'Subject is required').notEmpty();
     req.checkBody('message', 'Message is required').notEmpty();

     const errors = req.validationErrors();

     if(errors) {
        res.render('../views/main/contact', {title : 'Contact Page', errors: errors});
     } else {
        const userForm = new User({
           name : req.body.name,
           email: req.body.email,
           subject : req.body.subject,
           message : req.body.message
        });

        userForm.save((err, data) => {
           if (err) throw err;
           else console.log(data);
           req.flash('success_msg', 'Thanks guys');
           res.render('../views/main/contact', {title : 'Contact Page', errors: false});
        });
     }
})

module.exports = router;