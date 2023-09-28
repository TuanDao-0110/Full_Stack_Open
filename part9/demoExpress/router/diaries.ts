/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import diaryService from "../services/diaryService";
const router = express.Router();

router
  .get("/", (_req, res) => {
    res.send(diaryService.getNonSensitiveEntries());
  })
  .get("/:id", (_req, res) => {
    const diary = diaryService.findById(Number(_req.params.id));
    if (diary) {
      res.send(diary);
    } else {
      res.sendStatus(404);
    }
  })
  .post("/", (_req, res) => {
    try {
      const newDiaryEntry = diaryService.toNewDiaryEntry(_req.body);
      const addedEntry = diaryService.addDiary(newDiaryEntry);
      return res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      return res.status(400).send(errorMessage);
    }
  });

export default router;
