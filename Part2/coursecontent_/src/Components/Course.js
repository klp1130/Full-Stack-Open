import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}


const Header = ({name}) => <h1>{name}</h1>
     

const Content = ({parts}) => {

    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0);
    
    return (
        <div>
            {parts.map(part => {
                return <Part part={part} key={part.id} />
            })}
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}


const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
)
          
    
export default Course
  