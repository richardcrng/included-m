import React from "react";
import styled from "styled-components";
import { IonButtons, IonToolbar } from "@ionic/react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import ProgressBoxes from "../../../ui/atoms/ProgressBoxes";

const Buttons = styled(IonButtons)`
  margin: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  margin: 0.5rem 0 0 0;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

interface Props {
  activityType?: string;
  currentPage: number;
  totalPages: number;
  handleBack(): void;
  handleExit(): void;
  message?: string;
}

function LessonToolbar({
  activityType,
  currentPage,
  handleBack,
  handleExit,
  message,
  totalPages,
}: Props) {
  const getCurrentActivityType = () => {
    if (!activityType) return "Included M";

<<<<<<< HEAD
    switch (activities[currentIdx].activityType) {
      case "select-one":
=======
    switch (activityType) {
      case "select-an-answer":
>>>>>>> main
        return "Select an answer";

      case "select-for-each-blank":
        return "Select an answer for each blank";

      case "select-multiple":
        return "Select all that apply";

      case "swipe-cards":
        return "Select an answer for each card";

      default:
        return "Read and continue";
    }
  };

  return (
    <IonToolbar>
      <Buttons slot="start">
        <IoArrowBack onClick={handleBack} size={24} />
      </Buttons>
      <Buttons slot="end">
        <IoClose size={24} onClick={handleExit} />
      </Buttons>
      <Title>
        <ProgressBoxes currentPage={currentPage} totalPages={totalPages} />
        <Message>{message || getCurrentActivityType()}</Message>
      </Title>
    </IonToolbar>
  );
}

export default LessonToolbar;
