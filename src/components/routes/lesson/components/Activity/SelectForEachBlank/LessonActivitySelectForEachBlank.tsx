import React, { useState } from "react";
import { shuffle } from "lodash";
import Markdown from "markdown-to-jsx";
import { bundle, useRiducer } from "riduce";
import { answersFromBlocks, BlankOrText, hasBlanks } from "./utils";
import LessonContent from "../../LessonContent";
import LessonContentBlock from "../../LessonContentBlock";
import LessonContinueButton from "../../LessonContinueButton";
import MultipleAnswerCard from "../../../../../ui/atoms/MultipleAnswerCard";
import Notification, {
  NotificationProps,
} from "../../../../../ui/atoms/Notification";
import { ChoiceAnswerState } from "./LessonActivitySelectForEachBlankComplex";
import { SelectForEachBlankSimpleActivityJSON } from "../../../../../../content/types/content-yaml.types";

interface Props {
  activity: SelectForEachBlankSimpleActivityJSON;
  handleContinue(): void;
}

function LessonActivitySelectForEachBlank({
  activity: { blocks },
  handleContinue,
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({
    message: "",
    isShowing: false,
  });

  const answers = answersFromBlocks(blocks);
  const orderedAnswers = Object.values(answers);

  const initialState = {
    answers: shuffle(answers),
    selectedInput: Object.keys(answers)[0],
  };

  const { state, actions, dispatch } = useRiducer(initialState);

  const orderedIncompleteAnswers = orderedAnswers.filter((answer, index) => {
    const currentAnswerState = state.answers.find(
      (answerState) => answerState.textMatch === answer.textMatch
    );
    return !currentAnswerState?.isLocked;
  });

  const answerMatchesInput = (answer: ChoiceAnswerState) => {
    return state.selectedInput === answer.textMatch;
  };

  const allAnswersLocked = state.answers.every((answer) => answer.isLocked);

  const makeClickHandler = (answer: typeof answers[0], idx: number) => () => {
    if (answer.isSelected || answer.isLocked) return;

    dispatch(actions.answers[idx].isSelected.create.on());

    if (answerMatchesInput(answer)) {
      setNotification({
        message: "Amazing!",
        isShowing: true,
        color: "success",
      });
      dispatch(
        bundle([
          actions.answers[idx].isLocked.create.on(),
          // move onto next incomplete input
          actions.selectedInput.create.do(() => {
            const currIndex = orderedIncompleteAnswers.findIndex(
              answerMatchesInput
            );
            return currIndex < orderedIncompleteAnswers.length - 1
              ? orderedIncompleteAnswers[currIndex + 1].textMatch
              : orderedIncompleteAnswers[0].textMatch;
          }),
        ])
      );
    } else {
      setNotification({
        message: "Not quite...",
        isShowing: true,
        color: "warning",
      });
    }
  };

  return (
    <>
      <Notification
        header={notification.header}
        color={notification.color}
        isShowing={notification.isShowing}
        onDidDismiss={() => {
          setNotification((prevState) => ({
            ...prevState,
            isShowing: false,
          }));

          dispatch(
            actions.answers.create.do((answers) =>
              answers.map((answer) =>
                answer.isSelected && !answerMatchesInput(answer)
                  ? { ...answer, isSelected: false }
                  : answer
              )
            )
          );
        }}
        message={notification.message}
        buttons={[notification.buttonText || "Close"]}
      />
      <LessonContent>
        {blocks.map((block) => {
          const markdown = typeof block === "string" ? block : block.markdown;
          const blockBlanks = hasBlanks(markdown);
          if (blockBlanks) {
            const { remaining, nodes } = blockBlanks.reduce(
              (acc, match) => {
                const [before, remaining] = acc.remaining.split(match);

                const matchingAnswer = state.answers.find(
                  (answer) => answer.textMatch === match
                );

                const nodes = [
                  ...acc.nodes,
                  <Markdown key={before} options={{ forceInline: true }}>
                    {before}
                  </Markdown>,
                  <BlankOrText
                    key={match}
                    matchingAnswer={matchingAnswer}
                    onInputClick={() => {
                      if (matchingAnswer) {
                        dispatch(
                          actions.selectedInput.create.update(
                            matchingAnswer.textMatch
                          )
                        );
                      }
                    }}
                    showFocus={
                      !!matchingAnswer && answerMatchesInput(matchingAnswer)
                    }
                  />,
                ];

                return { remaining, nodes };
              },
              { remaining: markdown, nodes: [] as React.ReactNode[] }
            );

            return (
              <p key={markdown}>
                {nodes}
                <span>{remaining}</span>
              </p>
            );
          } else {
            return (
              <LessonContentBlock key={JSON.stringify(block)} block={block} />
            );
          }
        })}
        {state.answers.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={{
              ...answer,
              isSelected: answer.isLocked || answer.isSelected,
              isCorrect: answer.isLocked || answerMatchesInput(answer),
            }}
            disabled={notification.isShowing}
            onClick={makeClickHandler(answer, idx)}
          />
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allAnswersLocked}
        handleContinue={handleContinue}
      />
    </>
  );
}

export default LessonActivitySelectForEachBlank;
