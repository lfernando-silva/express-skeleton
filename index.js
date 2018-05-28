const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');

const {
    envValidator,
    errorHandler,
    logger,
    notFoundHandler
} = require('./middlewares');

const app = express();

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

app.use(cors());
app.use(helmet());
app.use(methodOverride());
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(envValidator);
app.use(logger);
app.use(errorHandler);
app.use(notFoundHandler);

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');
app.set('env', process.env.NODE_ENV);

app.listen(app.get('port'), () => {
    console.log(
        'API is running at http://localhost:%d in %s mode.',
        app.get('port'),
        app.get('env')
    )
});

module.exports = app;

