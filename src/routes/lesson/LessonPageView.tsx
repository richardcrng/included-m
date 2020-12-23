import React, { useReducer } from "react";
import riduce, { Action, ActionsProxy } from "riduce";
import LessonActivity from "./components/Activity/LessonActivity";
import LessonToolbar from "./components/LessonToolbar";
import { AsyncReturnType } from "type-fest";
import { getChapterDeep } from "../../api/getResource";
import { ActivityJSON } from "../../content/content-types";

type LessonCtx = {
  dispatch: React.Dispatch<Action>;
  actions: ActionsProxy<LessonCtx["state"], LessonCtx["state"], {}>;
  state: {
    activities: ActivityJSON[];
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
        actions,
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
