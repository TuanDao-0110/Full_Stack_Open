export enum MsgType { 
    success ='success',
    fail = 'fail',
}
export interface NofiticationType { 
    type : MsgType,
    message : string
}