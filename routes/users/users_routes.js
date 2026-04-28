const express = require('express');
const db = require('../../database');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM users');
        const users = result;
        console.log(users);
        res.render('users/users', {
            title: 'Users Management',
            content: 'Manage your users',
            // users: users
            users
        });
    } catch(err) {
        console.log(err);
    }
});

router.get('/add', (req, res) => {
    renderFormPage(res);
});

router.get('/:id', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        const user = result[0];
        if(!user) return res.status(404).send('User not found');
        res.render('users/user_details', {
            title: 'User Details',
            content: 'View your user',
            // users: users
            user
        });
    } catch(err) {
        console.log(err);
    }
});


function renderFormPage(res, error = null, user = null){
    res.render('users/user_form', {
        title: 'New User',
        content: 'Fill up user details',
        error,
        formAction: '/users/add'
    });
};

function validateForm(name, phone, email, res){
    if(!name || name.trim() == ''){
        renderFormPage(res, 'Name is required', {name, email, phone});
        return false;
    }
    if(!phone || !/^\d{6,12}$/.test(phone)){
        renderFormPage(res, 'Valid phone is required', {name, email, phone});
        return false;
    }
    if(!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        renderFormPage(res, 'Valid email is required', {name, email, phone});
        return false;
    }
    return true;
}

module.exports = router;