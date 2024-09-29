const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users.js');

router.get('/', (req, res) => {res.send("your here"); });
router.get('/prova', (req, res) => { res.send("prova"); });
router.get('/users', (req, res) =>
{
        res.send(req.query.id=='');
});
router.get('/crud/users', controllerUsers);

module.exports = router;
