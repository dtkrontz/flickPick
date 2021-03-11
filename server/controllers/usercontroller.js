const Express = require('express');


router.get('/test', (req, res) => {
    res.send('Hey! This is a user test route!')
});

module.exports = router;