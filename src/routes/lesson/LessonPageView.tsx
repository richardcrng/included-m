import React, { useReducer } from "react";
import riduce, { Action, ActionsProxy } from "riduce";
import { ActivityRawDeep } from "../../models/Activity.old";
import { LessonPOJODeep } from "../../models/Lesson";
import { LessonRawDeep } from "../../models/Lesson.old";
import LessonActivity from "./components/Activity/LessonActivity";
import LessonToolbar from "./components/LessonToolbar";
import { AsyncReturnType } from "type-fest";
import { getChapterDeep } from "../../api/getResource";

type LessonCtx = {
  dispatch: React.Dispatch<Action>;
  actions: ActionsProxy<LessonCtx["state"], LessonCtx["state"], {}>;
  state: {
    activities: ActivityRawDeep[];
    currentIdx: number;
  };
};

// @ts-ignore
export const LessonContext = React.createContext<LessonCtx>({});

type LessonData = AsyncReturnType<typeof getChapterDeep>["lessons"][0];

interface Props {
  lesson: LessonData;
}

function LessonPageView({ lesson }: Props) {
  const initialLessonState = {
    activities: lesson.activities,
    currentIdx: 0,
  };

  const [lessonReducer, actions] = riduce(initialLessonState);

  const [lessonState, dispatch] = useReducer(lessonReducer, initialLessonState);

  return (
    <LessonContext.Provider
      value={{
        dispatch,
        // @ts-ignore
        actions,
        // @ts-ignore
        state: lessonState,
      }}
    >
      <LessonToolbar />
      <LessonActivity
        activity={lessonState.activities[lessonState.currentIdx]}
      />
    </LessonContext.Provider>
  );
}

export default LessonPageView;
