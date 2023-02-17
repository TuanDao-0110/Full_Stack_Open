import React from 'react'
import Header from './Header'
import Part from './Part'

const Course = ({ course }) => {
    const renderParts = () => {
        return course.parts?.map((item, index) => {
            const { name, exercises, id } = item
            return <Part key={index} name={name} exercises={exercises} id={id} />
        })
    }
    const sumExercises = (arr) => {
        return arr.reduce((sum, item) => {
            return sum += item.exercises
        }, 0)
    }

    return (
        <div>
            <Header title={course.name} />
            {renderParts()}
            <h2>Total of {sumExercises(course.parts)} exercises</h2>
        </div>
    )

}

export default Course