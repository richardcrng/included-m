import { Course, Lesson, Topic } from "../content/types";

interface State {
  loaded: {
    course: Course,
    topic: Topic,
    lesson: Lesson,
    activityIdx: number
  }
}

const initialState: State = {
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