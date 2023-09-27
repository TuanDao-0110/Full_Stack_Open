import express from "express";
import { getPatients } from "../types/data";
const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(getPatients());
});

export default router;
