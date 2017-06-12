import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IRest, IRestData } from './../../REST/index.interface';

export default class Server {

    private expressApp: express.Application;

    constructor(
        private port: number,
        private restData:IRest,
        private apiPath: string = 'api',
        private apiVersion: string = 'v1'
    ) {
        this.expressApp = express();

        this.init();
    }

    private init() {
        this.expressApp.set('port', this.port);
        this.initMiddleware();
        this.initRoutes();
    }


    public start() {
        this.expressApp.listen(this.port, () => {
            console.info(`Server listening on port ${this.port}`);
        });
    }

    private initMiddleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private initRoutes(): void {
        this.expressApp.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.restData.paths.forEach( (p:IRestData) => {
            this.addRoutes( p.method, p.path, p.controller );
        })

    }


    private addRoutes(method:string = 'post', route: string, handler: Function): void {
        let endpointPath = `/${this.apiPath}/${this.apiVersion}/${route}`;
        this.expressApp[method](`${endpointPath}`, handler);
    }
}