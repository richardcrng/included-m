import { Course, Lesson, Topic } from "../content/types";

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
      description: 'Loading...',
      topics: []
    },
    topic: {
      topicTitle: 'Included M',
      description: 'Loading...',
      chapters: []
    },
    lesson: {
      lessonTitle: 'Included M',
      activities: []
    },
    activityIdx: 0
  }
}

export default initialState