import { Course, Lesson, Topic } from "../content/types";

interface State {
  loaded: {
    course?: Course,
    topic?: Topic,
    lesson?: Lesson,
    activityIdx?: number
  }
}

const initialState: State = {
  loaded: {}
}

export default initialState