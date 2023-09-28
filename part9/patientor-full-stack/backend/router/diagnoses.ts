import express from 'express'
import { getDianoses } from '../utils/service';
const router = express.Router()
router.get('/',(_req,res)=>  {
    return res.send(getDianoses);
})




export default router;
