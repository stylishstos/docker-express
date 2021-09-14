const express = require('express');
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const postRoutes = require('./routes/post-routes');
const apiPostRoutes = require('./routes/api-post-routes');

const DB = '';
const PORT = process.env.PORT ?? 3000;

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const server = express();
mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=> console.log(successMsg('db connectd')))
    .catch((error) => console.error(errorMsg(error)));

server.use('/css', express.static(path.resolve(__dirname, 'views/css')));
server.use('/img', express.static(path.resolve(__dirname, 'views/img')));

server.use(logger(':method :url :status :res[content-length] - :response-time ms'));
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride('_method'));

server.set("view engine", "ejs");
server.set("views", path.resolve(__dirname, 'views'));

server.use(postRoutes);
server.use(apiPostRoutes);

server.get('/', (req, res) => {
    res.render('index', { name: req.query.name });
});

server.listen(PORT, () => { console.log(successMsg(`server has strted on port ${PORT}`)); });