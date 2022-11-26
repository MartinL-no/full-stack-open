import { CoursePart } from "../types";

interface ContentProps {
  coursePart: CoursePart
}

const Part = (props: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

    switch (props.coursePart.type) {
      case "normal":
        return (
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
            <br/>
            <i>{props.coursePart.description}</i>
          </p>
        )
        break;
      case "groupProject":
        return (
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
            <br/>
            project exercises {props.coursePart.groupProjectCount}
          </p>
        )
        break;
      case "submission":
        return (
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
            <br/>
            <i>{props.coursePart.description}</i>
            <br/>
            submit to {props.coursePart.exerciseSubmissionLink}
          </p>
        )
        break;
        case "special":
          return (
            <p>
              <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
              <br/>
              <i>{props.coursePart.description}</i>
              <br/>
              required skills {props.coursePart.requirements.join(", ")}
            </p>
          )
          break;
      default:
        assertNever(props.coursePart)
    }

  return (
    <></>
  )
}

export default Part