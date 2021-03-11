const Express = require('express');
const router = Express.Router();

router.get('/test', (req, res) => {
    res.send('Hey! This is a test route!')
});

module.exports = router;