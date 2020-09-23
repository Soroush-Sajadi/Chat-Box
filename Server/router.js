const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('how You doing')
})

module.exports = router