import React, { useMemo, useReducer, useState } from "react";
import { shuffle } from "lodash";
import riduce from "riduce";
import LessonContent from "../LessonContent";
import LessonContentBlock from "../LessonContentBlock";
import MultipleAnswerCard from "../../../../ui/atoms/MultipleAnswerCard";
import LessonContinueButton from "../LessonContinueButton";
import Notification, {
  NotificationProps,
} from "../../../../ui/atoms/Notification";
import { ActivityJSON } from "../../../../../content/types/content-yaml.types";

interface Props {
  activity: ActivityJSON;
  handleContinue(): void;
}

function LessonActivitySelectMultiple({
  activity: { blocks, answers = [] },
  handleContinue,
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({
    message: "",
    isShowing: false,
  });

  const shuffledAnswers = useMemo(
    () =>
      shuffle(
        answers.map((answer) => ({
          ...answer,
          isSelected: false,
        }))
      ),
    [answers]
  );

  const [reducer, actions] = useMemo(() => riduce(shuffledAnswers), [
    shuffledAnswers,
  ]);

  const [answersState, dispatch] = useReducer(reducer, shuffledAnswers);

  const allCorrectAnswersSelected = answersState.every(
    (answer) => !answer.isCorrect || answer.isSelected
  );

  const makeClickHandler = (
    answer: typeof answersState[0],
    idx: number
  ) => () => {
    if (answer.isSelected) return;

    dispatch(
      actions[idx].create.assign({
        isSelected: true,
      })
    );

    const color = answer.isCorrect ? "success" : "warning";

    if (answer.feedback) {
      setNotification({
        message: answer.feedback,
        isShowing: true,
        color,
      });
    } else if (answer.isCorrect) {
      setNotification({
        message: "Amazing!",
        isShowing: true,
        color,
      });
    } else {
      setNotification({
        message: "Not quite...",
        isShowing: true,
        color,
      });
    }
  };

  return (
    <>
      <Notification
        isShowing={notification.isShowing}
        color={notification.color}
        header={notification.header}
        message={notification.message}
        position="top"
        duration={1000}
        buttons={[notification.buttonText || "Close"]}
        onDidDismiss={() => {
          setNotification((prevState) => ({
            ...prevState,
            isShowing: false,
          }));

          dispatch(
            actions.create.do((answers) =>
              answers.map((answer) =>
                answer.isSelected && !answer.isCorrect
                  ? { ...answer, isSelected: false }
                  : answer
              )
            )
          );
        }}
      />
      <LessonContent>
        {blocks.map((block) => (
          <LessonContentBlock key={JSON.stringify(block)} block={block} />
        ))}
        {answersState.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={answer}
            disabled={notification.isShowing}
            onClick={makeClickHandler(answer, idx)}
          />
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allCorrectAnswersSelected}
        handleContinue={handleContinue}
      />
    </>
  );
}

export default LessonActivitySelectMultiple;
