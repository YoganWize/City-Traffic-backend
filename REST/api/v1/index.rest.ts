import { IRestData } from './../../index.interface';
import {usersRouter} from '../../../routes/users.routes';
export const paths:IRestData[] = [
    {
        description:'all repository actions endpoint',
        method: 'get',
        path: `hi`,
        controller: function(req, res, next) {
            res.send('yo!')
        }
    },
    {
        description:'',
        method: 'get',
        path: `users`,
        controller: usersRouter.getAll
    },
    {
        description:'',
        method: 'post',
        path: `users`,
        controller: usersRouter.create
    },

];