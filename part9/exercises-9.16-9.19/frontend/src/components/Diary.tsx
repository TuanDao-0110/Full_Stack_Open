import React from 'react'
import { DiaryEntry } from '../types/diaryTypes'


export default function Diary(diary : DiaryEntry) {
    const {date,visibility,weather} = diary
  return (
    <div>
        <h3>{date}</h3>
        <p>visibility: {visibility}</p>
        <p>weather: {weather}</p>
    </div>
  )
}
