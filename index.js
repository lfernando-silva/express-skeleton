const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv-safe');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');

const {
    errorHandler,
    logger,
    notFoundHandler
} = require('./middlewares');

const routes = require('./routes')

const app = express();

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(methodOverride());
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger);

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');
app.set('env', process.env.NODE_ENV || 'development');

app.listen(app.get('port'), () => {
    console.log(
        'API is running at http://%s:%d in %s mode.',
        app.get('host'),
        app.get('port'),
        app.get('env')
    )
});

module.exports = app;

