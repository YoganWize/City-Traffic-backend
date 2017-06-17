import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';


import { TestDataRouter, UsersRouter }  from './routes/index';

class App {
    // ref to Express instance
    public express:express.Application;

    //Run configuration methods on the Express instance.
    constructor(appSettings?) {
        this.express = express();
        this.middleware();
        this.routes(/*appSettings.apiPath, appSettings.apiVersion*/);

    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes():void {
        //this.express.use('./api', router);

        this.express.use((req, res, next)=> {
            console.log(req.baseUrl, req.method, Date.now());
            next()
        });
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello rld!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/test-data', TestDataRouter );
        this.express.use('/api/v1/users', UsersRouter );
    }
}

export default new App().express;