// stretch - ratings 

const {DataTypes} = require('sequelize');
const db = require('../db');

const Watchlist = db.define('watchlist', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rated: {
        type: DataTypes.STRING,
        allowNull: false
    },
    runtime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    },
    watched: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    recommend: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    owner: {
        type: DataTypes.INTEGER
    }
})

module.exports = Watchlist;