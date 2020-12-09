import { Course, Lesson, Topic } from "../content/types";

export const LOADING_STRING = 'Loading...'

export interface ReduxState {
  loaded: {
    course: Course,
    topic: Topic,
    lesson: Lesson,
    activityIdx: number
  }
}

const initialState: ReduxState = {
  loaded: {
    course: {
      courseTitle: 'Included M',
      description: LOADING_STRING,
      topics: []
    },
    topic: {
      topicTitle: LOADING_STRING,
      description: LOADING_STRING,
      chapters: []
    },
    lesson: {
      lessonTitle: LOADING_STRING,
      activities: []
    },
    activityIdx: 0
  }
}

export default initialState