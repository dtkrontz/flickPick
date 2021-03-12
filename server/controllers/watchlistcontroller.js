const Express = require('express');
const {WatchlistModel} = require('../models');
const validateJWT = require('../middleware/validate-jwt');

const router = Express.Router();

router.get('/test', (req, res) => {
    res.send('Hey! This is a test route!')
});

//POST - Create a watchlist item for an individual user

router.post('/', validateJWT, async (req, res) => {
    'variables'
    try {

    } catch (err) {
        console.log(err);
    }
});

//GET - pull all logs for an individual user

router.get('/', validateJWT, async (req, res) => {
    'variables'
    try {

    } catch (err) {
        console.log(err);
    }
});

//PUT - Edit watchlist item to mark it as "watched" or "unwatched"

router.put('/:id', validateJWT, async (req, res) => {
    
    const {title, rated, runtime, genre, plot, poster, watched, recommend} = req.body.watchlist;
    const watchlistId = req.params.id;
    const userId = req.user.id;

    const watchlistSearch = {
        where: {
            id: watchlistId,
            owner: userId
        }
    };

    const updatedWatchlist = {
        title: title,
        rated: rated,
        runtime: runtime,
        genre: genre,
        plot: plot,
        poster: poster,
        watched: watched,
        recommend: recommend
    }
    
    try {
        const watchlistUpdated = WatchlistModel.update(updatedWatchlist, watchlistSearch);
        res.status(200).json({
            message: 'Watchlist successfully updated'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Failed to update watchlist: ${err}`
        })
    }
});

//DELETE - Remove Watchlist item from the table

router.delete('/:id', validateJWT, async (req, res) => {
    const watchlistId = req.params.id;
    const userId = req.user.id;
    
    try {

        const deleteWatchlist = {
            where: {
                id: watchlistId,
                owner: userId
            }
        }

        await WatchlistModel.destroy(deleteWatchlist)
        res.status(200).json({
            message: 'Watchlist item successfully deleted'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `${err} does not exist`
        })
    }
});

//STRETCH - filter for watched or unwatched etc.

module.exports = router;