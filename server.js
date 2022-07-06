const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require('mongoose');
const app = express();
// const tweetRoute = require('./router/tweets.js)'
const Routers = require('./routes/routes.js');
const MONGO_URL = 'mongodb://127.0.0.1:27017/'
const MONGODB_NAME = 'lms-project'

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

mongoose.connect(`${MONGO_URL}${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/custom-api', Routers);

app.use((req, res, next) => {
    res.status(404).send('Not found')
})

app.use((error,req, res, next) => {
    console.log(error);
    res.status(500).send('internal server Error')
})
app.listen(8080);