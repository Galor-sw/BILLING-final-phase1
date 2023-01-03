require("dotenv").config({path: '.env'});
require('./mongoConnection');

const express = require('express');
const serverLogger = require(`./logger`);
const cors = require("cors")
const startCronJob = require('./cronJob/cronJob');

//Routers
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const plansRouter = require('./routers/planRouter');
const webhooksRouter = require('./routers/webhooksRouter');
const subscriptionRouter = require('./routers/subscriptionRouter');
const statisticRouter = require('./routers/statisticRouter');

const logger = serverLogger.log;
const app = express();

app.set('view engine', 'ejs')
app.use(cors({origin: true})); // enable origin cors
//app.use(express.json()); NEEDED TO REMOVE IT FOR THE WEBHOOK TO SUCCEESS
app.use(express.urlencoded({
    extended: true
}));

//Router uses - CHECK IF IT IS A PROPER WAY TO USE IT
app.use('/plans', express.json(), plansRouter);
app.use('/subscription', express.json(), subscriptionRouter);
app.use('/webhook', express.raw({type: "application/json"}), webhooksRouter);
app.use('/statistic',express.json(),statisticRouter);

//load files
app.use('/user', fileLoaderRouter);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));


//create server
app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server is listening on port ${process.env.PORT}`)
});

startCron = () => {
    startCronJob();
    logger.info('cron job started');
}

startCron();

