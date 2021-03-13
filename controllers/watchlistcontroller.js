const Express = require('express');
const router = Express.Router();
const validateJWT = require('../middleware/validate-jwt');

const {WatchlistModel} = require('../models');


//Test route

router.get('/test', (req, res) => {
    res.send('Hey! This is a test route!')
});

//POST - Create a watchlist item for an individual user

router.post('/create', validateJWT, async (req, res) => {
    const { title, rated, runtime, genre, plot, poster, watched, recommend } = req.body.watchlist;
    const { id } = req.user;
    const watchlistEntry = {
        title,
        rated,
        runtime,
        genre,
        plot,
        poster,
        watched,
        recommend,
        owner: id
    }
    try {
        const newItem = await WatchlistModel.create(watchlistEntry);
        res.status(200).json(watchlistEntry);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//GET - pull all logs for an individual user

router.get('/view', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userList = await WatchlistModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userList)
    } catch (err) {
        res.status(500).json({ error: err });
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
            message: 'Watchlist item successfully destroyed'
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