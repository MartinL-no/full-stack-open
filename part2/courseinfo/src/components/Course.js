const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Content = ({parts}) => {
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)

    return (
    <>
        {parts.map(part => (
        <Part 
            key={part.id}
            name={part.name}
            exercises={part.exercises}
        />
        ))}
        <strong>total of {total} exercises</strong>
    </>
    )
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Course = ({course}) => {

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </>
    )
}


export default Course