require('dotenv').config();

const Express = require('express');
const app = Express();
const dbConnection = require('./db.js');
const middleware = require('./middleware');

app.use(middleware.CORS);

app.use(Express.json());

const controllers = require("./controllers");

app.use("/watchlist", controllers.watchlistController);
app.use("/user", controllers.userController);

// app.listen(3000, () => {
//     console.log(`[Server]: App is listening on 3000.`);
// })

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[server]: Server crashed. Error = ${err}`);
    });
