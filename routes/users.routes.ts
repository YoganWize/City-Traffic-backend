import {Router, Request, Response, NextFunction} from 'express';
import DAL from '../modules/dal/DAL.class';
const User = DAL.UserModel;

export class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        //res.send(['list of all']);
        User.find().then((users) => {
            res.json(users);
        })
            .catch(err => next(err));


    }

    public create(req: Request, res: Response, next: NextFunction) {
        //res.send(['list of all']);
        //console.log(req.query);
        //console.log(req.body);
        const {name} = req.body;
        const user = new User({name});
        console.log(user);

        User.create(user).then((user) => {
            res.json(user);
        })
            .catch(err => next(err));


    }


    public CheckById(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        if (req.params.id === '1') res.send({user: {name: 'Admin'}});
    }



    public getById(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        if (req.params.id === '1') res.send({user: {name: 'Admin'}});
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
export const usersRouter = new UsersRouter();