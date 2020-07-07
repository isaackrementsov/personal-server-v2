import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';

import routes from './server/routes.js';

const app = express();
const __dirname = path.resolve();

mongoose.connect('mongodb://127.0.0.1:27017/personal_server', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', err => {
    if(err) console.log('Database error: ', err);
    else console.log('Success connecting to database!');
})

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(session({
    secret: 'sidisjdisdj',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true}
}));

const port = process.env.PORT || 1010;
app.listen(port, err => {
    if(err) console.log('Server error: ', err);
    else console.log('Success starting server on port ', port, '!')
});

routes(app);
