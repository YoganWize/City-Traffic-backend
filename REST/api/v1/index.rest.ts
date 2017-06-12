import { IRestData } from './../../index.interface'
export const paths:IRestData[] = [
    {
        description:'all repository actions endpoint',
        method: 'get',
        path: `hi`,
        controller: function(req, res, next) {
            res.send('yo!')
        }
    },

];