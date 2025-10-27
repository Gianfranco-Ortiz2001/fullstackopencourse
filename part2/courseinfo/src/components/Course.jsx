const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    //console.log(sum, part);
    return sum + part.exercises
  }, 0)
  return (
    <h4>Total of {total} exercises</h4>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course