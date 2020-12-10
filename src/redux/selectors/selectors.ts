import { ReduxState } from '../state';

export const getLoadedCourse = (state: ReduxState) => (state.loaded.course)

export const getLoadedTopic = (state: ReduxState) => (state.loaded.topic)

export const getLoadedLesson = (state: ReduxState) => (state.loaded.lesson)