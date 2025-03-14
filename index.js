const express = require('express');

const userRouter = require('./routes/userRoutes');

const orderRouter = require('./routes/orderRoutes');
const productRouter = require('./routes/productRoutes');
const clientRouter = require('./routes/clientRoutes');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config({path: 'variables.env'});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

const app = express();
app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// define a domain
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // check if the req origin is in the whitelist
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use('/', userRouter());
app.use('/', orderRouter());
app.use('/', productRouter());
app.use('/', clientRouter());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8000;
app.listen(port,host, () => {
    console.log("server is running");
});