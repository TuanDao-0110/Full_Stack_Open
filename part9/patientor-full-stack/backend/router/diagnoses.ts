import express from 'express'
import { getDianoses } from '../types/data';
const router = express.Router()


router.get('/',(_req,res)=>  {

    return res.send(getDianoses);
})




export default router;
