export interface IRest {
    paths:IRestData[];
}
export interface IRestData {
    description?:string;
    method: string;
    path:string;
    controller: Function
}