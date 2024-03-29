import express from "express";

import { addEntries, addPatient, getPatients } from "../utils/service";
const router = express.Router();

router
  .get("/", (_req, res) => {
    return res.send(getPatients());
  })
  .get("/:id", (_req, res) => {
    const id = _req.params.id;
    return res.send(getPatients(id));
  })
  .post("/:id/entries", async (_req, res) => {
    const id = _req.params.id;
    getPatients(id);
    // return res.send(id)
    try {
      return res.send(addEntries(_req.body));
    } catch (error) {
      let msg = "";
      if (error instanceof Error) {
        msg = error.message;
      }
      return res.status(400).json({ msg });
    }
  })
  .post("/", (_req, res) => {
    if (!_req.body) {
      return res.status(400).send("data body missing");
    }
    try {
      const result = addPatient(_req.body);
      return res.status(200).json(result);
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      return res.status(400).send(errorMessage);
    }
  });

export default router;
