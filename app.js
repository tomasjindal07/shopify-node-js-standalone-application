const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const webRoute = require('./routes/web');
const apiRoute = require('./routes/api');

const sequelize = require('./util/database');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'IERYIEUWYIEWDFJKSB26438664872647724JF!@#$%^&*()_+',
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        }),
    })
);

/* Routes */
app.use(bodyParser.urlencoded({extended:false}),webRoute);
app.use('/api',bodyParser.raw({ type: "application/json" }),apiRoute);


app.use((req,res,next) => {
    res.render('errors/404');
});

sequelize.sync()
.then((result) => {
    app.listen(3000);   
})
.catch((error) => {
    console.log(error);
});