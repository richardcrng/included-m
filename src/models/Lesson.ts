// import db from "./db";
// import firebase from "firebase";

// export interface LessonBase {
//   lessonTitle: string;
// }

// interface LessonCRUD extends LessonBase {
//   id?: string;
// }

// interface LessonWithActivities extends LessonBase {
//   activities:
// }

// export default class Lesson {
//   public id?: string;
//   public lessonTitle: string;
//   public activityIdsOrdered: string[];

//   constructor({ id, lessonTitle, activities }: LessonCRUD) {
//     this.id = id;
//     this.lessonTitle = lessonTitle;
//     this.activityIdsOrdered = activityIdsOrdered;
//   }
// }

// export const activityConverter = {
//   toFirestore(activity: Lesson): firebase.firestore.DocumentData {
//     return {
//       id: activity.id,
//       activityType: activity.activityType,
//       blocks: activity.blocks,
//     };
//   },
//   fromFirestore(
//     snapshot: firebase.firestore.QueryDocumentSnapshot,
//     options?: firebase.firestore.SnapshotOptions
//   ): Lesson {
//     const data = snapshot.data(options)!;
//     return new Lesson({ ...data, id: snapshot.id } as LessonCRUD);
//   },
// };

// export const activityCollection = db
//   .collection("activities")
//   .withConverter(activityConverter);

export {};
