export enum Kind {
  basic = "basic",
  group = "group",
  background = "background",
  special = "special",
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
  kind: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: Kind.basic;
}

interface CoursePartGroup extends Omit<CoursePartBase, "description"> {
  groupProjectCount: number;
  kind: Kind.group;
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: Kind.background;
}
interface CourseBackEnd extends CoursePartBase {
  requirements: string[];
  kind: Kind.special;
}
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseBackEnd;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: Kind["basic"],
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: Kind["group"],
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: Kind["basic"],
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: Kind["background"],
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: Kind["basic"],
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: Kind["special"],
  },
];
