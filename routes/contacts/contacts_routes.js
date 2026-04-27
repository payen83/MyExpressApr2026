const express = require('express');
const router = express.Router();

const contacts = [
    {id: 1, name: "Khairul Ikhwan", phone: "0198878293"},
    {id: 2, name: "Zafrul Noordin", phone: "0176663838"},
    {id: 3, name: "Wong Siew Lan", phone: "0123393939" }
];

router.get('/', (req, res) => {
    res.render('contact/contacts', {
        title: 'My Contact List',
        content: 'Manage and view details',
        contacts
    });
});

module.exports = router;