
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBasePlusDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBasePlusDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBasePlusDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBasePlusDescription {
  type: "special",
  requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;