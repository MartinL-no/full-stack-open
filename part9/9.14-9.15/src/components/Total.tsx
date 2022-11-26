import { CoursePart } from "../types";

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Total = (props: ContentProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )
};

export default Total