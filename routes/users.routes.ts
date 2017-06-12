import { Router, Request, Response, NextFunction } from 'express';


export class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(['list of all']);

    }

    public getById(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        if (req.params.id === '1')  res.send({user:{name:'Admin'}});
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const usersRouter = new UsersRouter();
export default usersRouter.router;