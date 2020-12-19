import FirestoreModel from "./FirestoreModel";

export interface LessonBase {
  lessonTitle: string;
  activityIdsOrdered: string[];
}

interface LessonCreateData extends LessonBase {
  id?: string;
}

// interface LessonForFirestore extends LessonCreateData {}

export default class Lesson extends FirestoreModel<LessonBase>("lesson") {}
